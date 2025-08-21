import React, { useEffect, useState } from 'react'
import '../AdminStyles/ReviewsList.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import { Delete } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, deleteReview, fetchAdminProducts, fetchProductReviews, removeErrors, removeSuccess } from '../features/admin/adminSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'

function ReviewsList() {
    const { products, loading, error,reviews ,success,message} = useSelector(state => state.admin);
    // console.log("Product REview List",products);
    // console.log("Product REviews ",reviews);
    const [selectedProduct , setSelectedProduct] = useState(null)
    const navigate=useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAdminProducts())
    }, [dispatch])

    useEffect(() => {
        if (error) {
            toast.error(error.message, {
                position: 'top-center',
                autoClose: 3000
            });
            dispatch(removeErrors())
        }
    }, [dispatch, error])

    const handleViewReviews=(productId)=>{
        setSelectedProduct(productId)
        dispatch(fetchProductReviews(productId))

    }
    const handleDeleteReview =(productId,reviewId)=>{
            const confirm= window.confirm('Are You sure You want to delete this Review');
            if(confirm){
                dispatch(deleteReview({productId,reviewId}))
            }
    }
    
    useEffect(() => {
        if (error) {
            toast.error(error.message, {
                position: 'top-center',
                autoClose: 3000
            });
            dispatch(removeErrors())
        }

        if(success){
            toast.success(message, {
                position: 'top-center',
                autoClose: 3000
            });
            dispatch(removeSuccess())
            dispatch(clearMessage())
            navigate('/admin/products')

        }
    }, [dispatch, error,success,message])

    if(!products || products.length===0){
        return(
            <div className="review-list-container">
                <h1 className="reviews-list-title"> Admin Reviews</h1>
                <p>No Product Found</p>
            </div>
        )
    }

    return (
        <>
            {loading ? (<Loader />) : (<>
                <Navbar />
                <PageTitle title="All Reviews" />
                <div className="reviews-list-container">
                    <h1 className='reviews-list-title'> All Products</h1>
                    <table className='reviews-table' >
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Product Name</th>
                                <th>Product Image</th>
                                <th>Number of Review</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {products.map((product,index) => (
                                <tr>
                                    <td>  {index+1} </td>
                                    <td>  {product.name} </td>
                                    <td>
                                        <img src={product.image[0].url} alt={product.name} className='product-image' />
                                    </td>
                                    <td>  {product.numOfReviews} </td>
                                    <td> 

                                    {   product.numOfReviews > 0 &&  <button className='action-btn view-btn' onClick={()=>handleViewReviews(product._id)} >View Reviews </button> }
                                    
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>


                  { selectedProduct && reviews && reviews.length >0 && (  <div className="review-details">
                        <h2>Reviews for Product</h2>
                        <table className='reviews-table' >
                            <thead>
                                <tr>
                                    <th> S.No </th>
                                    <th> Reviewer Name  </th>
                                    <th> Rating   </th>
                                    <th> Comment </th>
                                    <th> Action  </th>

                                </tr>
                            </thead>
                            <tbody>
                            {   reviews.map((review,index)=>(
                                 <tr key={review._id} >
                                    <td> {index+1}  </td>
                                    <td> {review.name}  </td>
                                    <td>  {review.rating} </td>
                                    <td>  {review.comment} </td>
                                    <td>
                                        <button className="action-btn delete-btn" onClick={()=>handleDeleteReview(selectedProduct,review._id)} >
                                            <Delete />
                                        </button>
                                    </td>
                                </tr>

                            ))}
                            </tbody>

                        </table>
                    </div>)}

                </div>

                <Footer />

            </>)}
        </>
    )
}

export default ReviewsList