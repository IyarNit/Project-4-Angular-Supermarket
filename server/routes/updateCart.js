const express = require("express")
const router = express.Router();
const sqlConnection = require("../databaseConnections/MySqlConnection")
const tokenVerify = require("../validations/tokenVerify")
const { removeItemFromCart } = require("./queries/queries")

router.post("/updateCart", tokenVerify, async (req, res, next) => {
    try {
        const { cartId, arg } = req.body
        const removeItemFromCart = await removeItem(cartId, arg)
        return res.json({ message: "ok" })
    }
    catch (error) {
        console.log("updateCart", error.message)
    }
})

module.exports = router

const removeItem = async (cartId, arg) => {
    try {
        if (arg.productsid === undefined) {
            arg.productsid = arg.id
        }
        const payload = [cartId, arg.productsid]
        const removeItemQuery = removeItemFromCart()
        const result = await sqlConnection.execute(removeItemQuery, payload)
        return result[0].affectedRows
    }
    catch (error) {
        console.log("removeItem", error.message)
    }
}