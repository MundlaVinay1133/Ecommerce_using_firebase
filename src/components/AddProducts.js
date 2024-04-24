import React, { useState } from 'react'
import {storage,fs} from '../Config/Config';
import { Link } from 'react-router-dom';

const AddProducts = () => {
    
    const[title,setTitle]=useState('');
    const[description,setDescription]=useState('');
    const[price,setPrice]=useState('');
    const[category,setCategory]=useState('');
    const[image,setImage]=useState(null);


    const[imageError,setImageError]=useState('');
      
    const[successMsg,setSuccessMsg]=useState('');
    const[uploadError,setUploadError]=useState('');

    const types=['image/jpg','image/jpeg','image/png','image/PNG']

    const handleProductImage=(e)=>{
        let selectedFile=e.target.files[0];
        if(selectedFile){
        if(selectedFile && types.includes(selectedFile.type)){
           setImage(selectedFile);
           setImageError('');
        }
        else{
                setImage(null);
                setImageError('please select the valid image type(png/jpeg/jpg')
            }
        }
        else{
            console.log('please select your file')
        }
    }
    
    const handleAddProducts=(e)=>{
        e.preventDefault();
        // console.log(title,description,price);
        // console.log(image);
        const uploadTask=storage.ref(`product-images/${image.name}`).put(image);
        uploadTask.on('state_changed',(snapshot)=>{
            const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            console.log(progress);
        },(error)=>setUploadError(error.message),()=>{
            storage.ref('product-images').child(image.name).getDownloadURL().then((url)=>{
            fs.collection('Products').add({
                    title,
                    description,
                    category,
                    price:Number(price),
                    url
                }).then(()=>{
                    setSuccessMsg('product added successfully');
                    setTitle('');
                    setDescription('');
                    setCategory('');
                    setPrice('');
                    document.getElementById('file').value='';
                    setImageError('');
                    setUploadError('');
                    setTimeout(()=>{
                        setSuccessMsg('');
                    },3000)
                }).catch((error)=>setUploadError(error.message));
            })
        })
    }
  return (

    <div className='container'>
    
        <br/>
        <h1>AddProducts</h1>
        <hr/>
        {successMsg && <>
             <div className='success-msg'>{successMsg}</div>
            </>}
        <form className='form-group' autoComplete='off' onSubmit={handleAddProducts}>
           <lable>Product Title</lable>
           <input type='text' className='form-control' required
           onChange={(e)=>setTitle(e.target.value)} value={title}/>
           <br/>
           <lable>Product Description</lable>
           <input type='text' className='form-control' required
            onChange={(e)=>setDescription(e.target.value)} value={description}/>
           <br/>
           <lable>Product price</lable>
           <input type='number' className='form-control' required
            onChange={(e)=>setPrice(e.target.value)} value={price}/>
            <br/>
           <lable>Product Category</lable>
           <select className='form-control' required value={category} onChange={(e)=>setCategory(e.target.value)}>
           <option value="">Select Product Category</option>                   
                    <option>Electronic Devices</option>
                    <option>Mobile Accessories</option>
                    <option>TV & Home Appliances</option>
                    <option>Sports & outdoors</option>
                    <option>Health & Beauty</option>
                    <option>Home & Lifestyle</option>
                    <option>Men's Fashion</option>
                    <option>Watches, bags & Jewellery</option>
                    <option>Groceries</option>
           </select>
           <br/>
           <lable>Upload Product Image</lable>
           <br/>
           <input type='file' id='file' className='form-control' required
            onChange={handleProductImage}/>

            {imageError && <>
             <div className='error-msg'>{imageError}</div>
            </>}
           <br/>

           <div style={{display:'flex',justifyContent:'flex-end'}}>
            <button type='submit' className='btn btn-success btn-md'>SUBMIT</button>
           </div>

           <div>
            Back to <span><Link to='/'>Home Page</Link></span>
           </div>
        </form>
        {uploadError && <>
             <div className='error-msg'>{uploadError}</div>
            </>}
           
        
    </div>
  )
}

export default AddProducts