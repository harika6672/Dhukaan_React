import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getSelectedProducts, getCount} from '../src/Reducers/reducer';
import ShoppingNavigation from '../src/ShoppingNavigation';

class Orders extends Component{
    constructor(props){
        super(props);
        console.log(props)
    }

    render(){
        // console.log(this.props.selectedProducts);
        const {selectedProducts}=this.props;
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
                    {selectedProducts.length===0?<h1>Your Cart is Empty..Dont Worry..Shop Now</h1>
                    :selectedProducts.map((product)=>{
                    return(
                        <div className="col-12 col-md-4" key={product.product_id}>
                            <div className="card">
                                <a className="img-card" href="#">
                                <img src="" alt="img"/>
                                </a>
                                <br />
                                <div className="card-content">
                                    <h4 className="card-title">
                                        <a href="#">
                                            {product.product_name}
                                        </a>
                                    </h4>
                                    <div className="">
                                        Rs.{product.price}
                                    </div>
                                </div>
                            </div>
                        </div>
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
    selectedProducts:getSelectedProducts(state),
    cartCount:getCount(state)
})


export default connect(
    mapStateToProps,
    null
)(Orders);