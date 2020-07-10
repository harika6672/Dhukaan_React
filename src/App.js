import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Register from './Register';
import Category from './Category';
import Profile from './Profile';
import Orders from './Orders';
import WishList from './WishList';
import ShoppingHome from './ShoppingHome';
import AddCategory from './Admin/AddCategory';
import AddProduct from './Admin/AddProduct';
import Staples from './staples';
import Auth from './Auth';
import { Redirect } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




function App() {
  return (
    <Router>
    <div>
     
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/shopping-home" component={ShoppingHome}/>
        <Route path="/category">
          <Category/>
        </Route>
        
        <PrivateRoute path="/profile/:id" component={Profile}/>
         
        <PrivateRoute path="/wishlist/:id" exact component = {props => <WishList {...props}  /> } />
        <Route path="/logout">
          <Login/>
        </Route>
        <Route path="/addCategory">
          <AddCategory/>
        </Route>
        <Route path="/addProduct">
          <AddProduct/>
        </Route>
        
        <PrivateRoute path="/staples/:id" exact component = {props => <Staples {...props}  /> } />
        <PrivateRoute path="/orders/:id" exact component={(props)=><Orders {...props}/>}/>
        <Route path="/">
          <ShoppingHome/>
        </Route>
      </Switch>
    </div>
  </Router>
  
  );
}
    
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
    {...rest}
    render={props =>
    Auth.getAuth() || Auth.getId() ? (
    <Component {...props} />
    ) : (
     
    <Redirect
    to={{
    pathname: "/"
    }}
    />
    )
    
  
    }
    />
    );
    
export default App;
