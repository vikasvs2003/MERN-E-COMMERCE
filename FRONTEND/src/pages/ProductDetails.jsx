import React, { useEffect, useState } from 'react'
import '../pageStyles/ProductDetails.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createReview, getProductDetails, removeError, removeSuccess } from '../features/products/productSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { addItemsToCart, removeMessage } from '../features/cart/cartSlice'
function ProductDetails() {
    const [userRating, setUserRating] = useState(0);
    const [comment, setComment] = useState("")
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState("");
    const handleRatingChange = (newRating) => {
        setUserRating(newRating)
        
    }
    const { loading, error, product, reviewSuccess, reviewLoading } = useSelector((state) => state.product);
    // console.log("products hai  ", product);

    const { loading: cartLoading, error: cartError, success, message, cartItems } = useSelector((state) => state.cart);
    // console.log("cartitems hai ->", cartItems);


    const dispatch = useDispatch();
    //    console.log(useParams());
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            dispatch(getProductDetails(id))
        }
        return () => {
            dispatch(removeError())
        }

    }, [dispatch, id])


    useEffect(() => {
        if (error) {
            toast.error(error.message, { position: 'top-center', autoclose: 3000 })
            dispatch(removeError)
        }
        if (cartError) {
            toast.error(cartError, { position: 'top-center', autoclose: 3000 })
        }
    }, [dispatch, error, cartError])

    useEffect(() => {
        if (success) {
            toast.success(message, { position: 'top-center', autoclose: 3000 })
            dispatch(removeMessage())
        }
    }, [dispatch, success, message])




    const decreaseQuantity = () => {
        if (quantity <= 1) {
            toast.error('Quantity can not be less than one',
                {
                    position: 'top-center',
                    autoClose: 3000
                }
            )
            dispatch(removeError())
            return
        }
        setQuantity(qty => qty - 1)
    }


    const increaseQuantity = () => {
        if (product.stock <= quantity) {
            toast.error('Cannot exceed available stock',
                {
                    position: 'top-center',
                    autoClose: 3000
                }
            )
            dispatch(removeError())
            return
        }
        setQuantity(qty => qty + 1)
    }
    const addToCart = () => {
        dispatch(addItemsToCart({ id, quantity }))
    }

    const handleReviewSubmit = (e) => {
        e.preventDefault()
        if (!userRating) {
            toast.error('please select a rating',
                {
                    position: 'top-center',
                    autoClose: 3000
                }
            )
            return
        }
        dispatch(createReview({
            rating: userRating,
            comment,
            productId: id
        }))

    }



    useEffect(() => {
        if (reviewSuccess) {
            toast.success('Review Submited Successfully',
                {
                    position: 'top-center',
                    autoClose: 3000
                }
            );
            setUserRating(0);
            setComment("");
            dispatch(removeSuccess())
            dispatch(getProductDetails(id))

        }
    }, [reviewSuccess, id, dispatch])


    useEffect(() => {
        if (product && product.image && product.image.length > 0) {
            setSelectedImage(product.image[0].url)
        }
    }, [product])
    if (loading) {
        return (
            <>
                <Navbar />
                <Loader />
                <Footer />
            </>
        )
    }
    return (
        <>
            <PageTitle title={`${product?.name}-details`} />

            <Navbar />
            <div className="product-details-container">
                <div className="product-detail-container">

                    <div className="product-image-container">
                        {/* Main Image */}
                        <img
                            src={selectedImage}
                            alt={product?.name}
                            className="product-detail-image"
                        />

                        {/* Thumbnails */}
                        {product?.image?.length > 1 && (
                            <div className="product-thumbnails">
                                {product?.image.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={`thumbnail${index + 1}`}
                                        className={`thumbnail-image ${selectedImage === image.url ? "active" : ""}`}
                                        onClick={() => setSelectedImage(image.url)}   // ✅ thumbnail click se main image change
                                    />
                                ))}
                            </div>
                        )}
                    </div>


                    <div className="product-info">

                        <h2>{product?.name}</h2>
                        <p className="product-description">{product?.description}</p>
                        <p className="product-price">Price: ₹{product?.price}</p>

                        <div className="product-rating">
                            <Rating value={product?.rating} disabled={true} />
                            <span className="productCardSpan">
                                ({product?.numOfReviews}{" "}
                                {product?.numOfReviews === 1 ? "Review" : "Reviews"})
                            </span>
                        </div>

                        <div className="stock-status">
                            <span className={product?.stock > 0 ? "in-stock" : "out-of-stock"}>
                                {product?.stock > 0
                                    ? `In Stock (${product.stock} available)`
                                    : "Out of Stock"}
                            </span>
                        </div>




                        {product?.stock > 0 && (
                            <> <div className="quantity-controls">
                                <span className="quantity-label">Quantity</span>
                                <button className='quantity-button' onClick={decreaseQuantity}  >-</button>
                                <input
                                    type="text"
                                    value={quantity}
                                    className='quantity-value'
                                    readOnly
                                />
                                <button className='quantity-button' onClick={increaseQuantity}   >+</button>

                            </div>
                                <button className='add-to-cart-btn' onClick={addToCart} disabled={cartLoading}  > {cartLoading ? 'Adding ' : 'Add to Cart'}</button>
                            </>)

                        }

                        <form action="" className="review-from" onSubmit={handleReviewSubmit} >
                            <h3>Write a Review</h3>
                            <Rating value={0} disabled={false} onRatingChange={handleRatingChange} />
                            <textarea name="" id="" placeholder='Write Your Review here . . ' className='review-input' value={comment} onChange={(e) => setComment(e.target.value)} required  >    </textarea>
                            <button className='submit-review-btn' disabled={reviewLoading} >{reviewLoading ? 'Submiting......' : 'SUBMIT REVIEW'}</button>
                        </form>
                    </div>
                </div>

                <div className="reviews-container">
                    <h3>Customer Reviews</h3>
                    {product?.reviews && product.reviews.length > 0 ? (
                        <div className="reviews-section">
                            {
                                product?.reviews.map((review, index) => (

                                    <div className="review-item" key={index} >
                                        <div className="review-header">
                                            <Rating value={review.rating} disabled={true} />
                                        </div>
                                        <p className="review-comment">{review.comment}</p>
                                        <p className='review-name' >By : {review.name}</p>
                                    </div>


                                ))
                            }
                        </div>


                    ) : <p className='no reviews' > No Reviews yet . Be the first to review this product</p>
                    }

                </div>



            </div>
            <Footer />
        </>
    )
}

export default ProductDetails