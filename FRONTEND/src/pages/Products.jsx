import React, { useState } from 'react'
import '../pageStyles/Products.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { useEffect } from 'react'
import { getProduct, removeError } from '../features/products/productSlice'
import Loader from '../components/Loader'

import NOproducts from './NOproducts.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Pagination from '../components/Pagination.jsx'
function Products() {
  const { loading, error, products, totalPages, resultPerPage, productCount } = useSelector(state => state.product);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search)
  // console.log("SEarch params",searchParams);
  const keyword = searchParams.get("keyword")
  const category = searchParams.get("category")
  const pageFromURL = parseInt(searchParams.get("page"), 10) || 1
  const [currentPage, setCurrentPage] = useState(pageFromURL)
  // console.log(keyword);

  const categories = ["electronics", "fashion", "health", "beauty", "home "," kitchen","sports","fitness","books","toy","hardware"];

  useEffect(() => {
    dispatch(getProduct({ keyword, page: currentPage, category }))
  }, [dispatch, keyword, currentPage, category]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: 'top-center',
        autoclose: 3000
      });
      dispatch(removeError())
    }
  }, [dispatch, error])

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      const newSearchParams = new URLSearchParams(location.search);
      if (page === 1) {
        newSearchParams.delete('page')
      } else {
        newSearchParams.set('page', page)
      }
      navigate(`?${newSearchParams.toString()}`);
    }
  }

  const handleCategoryClick = (category) => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('category', category)
    newSearchParams.delete('page')
    navigate(`?${newSearchParams.toString()}`);

  }

  return (
    <>
      {loading ? (<Loader />) : (<>
        <PageTitle title='All Products' />
        <Navbar />
        <div className="products-layout">
          <div className="filter-section">
            <h3 className="filter-section">
              CATEGORIES
            </h3>
            {/* Render categories */}

            <ul>
              {
                categories.map((category) => {
                  return (
                    <li key={category} onClick={() => handleCategoryClick(category)} >  {category}</li>
                  )
                })
              }
            </ul>
          </div>
          <div className="products-section">
            {products.length > 0 ? (
              <div className="products-product-container">
                {
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))
                }
              </div>) : (<NOproducts keyword={keyword} />)
            }
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
            // totalPages={Math.ceil(productCount / resultPerPage)}
            />
          </div>
        </div>
        <Footer />
      </>)}
    </>
  )
}

export default Products