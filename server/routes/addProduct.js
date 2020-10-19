const express = require("express")
const router = express.Router();
const sqlConnection = require("../databaseConnections/MySqlConnection")
const tokenVerify = require("../validations/tokenVerify")
const { addNewProduct, productExist } = require("./queries/queries")


router.post("/addProduct", tokenVerify, async (req, res, next) => {
    try {
        const { user, arg } = req.body
        if (user.role === "admin") {
            const isProductExist = await checkProduct(arg.productName)
            if (isProductExist) return res.json({ message: "product already exists" })
            const addProducts = await addProdtoDb(arg)
            return res.json({ message: "product added" })
        }

        else {
            return res.status(401).json({ message: "UNAUTHORIZED ACCESS" })
        }

    }
    catch (error) {
        console.log("addProduct",error.message)
    }
})




module.exports = router

const addProdtoDb = async (arg) => {
    try {
        const payload = [arg.productName, arg.category, arg.price, arg.img]
        const addQuery = addNewProduct()
        const result = await sqlConnection.execute(addQuery, payload)
        return result[0].insertId
    }
    catch (error) {
        console.log("addProdtoDb",error.message)
    }
}

const checkProduct = async (productName) => {
    try {
        const payload = [productName]
        const productExistQuery = productExist()
        const result = await sqlConnection.execute(productExistQuery, payload)
        if (result[0].length === 0) return null
        return result[0][0]
    }
    catch (error) {
        console.log("checkProduct",error.message)
    }
}