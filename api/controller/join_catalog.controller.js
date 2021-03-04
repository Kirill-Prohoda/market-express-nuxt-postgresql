const db = require('../conf/db.conf')

class JoinCatalogController {

    // создать присоединение товара к каталогу
    async createJoinCatalog(req, res) {
        let { join_catalog_name, catalog_id, product_id } = req.body.data

        await db.query(`
            INSERT INTO table_join_catalog ( join_catalog_name, catalog_id, product_id )
            VALUES ($1, $2, $3);   
            `
            , [join_catalog_name, catalog_id, product_id]
            , (error, result) => {
                console.log(error)
                if (!error) {
                    return res.status(200).send({ status: true, msg: "Тег привязан в товару", data: result.rows })
                } else {
                    return res.status(400).send({ status: false, msg: error.detail.split(" ").filter((elem, index) => index !== 1).join(" ") })
                }
            }
        )
    }

    // получить список соединений товаров и каталога
    async getJoinCatalog(req, res) {

        await db.query(`
            SELECT * 
            FROM table_join_catalog
            `
            , []
            , (error, result) => {
                if (!error) {
                    return res.status(200).send({ status: true, msg: "Получен список привязок", data: result.rows })
                } else {
                    return res.status(400).send({ status: false, msg: error.detail.split(" ").filter((elem, index) => index !== 1).join(" ") })
                }
            }
        )
    }

    // обновление одного описания соединения каталога
    async updateJoinCatalog(req, res) {
        let { join_catalog_id, join_catalog_name, catalog_id, product_id } = req.body

        await db.query(`
            UPDATE table_join_catalog
            SET join_catalog_name=$2, catalog_id=$3, product_id=$4
            WHERE join_catalog_id=$1
            RETURNING *
            `
            , [join_catalog_id, join_catalog_name, catalog_id, product_id]
            , (error, result) => {
                if (!error) {
                    return res.status(200).send({ status: true, mess: "Данные соединения изменились", data: result.rows })
                } else {
                    return res.status(500).send({ status: false, mess: "Данные соединения небыли изменены", data: [] })
                }
            }
        )
    }

    // удалить соединение товара и каталога
    async deleteJoinCatalog(req, res) {
        let { id, key } = req.body
        // req.cookie.secret


        let block = await db.query(`
                SELECT *
                FROM table_user
                WHERE user_key = $1 AND user_rule='director-404'
                `
            , [key]
        )

        let elem = block.rows.length !== 0 ? id : 0


        await db.query(`
                DELETE
                FROM table_join_catalog 
                WHERE join_catalog_id=$1
            `
            , [elem]
            , (error, result) => {
                if (!error) {
                    return res.status(200).send({ status: true, msg: "Данные соединения были удалены", data: [] })
                } else {
                    return res.status(400).send({ status: false, msg: error.detail.split(" ").filter((elem, index) => index !== 1).join(" ") })
                }
            }
        )
    }
}

module.exports = new JoinCatalogController()

