import React from 'react'
import {Link} from 'react-router-dom';
import logo1 from '../images/logo1.png';
import {Icon} from 'react-icons-kit';
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {auth} from '../Config/Config';
import { useHistory } from 'react-router-dom';

const Navbar = ({user,totalProducts}) => {
  const history=useHistory();

  const handleLogout=()=>{
   auth.signOut().then(()=>{
       history.push('/login');
   })
  }
  return (
    <div className='navbar'>
        <div className='leftside'>
          <div className='logo'>
                <img src={logo1} alt='logo'/>
          </div>
          
        </div>
        <div className='rightside'>
          {!user && <>
            <div><Link className='navlink' to='signup'>SIGN UP</Link></div>
            <div><Link className='navlink' to='login'>LOGIN</Link></div>
          </>}
          {user && <>
          <div><Link className='navlink' to='/'>User : {user}</Link></div>
          <div className='cart-menu-btn'>
             <Link className='navlink'  to='Cart'>
             <Icon icon={shoppingCart} size={20} className='cart'/>
             </Link>
            <span className='cart-indicator'>{totalProducts}</span>
          </div>
          <div className='btn btn-danger btn-md btn-mr' onClick={handleLogout}>
            LOGOUT
          </div>   
          </>}
            
        </div>
    </div>
  )
}

export default Navbar