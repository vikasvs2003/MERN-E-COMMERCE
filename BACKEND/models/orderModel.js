import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, "Please provide shipping address"]
        },
        city: {
            type: String,
            required: [true, "Please provide city"]
        },
        state: {
            type: String,
            required: [true, "Please provide state"]
        },
        country: {
            type: String,
            required: [true, "Please provide country"]
        },
        pinCode: {
            type: Number,
            required: [true, "Please provide pinCode"]
        },
        phoneNumber: {
            type: Number,
            required: [true, "Please provide phone number"]
        }
    },

    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "product",
                required: true
            }
        }
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
        // id: String, // e.g. Razorpay / Stripe ID
        // status: String
    },
    paidAt:{
        type:Date,
        required:true
    },
    itemsPrice: {
        type: Number,
        default: 0,
        required: true
    },

    taxPrice: {
        type: Number,
        default: 0,
        required: true
    },

    shippingPrice: {
        type: Number,
        default: 0,
        required: true
    },

    totalPrice: {
        type: Number,
        default: 0,
        required: true
    },

    deliveredAt: Date,
    orderStatus: {
        type: String,
        default: "Processing"
    },


    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Order", orderSchema);
