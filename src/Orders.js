import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getSelectedProducts, getCount, getLoginId} from '../src/Reducers/reducer';
import ShoppingNavigation from '../src/ShoppingNavigation';
import {fetchSelectedProductsAction,fetchLikedProductsAction} from './Actions/fetchProducts';
import {withRouter} from 'react-router-dom';
import './OrdersStyle.css';
import axios from 'axios';
import {Link}  from 'react-router-dom';

class Orders extends Component{
    constructor(props){
        super(props);
        console.log(props)
    }
    componentDidMount() {
        
        const {fetchSelectedProductsAction} = this.props;
        const param_name=this.props.match.params;
        console.log(param_name.id)
        fetchSelectedProductsAction(param_name.id);
    }
    deleteorder(id){
        const obj={
            ordered_product_id:id,
            ordered_user_id:this.props.login_id
        }
        axios({
            method: 'delete',
            url: 'http://localhost/DhukaanPHP/delete_order.php',
            data: obj,  
          }).then((res)=>{
              console.log(res);
              this.props.fetchSelectedProductsAction(this.props.login_id);
          }).catch((res)=>{
            console.log(res)
          })
        
    }

    render(){
        console.log(this.props.selectedProducts);
        const {selectedProducts}=this.props;
        let total=0;
        for(let selectedProduct of selectedProducts){
            total=total+Number(selectedProduct.price)*Number(selectedProduct.prod_count);
        }
        return(
            <div className="row">
                <div className="col-md-4 col-12">
                    <div style={{marginLeft:"16px"}}>
                        <ShoppingNavigation/>
                    </div>
                </div>
                <div className="col-md-8 col-12">
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <div className="panel-title">
                                    <div className="row">
                                        <div className="col-md-6 col-xs-6">
                                            <h5><span className="glyphicon glyphicon-shopping-cart"></span> Shopping Cart</h5>
                                        </div>
                                        <div className="col-md-6 col-xs-6">
                                            <Link to="/shopping-home">
                                                <button type="button" className="btn btn-primary btn-sm btn-block">
                                                Continue shopping
                                                </button>
                                            </Link>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {selectedProducts.length===0?<h1>Your Cart is Empty..Dont Worry..Shop Now</h1>
                        :selectedProducts.map((product,index)=>{
                        return(
				            <div className="panel-body" key={index}>
					            <div className="row">
					            	<div className="col-md-3 col-3"><img src="http://placehold.it/100x70"/></div>
                                    <div className="col-md-3 col-3">
                                        <h4 className="product-name"><strong>{product.product_name}</strong></h4>
                                    </div>
                                    <div className="col-md-2 col-1">
                                            <input type="text" className="form-control input-sm" value={product.prod_count}/>
                                    </div>

                                    <div className="col-md-2 col-1">
                                        <h6><strong>{product.price}
                                        <span className="text-muted">x</span>
                                        <span>{product.prod_count}</span></strong></h6>
                                    </div>
                                    
                                    <div className="col-md-2 col-2">
                                        <button type="button" className="btn btn-link btn-xs" onClick={()=>this.deleteorder(product.product_id)}>
                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                
					        </div>
					        <hr/>
				        </div>
                        )})}
                       
                        <div className="panel-footer">
                            <div className="row">
                                <div className="col-md-4 col-xs-9">
                                    <h4 className="text-right">Total <strong>{total}</strong></h4>
                                </div>
                                <div className="col-md-6 col-xs-3">
                                    <button type="button" className="btn btn-success btn-block">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
            </div>
                        
		</div>
    </div>
    
                        
        
        )
}}

const mapStateToProps = (state, ownProps)=> ({
    selectedProducts:getSelectedProducts(state),
    cartCount:getCount(state),
    login_id:getLoginId(state),
    name: ownProps.name
})
const mapDispatchToProps= {
    fetchSelectedProductsAction,
    fetchLikedProductsAction
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Orders);

