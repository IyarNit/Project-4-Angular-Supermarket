const express = require("express")
const router = express.Router()
const sqlConnection = require("../databaseConnections/MySqlConnection")
const tokenVerify = require("../validations/tokenVerify")
const { updateQuery } = require("./queries/queries")


router.post("/updateQuantity", tokenVerify, async (req, res, next) => {
    try {
        const { cartId, productId, value } = req.body
        const update = await updateQuantity(cartId, productId, value)
        if (!update) return res.json({ message: "error finding item" })
        if (update) return res.json({ message: "changed" })
    }
    catch (error) {
        console.log("updateQuantity", error.message)
    }
})



module.exports = router

const updateQuantity = async (cartId, productId, value) => {
    try {
        const payload = [value, cartId, productId]
        const updateQQuery = updateQuery()
        const result = await sqlConnection.execute(updateQQuery, payload)
        if (result.affectedRows === 1) return result.affectedRows
        if (result.affectedRows === 0) return null
    }
    catch (error) {
        console.log("updateQuantity", error.message)
    }
}