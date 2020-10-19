
function getUsersQuery() {
    return "SELECT * FROM `project4`.`users`";
}

function UserEmailExistQuery() {
    return "SELECT * FROM `project4`.`users` where email = ?";
}

function UserInsertionQueryStep1() {
    return "INSERT INTO `project4`.`users` (`email`,`password`) VALUES (?,?)";
}

function addDetailsQuery() {
    return "INSERT INTO `project4`.`users` (`name`,`lastName`,`city`,`street`,`email`,`id`,`password`) VALUES (?, ?, ?, ?, ?, ?, ?)";
}

function userExist() {
    return "SELECT * FROM `project4`.`users` WHERE email = ? and password = ?";
}

function createCart() {
    return "Insert INTO `project4`.`cartstatus`(`userid`,`createdon`) VALUES (?,?)";
}

function cartExist() {
    return "SELECT * FROM `project4`.`cartstatus` WHERE userid=?";
}

function removeActiveCart() {
    return "DELETE FROM `project4`.`cartstatus` WHERE `cartid` = ?";
}

function makeFalse() {
    return "UPDATE `project4`.`users` SET `first` = ? WHERE `idusers` = ?";
}

function addProductToCart() {
    return "INSERT INTO `project4`.`carts` (`cartid`,`productsid`,`quantity`) VALUES (?, ?, ?)";
}

function returnUserCart() {
    return "SELECT* FROM `project4`.`carts` WHERE `productsid`=? and `cartid`=?";
}

function changeQuantity() {
    return "UPDATE `project4`.`carts` SET `quantity`= ? WHERE `productsid`=? ";
}


function getUserByName() {
    return "SELECT * FROM `project4`.`users` WHERE `name` =?";
}

function getCartById() {
    return "SELECT * FROM `project4`.`cartstatus` WHERE `userid` =?";
}

function FullCart() {
    return "Select *, (project4.carts.quantity*project4.products.price)as totalpriceperitem, (select sum(project4.carts.quantity*project4.products.price) as cartotal from project4.carts right join project4.products on project4.carts.productsid=project4.products.id WHERE project4.carts.cartid=?) as totalprice from project4.carts right join project4.products on project4.carts.productsid=project4.products.id WHERE project4.carts.cartid=?"
}


function addOrder() {
    return "INSERT INTO `project4`.`orders` (`idusers`,`dateCreated`,`orderDate`,`totalPrice`) VALUES (?,?,?,?)";
}

function findOrderId() {
    return "SELECT * FROM `project4`.orders WHERE `idusers`=? and `dateCreated`=?";
}

function addDetails() {
    return "INSERT INTO `project4`.`orderdetails` (`orderid`,`productid`,`quantity`,`price`) VALUES (?,?,?,?)"
}

function addorderId() {
    return "INSERT INTO `project4`.`orderdetails` (`orderid`) VALUES (?)"
}

function addNewProduct() {
    return "INSERT INTO `project4`.`products` (`productName`,`category`,`price`,`img`) VALUES (?,?,?,?)"
}

function productExist() {
    return "SELECT * FROM `project4`.`products` WHERE productName = ?";
}

function getAllProducts() {
    return "SELECT * FROM `project4`.`products`"
}

function editProducts() {
    return "UPDATE `project4`.`products` SET `productName`= ?,`category`=?,`price`=?,`img`=? WHERE `id`=?";
}

function removeItemFromCart() {
    return "DELETE FROM `project4`.`carts` WHERE `cartid`=? and `productsid`=?";
}

function removeAllItemsFromCart() {
    return "DELETE FROM `project4`.`carts` WHERE `cartid`=? and `productsid`=?"
}

function updateQuery() {
    return "UPDATE `project4`.`carts` SET `quantity` = ? WHERE `cartid`=? and `productsid`=?";
}

module.exports = {
    getUsersQuery,
    UserEmailExistQuery,
    UserInsertionQueryStep1,
    addDetailsQuery,
    userExist,
    createCart,
    cartExist,
    removeActiveCart,
    makeFalse,
    addProductToCart,
    returnUserCart,
    changeQuantity,
    getUserByName,
    getCartById,
    FullCart,
    addOrder,
    findOrderId,
    addDetails,
    addorderId,
    addNewProduct,
    productExist,
    getAllProducts,
    editProducts,
    removeItemFromCart,
    removeAllItemsFromCart,
    updateQuery
}
