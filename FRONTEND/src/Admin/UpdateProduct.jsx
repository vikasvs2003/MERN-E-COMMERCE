
import '../AdminStyles/UpdateProduct.css'
import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetails } from '../features/products/productSlice';
import { removeErrors, removeSuccess, updateProduct } from '../features/admin/adminSlice';
import { toast } from 'react-toastify';
// import "./UpdateProduct.css"; // styling alag css file mein

function UpdateProduct() {
  // static product data (baad mein API se load kar lena)
  

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [oldImage, setOldImage] = useState([]);
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

const {product}=useSelector(state=>state.product)
const {success,error,loading}=useSelector(state=>state.admin)
const dispatch=useDispatch();
const navigate=useNavigate()
const {updateId}=useParams();
  const categories =  ["electronics", "fashion", "health", "beauty", "home ", "kitchen","sports","fitness","books","toy","hardware"];


  useEffect(()=>{
dispatch(getProductDetails(updateId))
  },[dispatch,updateId])

  useEffect(()=>{
      if(product){
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.categories);
        setStock(product.stock);
        setOldImage(product.image);
      }
  },[product])

  const updateProductSubmit = (e) => {
    e.preventDefault();
     const myForm = new FormData();
            myForm.set('name', name);
            myForm.set('price', price);
            myForm.set('description', description);
            myForm.set('category', category);
            myForm.set('stock', stock);
            image.forEach((img) => {
                myForm.append('image', img)
            })

dispatch(updateProduct({id:updateId,formData:myForm}))
    // console.log("Updated Product Data:", product);
   
  };
  const handleImageChange=(e)=>{
    const files = Array.from(e.target.files);
        setImage([]);
        setImagePreview([])
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview((old) => [...old, reader.result]);
                    setImage((old) => [...old, reader.result]);
                }
            }

            reader.readAsDataURL(file)
        })
               
  }

  useEffect(()=>{
      if(success){
        toast.success("product Updated SuccessFully ",{position:'top-center',
          autoClose:3000 });
          dispatch(removeSuccess())
          navigate('/admin/products')
      }
    },[dispatch,success])
  useEffect(()=>{
      if(error){
        toast.error(error,{position:'top-center',
          autoClose:3000 });
          dispatch(removeErrors())
      }
    },[dispatch,error])

  return (
    <>
      <Navbar />
      <PageTitle title="Update Product" />
      <div className="update-product-wrapper">
        <h1 className='update-product-title' >Update Product</h1>
        <form className="update-product-form" onSubmit={updateProductSubmit} encType='multipart/formData'>

          <label htmlFor='name' >Product Name</label>
          <input
            className='update-product-input'
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id='name'
            required
          />


          <label htmlFor='price' > Product Price (₹)</label>
          <input
            type="number"
            name="price"

            id='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}

          />



          <label htmlFor='description' > Product Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id='description'
            className='update-product-textarea'
          />


          <label htmlFor='category' >Category</label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id='category'
            className='update-product-select'
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>



          <label htmlFor='' >Product Stock</label>
          <input
            type="number"
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            id='stock'
            className='update-product-input'
          />



          <label htmlFor='image' >Product Image</label>
          <div className='update-product-file-wrapper' >
            <input
              type="file"
              name="image"
              id='image'
              accept='image/*'
              className='update-product-file-input'
              onChange={handleImageChange   }

              multiple
            />
          </div>


          <div className="update-product-preview-wrapper">
            {imagePreview.map((img, index) => (
              <img
                src={img}
                key={index}
                alt="preview"
                className="update-product-preview-image"
              />
            ))}
          </div>

          <div className="update-product-old-images-wrapper">
            {oldImage.map((img, index) => (
              <img src={img.url} key={index} alt="old  Preview" className='update-product-old-image' />
            ))}

          </div>
          <button type="submit" className="update-product-submit-btn">
           {loading ? 'Updating Product' :"Update Product"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
