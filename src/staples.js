import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ShoppingNavigation from './ShoppingNavigation';
import './products.css';

import fetchProductsAction from '../src/Actions/fetchProducts';
import {fetchSelectedProductsAction, fetchLikedProductsAction} from '../src/Actions/fetchProducts';
import {getProductsError, getProducts, getProductsPending, getSelectedProducts, getCount, productsReducer, getLoginId} from '../src/Reducers/reducer';
import { connect } from 'react-redux';
import ProductsDisplay from './ProductsDisplay';

import axios from 'axios';


class Staples extends Component{


    constructor(props){
        super(props);
        // console.log(props);
        this.state={
            wishListStatus:[]
        }
    }

    componentDidMount() {
        console.log("In did Mount");
        const {fetchProducts} = this.props;
        const param_name=this.props.match.params
        console.log(param_name.id)
        fetchProducts(param_name.id);
    }
    componentDidUpdate(prevProps) {
        // console.log(prevProps);
        console.log("In did Update");
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.fetchProducts(this.props.match.params.id);
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
        this.props.fetchSelectedProducts(this.props.login_id)
        this.props.fetchCartCount();
        
    })
    .catch(function (response) {
        //handle error
        console.log(response)
    })

}
    // wishList=(id)=>{
        
    //     this.props.fetchLikedProducts(id);
    //     const wishListStatus={...this.state.wishListStatus,[`${id}`]:true};
    //     console.log(wishListStatus)
    //     this.setState({
    //         wishListStatus:wishListStatus
    //     })
    // }
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
        console.log("rendering");
        console.log(this.props)
        console.log(this.props.products)
        const {products} = this.props;
        return(
            <div class="col-md-12">
                 <div class="modal" tabindex="-1" role="dialog"  id="exampleModal">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Dhukaan</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>Item Added to the Cart</p>
                            </div>
                        </div>
                    </div>
                </div>
        
            <div className="row">
                <div className="col-md-4 col-12">
                    <div style={{marginLeft:"16px"}}>
                        <ShoppingNavigation/>
                    </div>
                </div>
                <div className="col-md-8 col-12">
                    <div className="container">
                        <div className="row">
                        {products.map((product)=>{
                        return(
                            <ProductsDisplay product={product} status={this.state.wishListStatus} ordersPlaced={this.ordersPlaced} wishList={this.wishList} />
                        )
                    })}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    error: getProductsError(state),
    products: getProducts(state),
    pending: getProductsPending(state),
    selectedProducts:getSelectedProducts(state),
    cartCount:getCount(state),
    login_id:getLoginId(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchProducts: fetchProductsAction,
    fetchSelectedProducts:fetchSelectedProductsAction,
    fetchLikedProducts:fetchLikedProductsAction
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Staples);


