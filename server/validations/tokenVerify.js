const jwt = require("jsonwebtoken");


const tokenVerifyer = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        var decoded = await jwt.verify(token, process.env.SECRET);
        req.user = decoded
        next()
    }
    catch (error) {
        console.log("tokentVeryfier catch error", error.message)
        return res.status(401).json({ message: "UNAUTHORIZED ACCESS" })
    }
}






module.exports = tokenVerifyer