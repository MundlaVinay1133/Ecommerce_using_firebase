import React from 'react'
import {SeparateFile} from './SeparateFile'

const Products = ({products,addToCart}) => {
  return (
    <div className='products-wrapper'>
      {
        products.map((individualProduct)=>(
          <SeparateFile key={individualProduct.ID} individualProduct={individualProduct}
          addToCart={addToCart}/>
          
        ))
      }

    </div>
  )
  
}

export default Products