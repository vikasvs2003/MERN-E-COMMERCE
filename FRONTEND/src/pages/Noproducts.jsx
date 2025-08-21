import React from 'react'
import '../componentStyles/Noproducts.css'
function NOproducts({keyword}) {
  return (
    <div className="no-product-content">
        <div className="no-products-icon"> ⚠️</div>
            <h3 className="no-products-title">
    No Product Found
            </h3>
            <p className='no-products-message' >
                { keyword?`we couldnot find any prodcuts matching ${keyword}.Try using different item or browse our complete catalog`:'No Products are currently avaiable .Please check back later'}
            </p>
        
    </div>


  )
}

export default NOproducts