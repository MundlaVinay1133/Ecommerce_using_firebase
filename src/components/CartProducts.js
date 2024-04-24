import React from 'react'
import { IndividualCartProduct } from './IndividualCartProduct';

export const CartProducts = ({cartProducts,cartProductIncrease,cartProductDecrease}) => {
  return (
    <div className='products-wrapper'> {/* Add wrapper class here */}
            {cartProducts.map(cartProduct => (
                <IndividualCartProduct
                    key={cartProduct.ID}
                    cartProduct={cartProduct}
                    cartProductIncrease={cartProductIncrease}
                    cartProductDecrease={cartProductDecrease}
                />
            ))}
        </div>
  )
}
