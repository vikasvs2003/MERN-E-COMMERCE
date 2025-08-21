import React, { useState } from 'react'
import '../componentStyles/Product.css'
import { Link } from 'react-router-dom';
import Rating from './Rating';
function Product({ product }) {
    // console.log(product);
    const [rating, setRating] = useState(0);
    const handleRatingChange = (newRating) => {
        setRating(newRating); 
        // console.log(`rating changed to : ${newRating}`);
    };


    return (
        <Link to={`/product/${product._id}`} className='product_id' >
            <div className="product-card">
                <img src={product.image[0].url} alt={product.name} className='product-image-card' />
                <div className="product-details">
                    <h1 className='product-title'>  {product.name}</h1>
                    <p className="home-price"> <strong> Price</strong>  {product.price} </p>
                    <div className="rating-container">
                        <Rating
                            value={product?.rating  || 0}
                            onRatingChange={handleRatingChange}
                            disabled={true}
                        />
                    </div>

                    <span className="productCardSpan">
                        ( {product.numOfReviews}{product.numOfReviews === 1 ? " Review" : " Reviews"} )
                    </span>
                    <button className='add-to-cart' > View Details</button>
                </div>
            </div>
        </Link>
    )
}

export default Product