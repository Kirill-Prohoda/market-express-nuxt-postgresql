const db = require('../conf/db.conf')

class ProductController {

    //===============================================================>
    // создать товар
    async createProduct(req, res) {
        let { number, title, short, text, count, desc, pfull, pshort, address } = req.body.data

        await db.query(`
            INSERT INTO table_product (
                product_declar_number
                , product_title
                , product_short
                , product_text
                , product_count
                , product_desc
                , product_price_full
                , product_price_short
                , product_storage_address
                ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
            RETURNING *
            `
            , [number, title, short, text, count, desc, pfull, pshort, address]
            , (error, result) => {
                if (!error) {
                    return res.status(200).send({ status: true, msg: "Продукт создан", data: result.rows })
                } else {
                    return res.status(400).send({ status: false, msg: error.detail.split(" ").filter((elem, index) => index !== 1).join(" ") })
                }
            }
        )
    }
    //==============================>

    //===============================================================>
    // получить один товар
    async getOneProduct(req, res) {
        let { id } = req.params

        await db.query(`
            SELECT product_id
            , product_declar_number
            , product_title
            , product_short
            , product_text
            , product_count
            , product_desc
            , product_price_full
            , product_price_short
            , product_storage_address

            FROM table_product
            WHERE product_id=$1
            `
            , [id]
            , (error, result) => {
                if (!error) {
                    return res.status(200).send({ status: true, msg: "Товар получен", data: result.rows })
                } else {
                    return res.status(500).send({ status: false, msg: "Товар не найден", data: [] })
                }
            }
        )
    }
    //==============================>

    //===============================================================>
    // обновить один товар
    async updateProduct(req, res) {
        let { id, number, title, short, text, count, desc, pfull, pshort, address } = req.body.data

        await db.query(`
            UPDATE table_product

            SET product_declar_number=$2
            , product_title=$3
            , product_short=$4
            , product_text=$5
            , product_count=$6
            , product_desc=$7
            , product_price_full=$8
            , product_price_short=$9
            , product_storage_address=$10
            
            WHERE product_id=$1
            RETURNING *
            `
            , [id, number, title, short, text, count, desc, pfull, pshort, address]
            , (error, result) => {
                if (!error) {
                    return res.status(200).send({ status: true, msg: `Товар №${number} обновился`, data: result.rows })
                } else {
                    return res.status(500).send({ status: false, msg: "Ошибка обновления товара", data: [] })
                }
            }
        )
    }
    //==============================>

    //===============================================================>
    // удалить один товар
    async deleteProduct(req, res) {
        let { id, key } = req.body
        let elem
        // req.cookie.secret

        let block = await db.query(`
        SELECT *
        FROM table_user
        WHERE user_key = $1 AND user_rule='director-404'
        `, [key]
        )

        elem = block.rows.length !== 0 ? id : 0
        // console.log(id, key)


        await db.query(`
            DELETE FROM table_product
            WHERE product_id = $1
            `
            , [elem]
            , (error, result) => {
                if (!error) {
                    return res.status(200).send({ status: true, msg: "Продукт удален", data: [] })
                } else {
                    return res.status(500).send({ status: false, msg: "Ошибка удаления", data: [] })
                }
            }
        )
    }
    //==============================>

    //===============================================================>
    // получить товар список товаров
    async getProduct(req, res) {
        let number = req.params.number


        await db.query(`
            SELECT  product_id
            , product_declar_number
            , product_title
            , product_short
            , product_text
            , product_count
            , product_desc
            , product_price_full
            , product_price_short
            , product_storage_address

            FROM table_product
            WHERE product_declar_number=$1
            `
            , [number]
            , (error, result) => {

                console.log(error)
                if (!error) {
                    return res.status(200).send({ status: true, mess: "Получен список товаров", data: result.rows })
                } else {
                    return res.status(500).send({ status: false, mess: "Товары не найдены", data: [] })
                }
            }
        )
    }
    //==============================>

    //===============================================================>
    // получить найденные продукты полный текстовый поиск
    async getFoundProduct(req, res) {
        let array = []
        for (let key in req.query) {
            array.push(`${key}`)
        }
        let string = array.join()

        await db.query(`
            SELECT  product_id
            , product_declar_number
            , product_title
            , product_short
            , product_text
            , product_count
            , product_desc
            , product_price_full
            , product_price_short
            , product_storage_address

            FROM table_product
            WHERE to_tsvector(product_title || product_text) @@ to_tsquery($1);
            `
            , [string]
            , (error, result) => {

                console.log(error)
                if (!error) {
                    return res.status(200).send({ status: true, mess: "Получен список товаров", data: result.rows })
                } else {
                    return res.status(500).send({ status: false, mess: "Товары не найдены", data: [] })
                }
            }
        )
    }
    //==============================>

}
module.exports = new ProductController()