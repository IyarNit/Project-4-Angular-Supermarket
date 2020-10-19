const express = require("express")
const router = express.Router()
const sqlConnection = require("../databaseConnections/MySqlConnection")
const { makeFalse } = require("./queries/queries")
const tokenVerify = require("../validations/tokenVerify")


router.post("/false", tokenVerify, async (req, res, next) => {
    try {
        const { idusers, first } = req.body
        if (first === "false") return res.json({ message: "ok" })
        const makeFirstLoginFalse = await makeLoginFalse(idusers)
        if (!makeFirstLoginFalse) return res.json({ message: "error verifying user" })
        return res.json({ message: "ok" })
    }
    catch (error) {
        console.log("false", error.message)
    }
})

module.exports = router


const makeLoginFalse = async (idusers) => {
    try {
        const first = "false"
        const payload = [first, idusers]
        const falseQuery = makeFalse()
        const result = await sqlConnection.execute(falseQuery, payload)
        if (result[0].affectedRows === 1) return result[0].affectedRows
        return null
    }
    catch (error) {
        console.log("makeLoginFalse", error.message)
    }
}