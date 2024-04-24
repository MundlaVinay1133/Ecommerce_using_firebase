import React, { useEffect, useState } from 'react'
import Products from './Products';
import Navbar from './Navbar'
import {auth,fs} from '../Config/Config';
import { useHistory } from 'react-router-dom';
import IndividualFilteredProduct from './IndividualFilteredProduct';
import { Link } from 'react-router-dom';

const Home = () => {
  const history=useHistory();

  function GetUserUid(){
     const[uid,setUid]=useState(null);
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
        setUid(user.uid);
        }
      })
    },[])
    return uid;
  }
  const uid=GetUserUid();

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
    // console.log(user);

  const [products,setProducts]=useState([]);
    

  const getProducts= async ()=>{
    const products=await fs.collection('Products').get();
    const productsArray=[];
    for(var snap of products.docs){
      var data=snap.data();
      data.ID=snap.id;
      productsArray.push({...data})
      if(productsArray.length===products.docs.length){
        setProducts(productsArray);
    }
  }
}
  useEffect(()=>{
    getProducts();
  }) 
   

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

  let Product;
  const addToCart=(product)=>{
      if(user!==null){
        // console.log(product);
        Product=product;
        Product['qty']=1;
        Product['TotalProductPrice']=Product.qty*Product.price;
        fs.collection('Cart' + uid).doc(product.ID).set(Product).then(()=>{
          console.log('Sucessfully added to Cart');
        })

      }
      else{
        history.push('/login')
      }
  }


  const [spans]=useState([
    {id: 'ElectronicDevices', text: 'Electronic Devices'},
    {id: 'MobileAccessories', text: 'Mobile Accessories'},
    {id: 'TVAndHomeAppliances', text: 'TV & Home Appliances'},
    {id: 'SportsAndOutdoors', text: 'Sports & outdoors'},
    {id: 'HealthAndBeauty', text: 'Health & Beauty'},
    {id: 'HomeAndLifestyle', text: 'Home & Lifestyle'},
    {id: 'MensFashion', text: `Men's Fashion`},
    {id: 'WatchesBagsAndJewellery', text: `Watches, bags & Jewellery`},
    {id: 'Groceries', text: 'Groceries'},             
])

   const [active,setActive]=useState('');

   const[category,setCategory]=useState('');

   const handleChange=(individualSpan)=>{
     setActive(individualSpan.id);
     setCategory(individualSpan.text);
     filterFunction(individualSpan.text);

   }


    
  const[filteredProducts,setFilteredProducts]=useState([]);
     

  const filterFunction=(text)=>{
     const filter=products.filter((product)=>product.category===text);
     setFilteredProducts(filter);
  }
  return (
    <>
    {/* <div>Empty Products to Display</div> */}
    <div>
        <Navbar user={user} totalProducts={totalProducts}/>
        <br></br>
         <div className='container-fluid filter-products-main-box'>
          <div className='filter-box'>
            <h6>Filter by category</h6>
            {spans.map((individualSpan,index)=>(
              <span key={index} id={individualSpan.id} onClick={()=>handleChange(individualSpan)}
              className={individualSpan.id=== active ? active :'deactive'}> {individualSpan.text}</span>
            ))}
          </div>
          {
  filteredProducts.length > 0 && (
    <div className='my-products'>
      <h1 className='text-center'>{category}</h1>
      <div className='products-box'>
        {filteredProducts.map(individualFilteredProduct => (
          <IndividualFilteredProduct
            key={individualFilteredProduct.ID}
            individualFilteredProduct={individualFilteredProduct}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  )
}

          {
            filteredProducts.length <1 &&(
              <>
               {products.length>0 &&(
                  <div className='my-products'>
                    <h1 className='text-center'>All products</h1> 
                    <div className='products-box'>
                        <h1 className='text-center'>
                          <Products products={products} addToCart={addToCart}/>
                        </h1>
                    </div>

                  </div>
               )}
               {products.length <1&&(
                <div className='my-products piease-wait'>No products to display 
               <div className='toproducts'>
                  <Link to='AddProducts'><span className='p'>Add Products</span></Link>
               </div>
                </div>

               )}              
              </>
            )
          }

         </div>
        </div>
   
    </>
  )
}

export default Home