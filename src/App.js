import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import NotFound from './components/NotFound';
import AddProducts from './components/AddProducts';
import { Cart } from './components/Cart';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route  path='/Signup' component={Signup}/>
          <Route  path='/Login' component={Login}/>
          <Route  path='/addproducts' component={AddProducts}/>
          <Route  path='/cart' component={Cart}/>
          <Route component={NotFound}/>        
        </Switch>      
      </BrowserRouter>
    </div>
  );
}

export default App;
