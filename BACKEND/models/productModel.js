import mongoose from "mongoose";



const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "please Enter Product Description"]
    },
    price: {
        type: Number,
        required: [true, "please Enter rice of Product"],
        maxLength: [7, "Price can not exceed 7 digits "]
    },
    rating: {
        type: Number,
        default: 0
    },
    image: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true

            }
        }
    ],
    category: {
        type: String,
        required: [true, "please Enter Product category "]
    },
    stock: {
        type: Number,
        required: [true, "please Enter Product Stock"],
        maxLength: [5, "proce can not exceed 5 "],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            }
        ,
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


export default mongoose.model("product",productSchema)