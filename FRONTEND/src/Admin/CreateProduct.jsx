import React, { useEffect, useState } from 'react'
import '../AdminStyles/CreateProduct.css'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import PageTitle from '../components/PageTitle'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, removeErrors, removeSuccess } from '../features/admin/adminSlice'
import { toast } from 'react-toastify'
function CreateProduct() {
    const { success, loading, error } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);



    const categories = ["electronics", "fashion", "health", "beauty", "home", " kitchen", "sports", "fitness", "books", "toy", "hardware"]
    const createProductSubmit = (e) => {
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
        dispatch(createProduct(myForm))
    }

    const createProductImage = (e) => {
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
    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: 'top-center',
                autoClose: 3000
            })
            dispatch(removeErrors());
            setName("");
            setPrice("");
            setDescription("");
            setCategory("");
            setStock("");
            setImage([]);
            setImagePreview([])
        }

        if (success) {
            toast.success("Product created Successfully ", {
                position: 'top-center',
                autoClose: 3000
            });
            dispatch(removeSuccess())
        }
    }, [dispatch, error, success])
    return (
        <>

            <Navbar />
            <PageTitle title="Create Products" />

            <div className="create-product-container">
                <h1 className='form-title' >Create Product</h1>
                <form className="product-form" encType='multipart/form-data' onSubmit={createProductSubmit}>
                    <input
                        type="text"
                        className='form-input'
                        placeholder='Enter Product Name'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required />

                    <input
                        type="number"
                        className='form-input'
                        placeholder='Enter Product Price'
                        name='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required />

                    <textarea
                        className='form-input'
                        placeholder='Enter Product Description'
                        name='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={5} 
                    />

                    <select
                        className='form-select'
                        required name='category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} >


                        <option value="">Choose a Category</option>
                        {categories.map((item) => {
                            return <option value={item} key={item}  >{item}</option>
                        })}
                    </select>
                    <input
                        type="number"
                        className='form-input'
                        placeholder='Enter Product Stock'
                        name='stock'
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required />
                    <div className="file-input-container">

                        <input
                            type="file"
                            name='image'
                            className='form-input-file'
                            accept='image/*'
                            multiple
                            required
                            onChange={createProductImage}
                        />

                    </div>

                    <div className="image-preview-container">
                        {imagePreview.map((img, index) => (
                            <img
                                src={img}
                                alt="Product Preview image "
                                key={index}
                                className='image-preview'
                            />
                        ))}
                    </div>
                    <button className="submit-btn">{loading ? 'Creating Product ......' : 'Create Product'} </button>
                </form>
            </div>

            <Footer />

        </>
    )
}

export default CreateProduct

