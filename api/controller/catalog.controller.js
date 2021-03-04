const db = require('../conf/db.conf')

class CatalogController {

    async createCatalog(req, res) {
        let title = req.body.title

        await db.query(`
            INSERT INTO table_catalog (catalog_name)
            VALUES ($1)
            RETURNING *
            `
            , [title]
            , (error, result) => {
                if (!error) {
                    return res.status(200).send({ status: true, msg: "Категория создана, успешно", data: result.rows })
                } else {
                    return res.status(400).send({ status: false, msg: error.detail.split(" ").filter((elem, index) => index !== 1).join(" ") })
                }
            }
        )
    }

    async getCatalog(req, res) {

        await db.query(`
            SELECT * 
            FROM table_catalog
            `
            , []
            , (error, result) => {
                console.log(error)
                if (!error) {
                    return res.status(200).send({ status: true, msg: "Получен список категорий", data: result.rows })
                } else {
                    return res.status(400).send({ status: false, msg: error.detail.split(" ").filter((elem, index) => index !== 1).join(" ") })
                }
            }
        )
    }

    async updateCatalog(req, res) {
        let { id, title } = req.body
        await db.query(`
            UPDATE table_catalog
            SET catalog_name=$2
            WHERE catalog_id=$1
            RETURNING *
            `
            , [id, title]
            , (error, result) => {

                if (!error) {
                    return res.status(200).send({ status: true, mess: "Данные каталога изменились", data: result.rows })
                } else {
                    return res.status(500).send({ status: false, mess: "Данные не были изменены", data: [] })
                }
            }
        )
    }

    async deleteCatalog(req, res) {
        let { id, title } = req.body

        await db.query(`
                DELETE
                FROM table_catalog 
                WHERE catalog_id=$1 AND catalog_name=$2
            `
            , [id, title]
            , (error, result) => {
                if (!error) {
                    return res.status(200).send({ status: true, msg: "Каталог был удален", data: result.rows })
                } else {
                    return res.status(400).send({ status: false, msg: error.detail.split(" ").filter((elem, index) => index !== 1).join(" ") })
                }
            }
        )
    }





    async getCatalogProduct(req, res) {

        let { id } = req.params
        let { price = '0-1000000'
            , count = 0
            , gender = 'woman|girl|male|boy|unisex'
            , size = '2:*|3:*|4:*|5:*|6:*'
            , page = 0
        } = req.query
        
        price = price?.split('-').map(i => i / 1)
        page>0 && page--
        
        await db.query(`
            SELECT join_catalog_name
                   ,catalog_name
                   ,product_title
                   ,product_short
                   ,product_text
                   ,product_desc
                   ,product_gender
                   ,product_size
                   ,product_price_full
                   ,product_price_short
                   ,product_count
                   ,product_storage_address
                   ,product_reg

            FROM table_join_catalog AS j_c

            LEFT JOIN table_product AS t_p
            ON j_c.product_id = t_p.product_id
            
            RIGHT JOIN table_catalog AS t_c
            ON j_c.catalog_id = t_c.catalog_id

            WHERE join_catalog_name=$1
            AND t_p.product_price_short>=$2
            AND t_p.product_price_short<=$3
            AND t_p.product_count>=$4
            AND to_tsvector(t_p.product_gender) @@ to_tsquery($5)
            AND to_tsvector(t_p.product_size) @@ to_tsquery($6)

            LIMIT 1 OFFSET $7

       
        `, [id, price[0], price[1], count, gender, size, page]

            , (error, result) => {
                if (!error) {
                    return res.status(200).send({ status: true, msg: "Список товаров по каталогу получено", data: result.rows })
                } else {
                    return res.status(500).send({ status: false, msg: "Товаров в этой категории пока нет", data: [] })
                }
            }
        )
    }
}

module.exports = new CatalogController()

