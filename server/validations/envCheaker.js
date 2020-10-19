require("dotenv").config()

const envCheaker = (params) => {
    const { PORT } = process.env.PORT
    const missingParams = params.filter(param => !process.env[param])
    if (missingParams.length) {
        console.log("missingParams", missingParams.join(","))
    }
}



module.exports = { envCheaker }
