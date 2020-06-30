import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCount, getLoginId } from '../src/Reducers/reducer';
import { fetchSelectedProductsAction } from './Actions/fetchProducts';
import { fetchCartCount } from './Actions/action'
import axios from 'axios';
import './ShoppingNav.css';

class ShoppingNavigation extends Component{

    constructor(props) {
        super(props)
    
        this.state = {
             categories:[]
        }
    }
    

    componentDidMount(){
        axios.get('http://localhost/DhukaanPHP/get_category.php')
        .then(res => {
          const categories_data = res.data;
          for(let category of categories_data){
            this.setState({
                categories:[...this.state.categories,category]
            })
          }
        })
        console.log(this.props.login_id);
        this.props.fetchSelectedProductsAction(localStorage.getItem('loginid'));
        
    }
    styling=()=>{
        var x = document.getElementById("side-menu");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
        
      
    }
    menuToggle=()=>{		
        if (document.getElementById("navBtn").className == "navOpen") {
            document.getElementById("navBtn").className = "";
            document.getElementById("listMenu").className = "";
            document.getElementById("shadowbox").className = "";
        } else {
            document.getElementById("navBtn").className = "navOpen";
            document.getElementById("listMenu").className = "listOpen";
            document.getElementById("shadowbox").className = "visible";
        }
    }
   
    
   
    render(){
        this.props.fetchCartCount();
        const categories=this.state.categories;
        return(
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <div className="col-md-12" >
                        <div className="row">
                            <div className="navbar-header" id="header1">
                                <a className="navbar-brand" href="#">Dhukaan</a>
                            </div>
                            <div className="col-9 offset-3  col-sm-9 offset-sm-3 col-md-5 offset-md-6">
                                <div className="float-right">
                                    <ul id="header-list">
                                        <li className="active"><a className="col-1 col-sm-1 col-md-1" href="#">Home</a></li>
                                        <li>
                                            <Link to={'/orders/'+`:${localStorage.getItem('loginid')}`} className="col-1 col-sm-1 col-md-1"> 
                                                <i className="fa fa-shopping-basket fa-lg"></i>
                                                <span className='badge badge-warning' id='lblCartCount'>{this.props.cartCount}</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <a href="#" className="col-1 col-sm-1 col-md-1">
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                    
                                        <li className="dropdown" className="col-4 col-sm-4 col-md-2">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Me
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                {/* <a className="dropdown-item" href="#">Profile</a>
                                                <a className="dropdown-item" href="#">Wishlist</a>
                                                <a className="dropdown-item" href="#">LogOut</a> */}
                                                 <li className="dropdown-item">
                                <Link to={'/wishlist/'+`:${localStorage.getItem('loginid')}`}>
                                <i className="fa fa-heart-o fa-lg"></i>Wish List
                                </Link>
                            </li>
                            <li className="dropdown-item">
                            <Link to={'/profile/'+`:${localStorage.getItem('loginid')}`}>
                                <i className="fa fa-user-circle fa-lg"></i>Profile
                                </Link>
                            </li>
                           
                            <li  className="dropdown-item">
                                <Link to="/logout" onClick={()=>localStorage.removeItem('loginid')}>
                                <i className="fa fa-sign-out fa-lg"></i>LogOut
                                </Link>
                            </li>
                                            </div>
                                        </li>
                                    </ul> 
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div id="side-menu">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-light" id="sidemenu">
                            <div className="col-md-12" >
                            <div className="row">
                                <div className="col d-flex justify-content-center">
                                        <ul id="products_list">
                                            {categories.map(function(category,index){
                                                return(<li key={index} className="col-1 col-sm-1 col-md-1">
                                                    <Link to={'/staples/'+`:${category.category_id}`}>{category.category_name}</Link>
                                                </li>)
                                            })}
                                        </ul> 
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div id="side-menu-mobile">
                <span id="shadowbox" className="abc" onClick={this.menuToggle}></span>
                <nav>
                    <button id="navBtn" className="abc" onClick={this.menuToggle}>
                    <div></div>
                <div></div>
                <div></div>
                <div></div>
                    </button>
                    <ul id="listMenu" className="abc">
                    {categories.map(function(category,index){
                        return(<li key={index}>
                            <Link to={'/staples/'+`:${category.category_id}`}  onClick={()=>{document.getElementById("navBtn").className = ""
            document.getElementById("listMenu").className ="";
            document.getElementById("shadowbox").className = ""}}>{category.category_name}</Link>
                        </li>)
                        })}
                    </ul>
                </nav>
                </div>
            </>
        )
    }

}



const mapStateToProps=(state)=>({
    cartCount:getCount(state),
    login_id:getLoginId(state)
})

const mapDispatchToProps={
    fetchSelectedProductsAction,
    fetchCartCount
}
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingNavigation);