import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getLikedProducts} from '../src/Reducers/reducer';
import {fetchSelectedProductsAction,fetchLikedProductsClearAction} from './Actions/fetchProducts';
import ShoppingNavigation from './ShoppingNavigation'
class Wishlist extends Component{
    constructor(props){
        super(props);
        
    }
  
    ordersPlaced=(id)=>{
        // console.log(id);
        this.props.fetchSelectedProductsAction(id);
        for(let i=0; i < this.props.likedProducts.length; i++){
            if(this.props.likedProducts[i].product_id == id){
              
                 this.props.fetchLikedProductsClearAction(i);
                 break;
               }
             
            }
        }
       
    
    render(){
        const {likedProducts}=this.props
        return(
            <div className="row">
                <div className="col-md-4 col-12">
                    <ShoppingNavigation/>
                </div>
                <div className="col-md-8 col-12">
                        {likedProducts.length === 0?<h1 style={{textAlign:'center'}}>Your Wishlist is Empty </h1>:
                        likedProducts.map((product)=>{
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
                                        {product.product_image.split(".")[0]}
                                            Rs.{product.price}
                                        </div>
                                    </div>
                                    <div className="card-read-more">
                                        
                                        <a className="btn btn-link" onClick={()=>this.ordersPlaced(product.product_id)}  data-toggle="modal" data-target="#exampleModal">
                                        Order Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                        </div>
                    
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    likedProducts:getLikedProducts(state)
})
const mapDispatchToProps={
    fetchSelectedProductsAction,
    fetchLikedProductsClearAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);