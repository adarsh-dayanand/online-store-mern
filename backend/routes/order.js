const express = require('express')
const router = express.Router()

const {getUserById, pushOrderInPurchaseList} = require('../controllers/user')
const {isAdmin, isAuthenticated, isSignedIn} = require('../controllers/auth')
const {updateStock} = require('../controllers/product')

const {
    getOrderById, 
    createOrder, 
    getAllOrders, 
    getOrderStatus, 
    updateStatus} = require('../controllers/order')

//params
router.param('userId', getUserById)
router.param('orderId', getOrderById)

//actual route
router.post('/order/create/:userId', 
    isSignedIn, 
    isAuthenticated, 
    pushOrderInPurchaseList, 
    updateStock, 
    createOrder
)

router.get('/order/all/:userId', 
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getAllOrders    
)
//order status
router.get('/order/status/:userId', isSignedIn, isAuthenticated, isAdmin, getOrderStatus)
router.put('/order/:orderId/:status/:userId', isSignedIn, isAuthenticated, isAdmin, updateStatus)

module.exports = router