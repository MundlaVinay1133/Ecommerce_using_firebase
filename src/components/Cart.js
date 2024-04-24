import React, { useTransition } from 'react'
import Navbar from './Navbar'
import { useState,useEffect } from 'react';
import {auth,fs} from '../Config/Config';
import { CartProducts } from './CartProducts';
import StripeCheckout from 'react-stripe-checkout';
import Invoice from './Invoice';
import { PDFViewer } from '@react-pdf/renderer';

export const Cart = () => {

    
    function GetCurrentUser(){
         const[user,setUser]=useState(null);
        useEffect(()=>{
             auth.onAuthStateChanged(user=>{
              if(user){
                fs.collection('users').doc(user.uid).get().then(snapshot=>{
                  setUser(snapshot.data().FullName);
                })
    
              }else{
                 setUser(null)
              }
             })
        },[])
        return user;
      }
      const user=GetCurrentUser();

      const[cartProducts,setCartProducts]=useState([]);

      useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart'+user.uid).onSnapshot(snapshot=>{
                    const newCartProduct=snapshot.docs.map((doc)=>({
                        ID:doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);
                })

            }
            else{
                console.log('user is not signed to retrive cart')
            }
        })
      },[])
    //   console.log(cartProducts);
     
    const qty=cartProducts.map((cartProduct)=>{
      return cartProduct.qty;
    })
    // console.log(qty);
    const reduceQty=(accumulator,currentValue)=>accumulator+currentValue;
    const totalQty=qty.reduce(reduceQty,0);
    // console.log(totalQty);
    

    const price=cartProducts.map((cartProduct)=>{
      return cartProduct.TotalProductPrice;
    })
   
    const reducePrice=(accumulator,currentValue)=>accumulator+currentValue;
    const totalPrice=price.reduce(reducePrice,0);



    let Product;
    const cartProductIncrease=(cartProduct)=>{
      //  console.log(cartProduct); 
      Product=cartProduct;
      Product.qty=Product.qty+1;
      Product.TotalProductPrice=Product.qty*Product.price;
      auth.onAuthStateChanged(user=>{
        if(user){
          fs.collection('Cart'+user.uid).doc(cartProduct.ID).update(Product).then(()=>{
            console.log('increment added');
          })

        }
        else{
          console.log("user is not logged in");
        }
      })
    }

    const cartProductDecrease=(cartProduct)=>{
      Product=cartProduct;
      if(Product.qty>1){
        Product.qty=Product.qty-1;
        Product.TotalProductPrice=Product.qty*Product.price;
      }
      auth.onAuthStateChanged(user=>{
        if(user){
          fs.collection('Cart'+user.uid).doc(cartProduct.ID).update(Product).then(()=>{
            console.log('decremented');
          })

        }
        else{
          console.log("user is not logged in");
        }
      })
    }

    const[totalProducts,setTotalProducts]=useState(0);

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        fs.collection('Cart'+user.uid).onSnapshot(snapshot=>{
          const qty=snapshot.docs.length;
          setTotalProducts(qty);
        })
      }
    })
    
  },[])

  const[showInvoice,setShowInvoice]=useState(false);


  return (
    <>
    <Navbar user={user} totalProducts={totalProducts}
    
    />
    <br/>
    {cartProducts.length >0 && (
        <div className='container-fluid'>
            <h1 className='text-center'>Cart</h1>
            <div className='products-box'>
                <CartProducts cartProducts={cartProducts}
                cartProductIncrease={cartProductIncrease}
                cartProductDecrease={cartProductDecrease}/>
            </div>
            <div className='summary-box'>
              <h5>Cart Summary</h5>
              <br></br>
              <div className='productqty'>
                Total No of Products :<span className='t'>{totalQty}</span>
              </div>
              <div className='productqty'>
                Total Price to Pay : <span className='t'> $ {totalPrice}</span>
              </div>
              <br></br>
              <StripeCheckout className='paycard'>

              </StripeCheckout>

              <button onClick={() => setShowInvoice(true)} className='pdf'>
          Generate Invoice PDF
        </button>
        {showInvoice && (
          <PDFViewer width="1000" height="600" >
            <Invoice totalQty={totalQty} totalPrice={totalPrice} />
          </PDFViewer>
        )}
            </div>
        </div>
    )}
    {cartProducts.length <1 &&(
        <div className='container-fluid'>No products to show</div>
    )}
    </>
  )
}
