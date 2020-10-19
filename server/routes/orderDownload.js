const express = require("express")
const router = express.Router();
const sqlConnection = require("../databaseConnections/MySqlConnection")
const fs = require("fs");
const path = require("path");
const tokenVerify = require("../validations/tokenVerify")

router.get("/orderDownload", (req, res, next) => {
    try {
        let filePath = req.headers.filename;
        let stat = fs.statSync(filePath);
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Length': stat.size
        });
        res.status(200);
        let readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    }
    catch (error) {
        console.log("orderDownload", error.message);
        res.status(500).json({ error: error });
    }
})





module.exports = router