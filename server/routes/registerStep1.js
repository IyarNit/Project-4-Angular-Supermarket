const express = require("express")
const router = express.Router();
const sqlConnection = require("../databaseConnections/MySqlConnection")
const bcrypt = require('bcryptjs');
const salt = "$2a$10$MxPcIeHj.YLc1dOwnykPiOZBs2Gzk91ydH9f2Q7GAIuRmvA/UxgSe"
const { UserEmailExistQuery } = require("./queries/queries")
const userValidations = require("../validations/validateUser")

router.post("/register1", userValidations, async (req, res, next) => {
    try {
        const { name, lastName, city, street, email, id, password, passwordVerification } = req.body
        const user = await isUserExist(email);
        if (user.length > 0) return res.json({ message: "user already exists" })
        return res.status(200).json({ pass: true, email: email, password: bcrypt.hashSync(password, salt) })
    }
    catch (error) {
        console.log("register1", error.message)
    }
})

module.exports = router

async function isUserExist(email) {
    try {
        const payload = [email]
        const emailQuery = UserEmailExistQuery()
        const result = await sqlConnection.execute(emailQuery, payload)
        return result[0]
    }
    catch (error) {
        console.log("isUserExist", error.message)
    }
}






