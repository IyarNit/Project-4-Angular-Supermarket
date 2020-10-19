const express = require("express")
const router = express.Router();
const sqlConnection = require("../databaseConnections/MySqlConnection")
const tokenVerify = require("../validations/tokenVerify")
const { editProducts } = require("./queries/queries")


router.post("/editProduct", tokenVerify, async (req, res, next) => {
    try {
        const { user, arg } = req.body
        if (user.role === "admin") {
            const edit = await editProduct(arg)
            return res.json({ message: "Edit Success" })
        }
        else {
            return res.status(401).json({ message: "UNAUTHORIZED ACCESS" })

        }
    }
    catch (error) {
        console.log("editProduct",error.message)
    }

})

module.exports = router


const editProduct = async (arg) => {
    try {
        const payload = [arg.productName, arg.category, arg.price, arg.img, arg.id]
        const editQuery = editProducts()
        const result = await sqlConnection.execute(editQuery, payload)
        return result[0].insertId
    }
    catch (error) {
        console.log("editProduct",error.message)
    }

}