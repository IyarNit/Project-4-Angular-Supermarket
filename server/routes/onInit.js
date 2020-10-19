
const express = require("express")
const router = express.Router();
const sqlConnection = require("../databaseConnections/MySqlConnection")
const jwt = require("jsonwebtoken")
const { cartExist } = require("./queries/queries")
const tokenVerify = require("../validations/tokenVerify")



router.get("/init", async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const isUser = await isUserCheck(token)
        const cartCheck = await checkCart(isUser)
        return res.json({ data: isUser, cart: cartCheck })
    }
    catch (error) {
        console.log("userIdentifier", error.message);
        return res.status(401).json({ message: "jwt expired" })
    }
})

const isUserCheck = async (token) => {
    let decoded = await jwt.verify(token, process.env.SECRET);
    return decoded
}



module.exports = router


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