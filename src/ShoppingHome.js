import React, { Component } from 'react'
import ShoppingNavigation from './ShoppingNavigation';
import quote3 from './quote3.jpg';
import quote2 from './quote2.jpg';
import quote1 from './quote1.jpg';
import './ShoppingHome.css';
import { connect } from 'react-redux';
import { fetchProductsAll,fetchSelectedProductsAction} from './Actions/fetchProducts';
import { fetchLikedProducts, fetchCartCount } from './Actions/action'
import { bindActionCreators } from 'redux';
import { getProducts, getSelectedProducts, getCount, getLoginId} from '../src/Reducers/reducer';
import ProductsDisplay from './ProductsDisplay';
import axios from 'axios';
import {Link} from 'react-router-dom';
class ShoppingHome extends Component{
    constructor(props) {
        super(props)
        
        this.state = {
             wishListStatus:{},
             items:this.props.products,
             searchTerm:''
        }
        
    }
    componentDidMount(){
      
        this.props.fetchProductsAll();
        
    }
    componentDidUpdate(prevProps){
        if(prevProps.products!==this.props.products){
            this.setState({
                items:this.props.products
            })
        }
    }
    ordersPlaced=(id)=>{
        console.log(this.props.login_id)
        const obj={
            ordered_product_id:id,
            ordered_user_id:this.props.login_id
        }
        axios({
            method: 'post',
            url: 'http://localhost/DhukaanPHP/orders.php',
            data: obj,  
        })
        .then((response)=> {
            //handle success
            console.log(response.data);
            this.props.fetchSelectedProductsAction(this.props.login_id)
            this.props.fetchCartCount();
            
        })
        .catch(function (response) {
            //handle error 
            console.log(response)
        })

    }
       
    searchProduct=(e)=>{
        let items=[];
       
        items= this.props.products.filter((product)=>{
            if(product.product_name === e.target.value){
               
                return product;
            }

               
          

        })
        this.setState({
            items:items
        })
      
        
    }
        

        
         
        
      
        
    
    
    wishList=(id)=>{
        
        // this.props.fetchLikedProducts(id);
        // const wishListStatus={...this.state.wishListStatus,[`${id}`]:true};
        // console.log(wishListStatus)
        // this.setState({
        //     wishListStatus:wishListStatus
        // })

        const obj={
            wished_product_id:id,
            wished_user_id:this.props.login_id
        }
        axios({
            method: 'post',
            url: 'http://localhost/DhukaanPHP/wishlist.php',
            data: obj,  
        })
        .then((response)=> {
            //handle success
            console.log(response.data);
            
            
        })
        .catch(function (response) {
            //handle error
            console.log(response)
        })
    }
    
    
    render(){
        const {products} = this.props;

        return(
            <div className="col-md-12">
               <div className="modal" tabIndex="-1" role="dialog"  id="exampleModal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Dhukaan</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Item Added to the Cart</p>
                            </div>
                        </div>
                    </div>
                </div>
               
    
                <div className="row">
                    <div className="col-md-4">
                        <ShoppingNavigation/>
                    </div>
                    
                
                    <div className = "col-md-8 col-12 mt-3">
                        <div className="row">
                            <div className="col-md-4">

                            </div>
                            <div className="col-md-4">
                                
                            </div>
                            <div className="col-md-4">
                            <input className="form-control" onChange={this.searchProduct} type="search" placeholder="Search" aria-label="Search" style={{display:'inlineBlock'}}/>
                            </div>
                            
                        </div>
                       
                        <div id = "carouselwithIndicators" className = "carousel slide w-100" data-ride = "carousel">
                            <ol className = "carousel-indicators">
                            <li data-target = "#carouselExampleIndicators" data-slide-to = "0" className = "active"></li>
                            <li data-target = "#carouselExampleIndicators" data-slide-to = "1"></li>
                            <li data-target = "#carouselExampleIndicators" data-slide-to = "2s"></li>
                            </ol>
                            
                            <div className ="carousel-inner">
                                <div className = "carousel-item active">
                                    <img className = "d-block w-100" 
                                        src = {quote1} 
                                        alt = "First slide"/>
                                </div>
                                
                                <div className = "carousel-item">
                                    <img className = "d-block w-100" 
                                        src = {quote2}
                                        alt = "Second slide"/>
                                </div>
                                <div className = "carousel-item">
                                    <img className = "d-block w-100" 
                                        src = {quote3}
                                        alt = "Third slide"/>
                                </div>
                            </div>
            
                            <a className = "carousel-control-prev" href = "#carouselwithIndicators" role = "button" data-slide = "prev">
                                <span className = "carousel-control-prev-icon" aria-hidden = "true"></span>
                                <span className = "sr-only">Previous</span>
                            </a>
                            
                            <a className = "carousel-control-next" href = "#carouselwithIndicators" role = "button" data-slide = "next">
                                <span className = "carousel-control-next-icon" aria-hidden = "true"></span>
                                <span className = "sr-only">Next</span>
                            </a>
                        </div>
                        <div>
                        <div className="container">
                        <div className="row">
                        {this.state.items.map((product, index)=>{
                            return(
                                <ProductsDisplay key={index} product={product} status={this.state.wishListStatus} wishList={this.wishList} ordersPlaced={this.ordersPlaced}/>                       
                             )}
                            

                        )}
                        </div>
                       
                        </div>
                    </div>
                        </div>
                    </div>
                </div>
            
            
        )
    }
}
const mapStateToProps = state => ({
   
    products: getProducts(state),
    selectedProducts:getSelectedProducts(state),
    cartCount:getCount(state),
    login_id:getLoginId(state)
    
})
const mapDispatchToProps={
    fetchProductsAll,
    fetchSelectedProductsAction,
    fetchLikedProducts,
    fetchCartCount
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingHome);