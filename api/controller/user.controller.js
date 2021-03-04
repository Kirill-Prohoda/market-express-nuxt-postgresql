const db = require('../conf/db.conf')

class UserController {

    async createUser(req, res) {
        const { firstname
            , lastname
            , age
            , login
            , email
            , password
            , rule
        } = req.body.data

        let randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);


        await db.query(`
            INSERT INTO table_user (
                user_firstname
                , user_lastname
                , user_age
                , user_login
                , user_email
                , user_password
                , user_rule
                , user_status
                ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *
            `
            , [firstname, lastname, age, login, email, password, rule, true]
            , (error, result) => {
                if (!error) {
                    return res.status(200).cookie('secret', result.rows[0].user_key, randomNumber).send({ status: true, msg: "Зарегестрировано" })
                } else {
                    return res.status(400).send({ status: false, msg: error.detail.split(" ").filter((elem, index) => index !== 1).join(" ") })
                }
            }
        )
    }

    async getOneUser(req, res) {
        // let key = req.query.key
        let key = req.cookies.secret

        await db.query(`
                SELECT user_firstname, user_lastname, user_age, user_login, user_history, user_rule, user_status
                FROM table_user
                WHERE user_key=$1
                `
            , [key]
            , (error, result) => {

                if (!error && key !== undefined) {
                    return res.status(200).send({ status: true, msg: "Пользователь получен", data: result.rows })
                } else {
                    return res.status(500).send({ status: false, msg: "Пользователь не найден", data: [] })
                }
            }
        )
    }


    async updateUser(req, res) {
        let { id, firstname, lastname, age, login, email, rule, password } = req.body.data

        // let key = req.cookies.secret 
        // AND user_key = key

        console.log(id, firstname, lastname, age, login, email, rule, password)


        await db.query(`
            UPDATE table_user
            SET user_firstname=$1
              , user_lastname=$2
              , user_age=$3
              , user_login=$4
              , user_email=$5
              , user_rule=$6
              , user_password=$7
            WHERE user_id=$8
            RETURNING user_id, user_firstname, user_lastname, user_age, user_login, user_history, user_rule, user_status
            `
            , [firstname, lastname, age, login, email, rule, password, id]
            , (error, result) => {
                if (!error) {
                    return res.status(200).send({ status: true, msg: "Данные изменились", data: result.rows })
                } else {
                    return res.status(500).send({ status: false, msg: "Произошла ошибка", data: [] })
                }
            }
        )
    }


    async getUser(req, res) {
        await db.query(`
        SELECT user_id, user_firstname, user_lastname, user_age, user_login, user_rule, user_status
        FROM table_user
        `
            , []
            , (error, result) => {
                return !error ? res.status(200).send({ status: true, msg: "Список пользователей получен", data: result.rows })
                    : res.status(500).send({ status: false, msg: "Ошибка получения", data: [] })
            }
        )
    }


    async deleteUser() {
        let { login, email } = req.body.data
        await db.query(`
        DELETE table_user
        WHERE user_login=$1, email=$2
        `
            , [login, email]
            , (error, result) => {
                return !error ? res.status(200).send({ status: true, msg: "Удаление прошло успешно", data: [] })
                    : res.status(500).send({ status: false, msg: "Ошибка удаления", data: [] })
            }
        )
    }


}
module.exports = new UserController()
