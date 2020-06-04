import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCount } from '../src/Reducers/reducer'
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
    }
    render(){
        const categories=this.state.categories;
        return(
            <div className="nav-side-menu">
                <div className="brand">Dhukaan</div>
                    <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
                    <div className="menu-list">
                        <ul id="menu-content" className="menu-content collapse out">
                            <li>
                                <Link to="/shopping-home">
                                    <i className="fa fa-dashboard fa-lg"></i>Home
                                </Link>
                            </li>
                            <li data-toggle="collapse" data-target="#products" className="collapsed">
                                <a href="#"><i className="fa fa-gift fa-lg"></i>Shop By Category<span className="arrow"></span></a>
                            </li>
                            <ul id="products">
                              {categories.map(function(category,index){
                                   return(<li key={index}>
                                   {/* <Link to={category.toLowerCase().replace(/\s/g,'')}>{category}</Link> */}
                                   <Link to={'/staples/'+`:${category.category_id}`}>{category.category_name}</Link>
                                   </li>)
                              })}
                            </ul>
                            <li>
                                <Link to="/orders">
                                <i className="fa fa-shopping-basket fa-lg"></i>My Orders
                                <span className='badge badge-warning' id='lblCartCount'>{this.props.cartCount}</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/wishlist">
                                <i className="fa fa-heart-o fa-lg"></i>Wish List
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile">
                                <i className="fa fa-user-circle fa-lg"></i>Profile
                                </Link>
                            </li>
                           
                            <li>
                                <Link to="/logout">
                                <i className="fa fa-sign-out fa-lg"></i>LogOut
                                </Link>
                            </li>
                        </ul>
                    </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
    cartCount:getCount(state)
})
export default connect(mapStateToProps)(ShoppingNavigation);