import React, { Component } from 'react'
import ShoppingNavigation from './ShoppingNavigation';
import quote3 from './quote3.jpg';
import quote2 from './quote2.jpg';
import quote1 from './quote1.jpg';
import './ShoppingHome.css';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProductsAll,fetchSelectedProductsAction} from './Actions/fetchProducts';
import { fetchLikedProducts, fetchCartCount } from './Actions/action'
import { bindActionCreators } from 'redux';
import { getProducts, getSelectedProducts, getCount, getLoginId} from '../src/Reducers/reducer';
import ProductsDisplay from './ProductsDisplay';
import axios from 'axios';



class ShoppingHome extends Component{
    constructor(props) {
        super(props)
        
        this.state = {
             wishListStatus:{},
             items:this.props.products,
             searchTerm:'',
             id:null
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
        this.setState({
            id:this.props.login_id
        })
        if(this.props.login_id !== 0){
       
        console.log(this.props.login_id)
        const obj={
            ordered_product_id:id,
            ordered_user_id:localStorage.getItem('loginid')
        }
        axios({
            method: 'post',
            url: 'http://localhost/DhukaanPHP/orders.php',
            data: obj,  
        })
        .then((response)=> {
            //handle success
            console.log(response.data);
            this.props.fetchSelectedProductsAction(localStorage.getItem('loginid'))
            this.props.fetchCartCount();
            
        })
        .catch(function (response) {
            //handle error 
            console.log(response)
        })
    }
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
            wished_user_id:localStorage.getItem('loginid')
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
        if(this.state.id == 0){
            
            let s=document.getElementsByClassName("modal-backdrop show");
            s[0].removeAttribute("class");
             alert("Please Login")
            
            return <Redirect to="/login"/>
        }
        const {products} = this.props;

        return(
           
                
    <>
    
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
                        <ShoppingNavigation/>
                        <div className="container">
                        <div className="row">
                        {this.state.items.map((product, index)=>{
                            return(
                                <ProductsDisplay key={index} product={product} id={this.state.id} status={this.state.wishListStatus} wishList={this.wishList} ordersPlaced={this.ordersPlaced}/>                       
                             )}
                            

                        )}
                        </div>
                        </div>
                        
            </>
                   
            
            
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