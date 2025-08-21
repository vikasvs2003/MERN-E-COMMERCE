import order from "../models/orderModel.js"
import Product from "../models/productModel.js"
import User from "../models/userModels.js"
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js"; // ✅ Make sure this path is correct
import Order from "../models/orderModel.js";



// create new order

export const createNewOrder = handleAsyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })
    res.status(200).json({
        success: true,
        order
    })
})

//GETTING SINGLE ORDER

export const getSingleOrder = handleAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
        return next(new HandleError("No Error Found", 404));
    }

    res.status(200).json({
        success: true,
        order
    })
})

//ALL MY/ USER ORDER
export const allMyOrder = handleAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
    if (!orders) {
        return next(new HandleError("No Error Found", 404));
    }

    res.status(200).json({
        success: true,
        orders
    })
})

//ADMIN - GETTING ALL THE ORDERS
export const getAllOrders = handleAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    if (!orders) {
        return next(new HandleError("No Error Found", 404));
    }
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })


    res.status(200).json({
        success: true,
        orders,
        totalAmount
    })
})


//UPDATE ORDER STATUS
export const updateOrderStatus = handleAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new HandleError("No Error Found", 404));
    }
    if (order.orderStatus === 'Delivered') {
        return next(new HandleError("This Order is already been delivered ", 404))
    }

    await Promise.all(order.orderItems.map(item => updateQuantity(item.product, item.quantity)))


    order.orderStatus = req.body.status;
    if (order.orderStatus === 'Delivered') {
        order.deliveredAt = Date.now()
    }

    await order.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
        order
    })

})
async function updateQuantity(id, quantity) {
    const product = await Product.findById(id);
    if (!product) {
        return new Error("product not found");
    }
    product.stock -= quantity
}

//  ORDER


//DELETE ORDER STATUS
export const deleteOrder = handleAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new HandleError("No Order Found", 404));
    }

    if(order.orderStatus !== 'Delivered'){
        return next (new HandleError("this is under processing and can not be deleted",404))
    }

    await Order.deleteOne({_id:req.params.id})

    // await order.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
        message: " order delete successfully ",
        order
    })
})