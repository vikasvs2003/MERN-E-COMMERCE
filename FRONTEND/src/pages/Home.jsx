import React, { useEffect } from 'react'
import '../pageStyles/Home.css'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import ImageSlider from '../components/ImageSlider.jsx'
import Product from '../components/Product.jsx'
import PageTitle from '../components/PageTitle.jsx'
import Loader from '../components/Loader.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, removeError } from '../features/products/productSlice.js'
import { toast } from 'react-toastify'




function Home() {
  const { loading, error, products, productCount } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct({keyword:""}))
  }, [dispatch])

  useEffect(()=>{
    if(error){
      toast.error(error.message,{position:'top-center',
        autoClose:3000 });
        dispatch(removeError())
    }
  },[dispatch,error])




  return (
<>
      {loading ? (<Loader />) : (

        <>
          <PageTitle title="Home" />
          <Navbar />
          <ImageSlider />
          <div className="home-container">
            <h2 className="home-heading">Trending Now</h2>
            <div className="home-product-container">
              {
                products.map((product, index) => (
                  <Product product={product} key={index} />
                ))
              }
            </div>
          </div>
          <Footer />
        </>
      ) }
    </>
  )
}

export default Home