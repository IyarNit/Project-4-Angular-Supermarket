const express = require("express");
const api = express();
require("dotenv").config()
const bodyParser = require("body-parser")
const port = process.env.PORT
const cors = require("cors")
const { envCheaker } = require("./validations/envCheaker")
envCheaker(["PORT"])

api.use(cors())
api.use(bodyParser.json())

//common routes
const registerStep1Route = require("./routes/registerStep1")
const registerStep2Route = require("./routes/registerStep2")
const getProductsRoute = require("./routes/getProducts")
const loginRoute = require("./routes/login")
const falseRoute = require("./routes/falseLogin")
const orderRoute = require("./routes/order")
const orderDownloadRoute = require("./routes/orderDownload")
const onInitRoute = require("./routes/onInit")
const addToCart = require("./routes/addToCart")
const getCart = require("./routes/getUserCart")
const updateCart = require("./routes/updateCart")
const DeleteAllFromCartRoute = require("./routes/removeAllFromCart")
const updateQuantityRoute = require("./routes/updateQuantity")
// ---------------------------------------------
// admin routes
const addProduct = require("./routes/addProduct")
const editProductsRoute = require("./routes/editProducts")

api.use("/", registerStep1Route)
api.use("/", registerStep2Route)
api.use("/", getProductsRoute)
api.use("/", editProductsRoute)
api.use("/", loginRoute)
api.use("/", falseRoute)
api.use("/", orderRoute)
api.use("/", orderDownloadRoute)
api.use("/", onInitRoute)
api.use("/", addToCart)
api.use("/", getCart)
api.use("/", updateCart)
api.use("/", DeleteAllFromCartRoute)
api.use("/", updateQuantityRoute)

// admin routes
api.use("/admin", addProduct)
api.use("/admin", editProductsRoute)

api.listen(port, (err) => {
    if (err) console.log("listen error:", err.message)
    console.log(`server runs on port ${port}`)
})