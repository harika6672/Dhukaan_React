import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ShoppingNavigation from './ShoppingNavigation';
import './products.css';

import fetchProductsAction from '../src/Actions/fetchProducts';
import {fetchSelectedProductsAction, fetchLikedProductsAction} from '../src/Actions/fetchProducts';
import {getProductsError, getProducts, getProductsPending, getSelectedProducts, getCount, productsReducer} from '../src/Reducers/reducer';
import { connect } from 'react-redux';
import ProductsDisplay from './ProductsDisplay';




class Staples extends Component{


    constructor(props){
        super(props);
        console.log(props);
        this.state={
            wishListStatus:[]
        }
    }

    componentWillMount() {
        const {fetchProducts} = this.props;
        const param_name=this.props.match.params
        fetchProducts(param_name.id);
    }
    componentDidUpdate(prevProps) {
        // console.log(prevProps);
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.fetchProducts(this.props.match.params.id);
    }
}

    ordersPlaced=(id)=>{
        // console.log(id);
        this.props.fetchSelectedProducts(id);
        
    }
    wishList=(id)=>{
        
        this.props.fetchLikedProducts(id);
        const wishListStatus={...this.state.wishListStatus,[`${id}`]:true};
        console.log(wishListStatus)
        this.setState({
            wishListStatus:wishListStatus
        })
    }

  
    render(){
        console.log(this.props)
        const {products} = this.props;
        return(
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
        )
    }
}
const mapStateToProps = state => ({
    error: getProductsError(state),
    products: getProducts(state),
    pending: getProductsPending(state),
    selectedProducts:getSelectedProducts(state),
    cartCount:getCount(state)
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


