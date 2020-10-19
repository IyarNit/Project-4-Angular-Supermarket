const express = require("express")
const router = express.Router();
const sqlConnection = require("../databaseConnections/MySqlConnection")
const { getCartById, FullCart } = require("./queries/queries")
const tokenVerify = require("../validations/tokenVerify")

router.get("/getCart", tokenVerify, async (req, res, next) => {
    try {
        const userId = req.headers.currentuser
        const cartId = await getUsersCart(userId)
        const getFullCart = await getFullCartById(cartId)
        return res.json(getFullCart)
    }
    catch (error) {
        console.log("getCart", error.message)
    }
})


module.exports = router


const getUsersCart = async (userId) => {
    try {
        const payload = [userId]
        const cartQuery = getCartById()
        const result = await sqlConnection.execute(cartQuery, payload)
        return result[0][0].cartid
    }
    catch (error) {
        console.log("getUsersCart", error.message);
        next()
    }
}

const getFullCartById = async (cartId) => {
    try {
        const payload = [cartId, cartId]
        const fullCartQuery = FullCart()
        const result = await sqlConnection.execute(fullCartQuery, payload)
        return result[0]
    }
    catch (error) {
        console.log("getFullCartById", error.message)
    }
}

