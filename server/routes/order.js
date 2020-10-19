const express = require("express")
const router = express.Router();
const sqlConnection = require("../databaseConnections/MySqlConnection")
const moment = require("moment")
const { WriteToFileAndAppend } = require("../functions/writeToFileAppend")
const tokenVerify = require("../validations/tokenVerify")
const { addOrder, findOrderId, addDetails, addorderId, removeActiveCart, createCart, cartExist } = require("./queries/queries")
const fs = require("fs");
const ejs = require("ejs")

router.post("/order", tokenVerify, async (req, res, next) => {
    try {
        const { user, cart, address } = req.body
        const deliveryDate = address.date.split("-").reverse().join("-")
        const orderCreationDate = moment().format('MMMM Do YYYY, h:mm:ss a')
        const shortCreationDate = moment().format("MMM Do YY")
        const ordersTemplatePath = '/assets/orders/order.html';
        let ordersTemplateUrl = `${process.cwd()}${ordersTemplatePath}`;
        let ordersTemplate = fs.readFileSync(ordersTemplateUrl, { encoding: 'utf-8' });
        let html = ejs.render(ordersTemplate, { cart: cart, user: user, orderCreationDate: orderCreationDate, address: address, deliveryDate: deliveryDate });
        const addOrder = await newOrder(user, cart, deliveryDate, orderCreationDate)
        const orderId = await getOrderId(user.data.idusers, orderCreationDate, cart)
        const FullOrderDetails = await addFullOrderDetails(orderId, cart)
        const removeCart = cartRemover(cart[0].cartid)
        const getNewC = await getNewCart(user)
        const fileName = "./files/orders/" + "User Id " + user.data.idusers + " " + shortCreationDate + " orderNumber " + orderId + ".pdf"
        const pdf = require('html-pdf');
        let options = {
            "height": "12in",
            "width": "10in",
            "format": "Letter",
            "orientation": "portrait",
            "paginationOffset": 1,
            "zoomFactor": "1",
            "type": "pdf"
        }
        pdf.create(html, options).toFile(fileName, function (err) {
            return res.status(200).json({ message: err || "ok", fileName: fileName, newCart: getNewC });
        });
    }
    catch (error) {
        console.log("order", error.message)
    }
})





module.exports = router


const newOrder = async (user, cart, deliveryDate, orderCreationDate) => {
    try {
        const totalPrice = cart[0].totalprice
        const payload = [user.data.idusers, orderCreationDate, deliveryDate, totalPrice]
        const orderQuery = addOrder()
        const result = await sqlConnection.execute(orderQuery, payload)
    }
    catch (error) {
        console.log("newOrder", error.message)
    }
}

const getOrderId = async (userId, deliveryDate, cart) => {
    try {
        const payload = [userId, deliveryDate]
        const OrderIdQuery = findOrderId()
        const result = await sqlConnection.execute(OrderIdQuery, payload)
        return result[0][0].idorders
    }
    catch (error) {
        console.log("getOrderId", error.message)
    }
}

const addFullOrderDetails = async (orderId, cart) => {
    try {
        const payload = [orderId]
        const orderIdQuery = addorderId()
        const result1 = await sqlConnection.execute(orderIdQuery, payload)
        const detailsQuery = addDetails()
        for (let index = 0; index < cart.length; index++) {
            const result2 = await sqlConnection.execute(detailsQuery, [orderId, cart[index].productsid, cart[index].quantity, cart[index].price])
        }
    }
    catch (error) {
        console.log("addFullOrderDetails", error.message)
    }
}

const cartRemover = async (cartId) => {
    try {
        const payload = [cartId]
        const removeQuery = removeActiveCart()
        const result = await sqlConnection.execute(removeQuery, payload)
    }
    catch (error) {
        console.log("cartRemover", error.message)
    }
}

const getNewCart = async (user) => {
    try {
        const { idusers } = user.data
        const date = moment().format('MMMM Do YYYY, h:mm:ss a')
        const payload1 = [idusers, date]
        const cartQuery = createCart()
        const result1 = await sqlConnection.execute(cartQuery, payload1)
        const payload2 = [idusers]
        const cartExistQuery = cartExist()
        const result2 = await sqlConnection.execute(cartExistQuery, payload2)
        if (result2[0].length === 0) return null
        if (result2[0][0]) return result2[0][0]
    }
    catch (error) {
        console.log("getNewCart", error.message)
    }
}
