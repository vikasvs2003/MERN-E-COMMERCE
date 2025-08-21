import React, { useState } from 'react'
import '../componentStyles/Navbar.css'
import { Link, useNavigate  } from 'react-router-dom'

import {useSelector } from 'react-redux'
import { PersonAdd, Search, ShoppingCart, Close, Menu } from '@mui/icons-material'
import '../pageStyles/Search.css';

function Navbar() {

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`)
        } else {
            navigate(`/products`)
        }
        setSearchQuery("")
    }



    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");



    const toggleSearch = () => setIsSearchOpen(!isSearchOpen)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const { isAuthenticated }  = useSelector(state => state.user)
    const { cartItems }  = useSelector(state => state.cart)




    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to='/' onClick={() => setIsMenuOpen(false)}  >ShopKart</Link>
                </div>

                <div className={`navbar-links  ${isMenuOpen ? 'active' : ""} `}>
                    <ul>
                        <li> <Link to="/"> Home</Link> </li>
                        <li> <Link to="/products"> Products</Link> </li>
                        <li> <Link to="/about-us"> About US</Link> </li>
                        <li> <Link to="/contact-us"> Contact Us </Link> </li>
                    </ul>
                </div>
                <div className="navbar-icons">
                    <div className="search-container">
                        <form className={` search-form ${isSearchOpen ? 'active' : ' '} `} onSubmit={handleSearchSubmit} >
                            <input
                                type="text"
                                className='search-input'
                                placeholder='search products'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}

                            />

                            <button type='button' className='search-icon' onClick={toggleSearch} >
                                <Search focusable="false" />
                            </button>

                        </form>
                    </div>

                    <div className="cart-container">
                        <Link to="/cart">
                            <ShoppingCart className='icon' />
                            <span className="cart-badge"> {cartItems.length}  </span>
                        </Link>
                    </div>

                    {!isAuthenticated && <Link to='/register' className='register-link' >
                        <PersonAdd className='icon' />
                    </Link>}

                    <div className="navbar-hamburger" onClick={toggleMenu} >
                        {isMenuOpen ? <Close className='icon' /> : <Menu className='icon' />}
                    </div>


                </div>
            </div>
        </nav>
    )
}

export default Navbar