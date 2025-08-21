import express from 'express';
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';
import { allMyOrder, createNewOrder, deleteOrder, getAllOrders, getSingleOrder, updateOrderStatus } from '../controller/orderController.js';
const router = express.Router();


router.route('/new/order').post(verifyUserAuth,createNewOrder)
router.route('/order/:id')
.get(verifyUserAuth,getSingleOrder)
router.route('/admin/order/:id')
.get(verifyUserAuth, roleBasedAccess('admin'),getSingleOrder)
.put( verifyUserAuth,roleBasedAccess('admin') , updateOrderStatus)
.delete(verifyUserAuth, roleBasedAccess('admin'),deleteOrder)
router.route('/orders/user').get(verifyUserAuth,allMyOrder)
router.route('/admin/orders').get(verifyUserAuth, roleBasedAccess('admin'), getAllOrders)



export default router;