const express = require("express")
const router = express.Router();
const sqlConnection = require("../databaseConnections/MySqlConnection")
const tokenVerify = require("../validations/tokenVerify")
const { removeAllItemsFromCart } = require("./queries/queries")

router.post("/removeAllItems", tokenVerify, async (req, res, next) => {
    try {
        const removeAllItems = await deleteAll(req.body)
        return res.json({ message: "Removed Successfully" })
    }
    catch (error) {
        console.log("removeAllItems", error.message)
    }
})



module.exports = router

const deleteAll = async (cart) => {
    try {
        const deleteQuery = removeAllItemsFromCart()
        const cartId = cart[0].cartid
        for (let index = 0; index < cart.length; index++) {
            console.log([cartId, cart[index].productsid])
            if (cart[index].productsid === undefined) {
                cart[index].productsid = cart[index].id
            }
            const result = await sqlConnection.execute(deleteQuery, [cartId, cart[index].productsid])
        }
    }
    catch (error) {
        console.log("deleteAll", error.message)
    }
}