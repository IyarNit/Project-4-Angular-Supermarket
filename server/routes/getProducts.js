const express = require("express")
const router = express.Router();
const sqlConnection = require("../databaseConnections/MySqlConnection")
const tokenVerify = require("../validations/tokenVerify")
const { getAllProducts } = require("./queries/queries")

router.get("/products", tokenVerify, async (req, res, next) => {
    try {
        const products = await getProducts()
        return res.json({ message: "ok", data: products })
    }
    catch (error) {
        console.log("products", error.message)
        return res.status(401).json({ message: "invalid request" })
    }
})

module.exports = router

const getProducts = async () => {
    try {
        const getProductsQuery = getAllProducts()
        const result = await sqlConnection.execute(getProductsQuery)
        return result[0]
    }
    catch (error) {
        console.log("getProducts", error.message)
    }
}
