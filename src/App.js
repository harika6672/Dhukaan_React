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
        <Route path="/shopping-home">
          <ShoppingHome/>
        </Route>
        <Route path="/category">
          <Category/>
        </Route>
        
        <Route path="/profile/:id">
          <Profile/>
        </Route>
        <Route path="/wishlist/:id" exact render = {props => <WishList {...props}  /> } />
        <Route path="/logout">
          <Login/>
        </Route>
        <Route path="/addCategory">
          <AddCategory/>
        </Route>
        <Route path="/addProduct">
          <AddProduct/>
        </Route>
        
        <Route path="/staples/:id" exact render = {props => <Staples {...props}  /> } />
        <Route path="/orders/:id" exact render={(props)=><Orders {...props}/>}/>
        <Route path="/">
          <Login/>
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
