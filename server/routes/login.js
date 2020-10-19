const express = require("express")
const router = express.Router()
const sqlConnection = require("../databaseConnections/MySqlConnection")
const bcrypt = require('bcryptjs');
const salt = "$2a$10$MxPcIeHj.YLc1dOwnykPiOZBs2Gzk91ydH9f2Q7GAIuRmvA/UxgSe"
const { userExist } = require("./queries/queries")
const jwt = require("jsonwebtoken")
const { createCart } = require("./queries/queries")
const moment = require("moment")
const { cartExist } = require("./queries/queries")


router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await checkUser(email, bcrypt.hashSync(password, salt))
        if (!user) return res.json({ message: "user not found" })
        const jwtToken = await getJwt({ ...user, password: null })
        if (user.first === "true") {
            const cart = await newCart(user)
            const cartCheck = await checkCart(user)
            return res.json({ data: user, token: jwtToken, cart: cartCheck, message: "Welcome to Our Store!" })
        }
        if (user.first === "false") {
            const cartCheck = await checkCart(user)
            if (!cartCheck) {
                const cart = await newCart(user)
                const cartCheck = await checkCart(user)
                return res.json({ data: user, token: jwtToken, cart: cartCheck, message: "Start Shopping" })
            }
            else {
                const cartCheck = await checkCart(user)
                return res.json({ data: user, token: jwtToken, cart: cartCheck, message: "Continue Shopping" })

            }
        }
    }

    catch (error) {
        console.log("login", error.message)
    }
})

module.exports = router


const checkUser = async (email, password) => {
    try {
        const payload = [email, password]
        const userExistQuery = userExist()
        const result = await sqlConnection.execute(userExistQuery, payload)
        if (result[0] === undefined) return null
        return result[0][0]
    }
    catch (error) {
        console.log("checkUser", error.message)
    }
}


const getJwt = async (u) => {
    return new Promise((resolve, reject) => {
        jwt.sign(u, process.env.SECRET, { expiresIn: "1h" }, (err, token) => {
            if (err) reject("error")
            resolve(token)
        })
    })
}

const newCart = async (user) => {
    try {
        const { idusers } = user
        const date = moment().format('MMMM Do YYYY, h:mm:ss a')
        const payload = [idusers, date]
        const cartQuery = createCart()
        const result = await sqlConnection.execute(cartQuery, payload)
        return result[0].insertId
    }
    catch (error) {
        console.log("newCart", error.message)
    }
}

const checkCart = async (user) => {
    try {
        const { idusers } = user
        const payload = [idusers]
        const cartExistQuery = cartExist()
        const result = await sqlConnection.execute(cartExistQuery, payload)
        if (result[0].length === 0) return null
        if (result[0][0]) return result[0][0]
    }
    catch (error) {
        console.log("checkCart", error.message)
    }

}



