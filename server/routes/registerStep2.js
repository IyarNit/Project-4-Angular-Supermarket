const express = require("express")
const router = express.Router();
const sqlConnection = require("../databaseConnections/MySqlConnection")
const bcrypt = require('bcryptjs');
const salt = "$2a$10$MxPcIeHj.YLc1dOwnykPiOZBs2Gzk91ydH9f2Q7GAIuRmvA/UxgSe"
const { addDetailsQuery } = require("./queries/queries")
const { UserEmailExistQuery } = require("./queries/queries")
const infoValidation = require("../validations/validateInfo")



router.post("/register2", infoValidation, async (req, res, next) => {
    try {
        const { name, lastName, city, street, email, id, password } = req.body
        const user = await isUserExist(email);
        if (user.length > 0) return res.json({ message: "user already exists" })
        const addDetails = await addUserFullDetails(name, lastName, city, street, email, id, password)
        if (!addDetails) return res.json({ message: "error inserting user" })
        return res.json({ message: "registered" })
    }
    catch (error) {
        console.log("register2", error.message)
    }
})


const addUserFullDetails = async (name, lastName, city, street, email, id, password) => {
    try {
        const payload = [name, lastName, city, street, email, id, bcrypt.hashSync(password, salt)]
        const detailsQuery = addDetailsQuery()
        const result = await sqlConnection.execute(detailsQuery, payload)
        return result[0].insertId
    }
    catch (error) {
        console.log("addUserFullDetails", error.message)
    }
}

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

