import Product from "../models/productModel.js"
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";
import User from "../models/userModels.js";
import { v2  as cloudinary} from "cloudinary";




//creating products
export const createProducts = handleAsyncError(async (req, res, next) => {
  let image=[];

  if(typeof req.body.image === 'string'){
    image.push(req.body.image)
  }else{
    image=req.body.image
  }


  const imageLinks = [];
  for(let i=0;i<image.length ; i++){
    const result = await cloudinary.uploader.upload(image[i],{
      folder:'products'
    })
    imageLinks.push({
      public_id:result.public_id,
      url:result.secure_url
    })
  }
  req.body.image=imageLinks
  // console.log(req.body)
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product
  })
})

// Get All Products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const apiFeatures = new APIFunctionality(Product.find(), req.query).search().filter();
  // console.log(req.query);


  //GETTING FILTER QUERY BEFORE PAGINATION 
  const filteredQuery = apiFeatures.query.clone();
  const productCount = await filteredQuery.countDocuments();
  // console.log("productCount", productCount);

  const totalPages = Math.ceil(productCount / resultPerPage);
  const page = Number(req.query.page) || 1;
  if (page > totalPages && productCount > 0) {
    return next(new HandleError("this page does not exist ", 404))
  }
  // console.log("Total pages ", totalPages);

  //Apply Pagination
  apiFeatures.pagination(resultPerPage);
  const products = await apiFeatures.query
  if (!products || products.length === 0) {
    return next(new HandleError("no Product Found", 404))
  }
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    totalPages,
    currentPage: page
  })

})

//Update products
export const updateProduct = handleAsyncError(async (req, res, next) => {

  let product = await Product.findById(req.params.id)
  if (!product) {
    return next(new HandleError("Product not Found", 404))
  }
  let images=[];
  if (typeof req.body.image ==='String'){
    images.push(req.body.image)
  }else if(Array.isArray(req.body.image)){
    images= req.body.image
  }

  if(images.length >0){
    for(let i=0;i<product.image.length;i++){
      await cloudinary.uploader.destroy(product.image[i].public_id)
    }

    //Upload Images
    
  const imageLinks = [];
  for(let i=0;i<images.length ; i++){
    const result = await cloudinary.uploader.upload(images[i],{
      folder:'products'
    })
    imageLinks.push({
      public_id:result.public_id,
      url:result.secure_url
    })
  }
  req.body.image=imageLinks

  }


   product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  

  res.status(200).json({
    success: true,
    product
  })
}
)

//Delete Product

export const deleteProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new HandleError("Product not Found", 404))
  }


  for(let i=0;i<product.image.length;i++){
    await cloudinary.uploader.destroy(product.image[i].public_id)
  }

  res.status(200).json({
    success: true,
    message: "product deleted successfully "
  })
}
)
//accessing single product detail 
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HandleError("Product not Found", 404))
  }
  res.status(200).json({
    success: true,
    product
  })


})


//CREATING AND UPDATING REVIEW 

export const createReviewForProduct = handleAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment
  }
  const product = await Product.findById(productId);
  //  console.log(product);
   if(!product){
        return next(new HandleError("Product not found ",400))
      }

  const reviewExists = product.reviews.find(review => review.user.toString() === req.user.id.toString());

  if (reviewExists) {
    product.reviews.forEach(review => {
      if (review.user.toString() === req.user.id.toString()) {
        review.rating = rating,
          review.comment = comment
      }
    })

  } else {
    product.reviews.push(review)
  }
  product.numOfReviews = product.reviews.length
  let sum = 0;
  product.reviews.forEach(review => {
    sum += review.rating
  })
  product.rating = product.reviews.length > 0 ? sum / product.reviews.length : 0

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    product
  })


})


//GETTING REVIEW 
export const getProductReviews= handleAsyncError(async (req, res, next) => {
      // console.log(req.query.id);
      const product = await Product.findById(req.query.id);
      if(!product){
        return next(new HandleError("Product not found ",400))
      }
      res.status(200).json({
        success:true,
        reviews:product.reviews
      })
      

})

// DELETE REVIEW (Admin)
export const deleteReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.query;

    if (!productId || !reviewId) {
      return res.status(400).json({
        success: false,
        message: "ProductId and ReviewId required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Filter out the review to be deleted
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== reviewId.toString()
    );

    if (reviews.length === product.reviews.length) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    // Update fields
    product.reviews = reviews;
    product.numOfReviews = reviews.length;

    // Recalculate rating
    if (reviews.length === 0) {
      product.ratings = 0;
    } else {
      product.ratings =
        reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    }

    await product.save({ validateBeforeSave: false });

    res
      .status(200)
      .json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete Review Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};



//ADMIN - GETTING ALL PRODUCT

export const getAdminProducts = handleAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products
  })
})

//ADMIN - GETTING USER REQUEST
export const getUsersList = handleAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users
  })
})

//ADMIN - GETTING SINGLE USER INFORMATION
export const getSingleUser = handleAsyncError(async (req, res, next) => {
  // console.log("GETTING SINGLE USER INFORMATION",req.params.id);
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new HandleError(`user doesn't exist  with this id:${req.params.id}`, 400))
  }

  res.status(200).json({
    success: true,
    user
  })

})

//ADMIN - CHANGING USER ROLE
export const updateUserRole = handleAsyncError(async (req, res, next) => {
  const { role } = req.body;
  const newUserData = {  role  }

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true
  })

  if (!user) {
    return next(new HandleError(`user doesn't exist  `, 400))
  }
  res.status(200).json({
    success: true,
    user
  })

})




//ADMIN- DELETE USER PROFILE
export const deleteUserProfile = handleAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new HandleError(`user doesn't exist  with this id:${req.params.id}`, 400))
  }

  const imageId = user.avatar.public_id;
  await cloudinary.uploader.destroy(imageId);
  await User.findByIdAndDelete(req.params.id)
  res.status(200).json({
    success: true,
    user
  })

})




