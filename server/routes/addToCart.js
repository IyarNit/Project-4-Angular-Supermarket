const express = require("express")
const router = express.Router();
const sqlConnection = require("../databaseConnections/MySqlConnection")
const { addProductToCart, returnUserCart, changeQuantity, FullCart } = require("./queries/queries")
const tokenVerify = require("../validations/tokenVerify")

router.post("/addToCart", tokenVerify, async (req, res, next) => {
    try {
        const { cart, item } = req.body
        const isItemInCart = await checkCart(cart, item.id, item.quantity)
        if (isItemInCart) return res.json({ message: "ok" })
        if (!isItemInCart) {
            const pushToCart = await addCart(cart, item.id, item.quantity)
            const fullUsersCart = await getFullCartById(cart, cart)
            const single = fullUsersCart.filter((x => { return x.productsid === item.id }))
            return res.status(200).json(single[0]);
        }
    }
    catch (error) {
        console.log("addToCart", error.message)
    }


})


module.exports = router


const checkCart = async (cartId, prodId, quantity) => {
    try {
        const payload = [prodId, cartId]
        const checkQuery = returnUserCart()
        const result1 = await sqlConnection.execute(checkQuery, payload)
        if (result1[0].length === 0) return null
        if (result1[0][0].quantity) {
            const quantityPayload = [quantity, prodId]
            const quantityQuery = changeQuantity()
            const result2 = await sqlConnection.execute(quantityQuery, quantityPayload)
            return result2[0]
        }
    }
    catch (error) {
        console.log("checkCart", error.message)
    }


}




const addCart = async (cartId, prodId, quantity) => {
    try {
        const payload = [cartId, prodId, quantity]
        const pushQuery = addProductToCart()
        const result = await sqlConnection.execute(pushQuery, payload)
        return result[0].insertId
    }
    catch (error) {
        console.log("addCart", error.message)
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
        console.log("getFullCartById",error.message)
    }
}