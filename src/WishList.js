import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getLikedProducts,getLoginId} from '../src/Reducers/reducer';
import {fetchSelectedProductsAction,fetchLikedProductsClearAction, fetchLikedProductsAction} from './Actions/fetchProducts';
import { fetchCartCount } from './Actions/action'
import ShoppingNavigation from './ShoppingNavigation';
import axios from 'axios';
class Wishlist extends Component{
    constructor(props){
        super(props);
        console.log(props)
    }
  
    ordersPlaced=(id)=>{
        // console.log(id);
        // this.props.fetchSelectedProductsAction(id);
        // for(let i=0; i < this.props.likedProducts.length; i++){
        //     if(this.props.likedProducts[i].product_id == id){
              
        //          this.props.fetchLikedProductsClearAction(i);
        //          break;
        //        }
             
        //     }
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
            this.props.fetchCartCount();
            // for(let i=0; i < this.props.likedProducts.length; i++){
            //         if(this.props.likedProducts[i].product_id == id){
                      
            //              this.props.fetchLikedProductsClearAction(i);
            //              break;
            //            }
            //         }
            this.props.fetchSelectedProductsAction(localStorage.getItem('loginid'))
            this.props.fetchCartCount();
            axios({
            method: 'delete',
            url: 'http://localhost/DhukaanPHP/delete_wishlist.php',
            data: obj,  
          }).then((res)=>{
              console.log(res);
              this.props.fetchLikedProductsAction(localStorage.getItem('loginid'));
          }).catch((res)=>{
            console.log(res)
          })
        })
        .catch(function (response) {
            //handle error
            console.log(response)
        })
        }
    componentDidMount(){
        this.props.fetchLikedProductsAction(this.props.match.params.id);
    }
    
    render(){
        const {likedProducts}=this.props
        return(
            
                <>
                <ShoppingNavigation/>
                <div className="row">
                <div className="col-md-8 col-12">
                        {likedProducts.length === 0?<h1 style={{textAlign:'center'}}>Your Wishlist is Empty </h1>:
                        likedProducts.map((product, index)=>{
                        return(
                            <div className="col-12 col-md-4" key={index}>
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
                                        {/* {product.product_image.split(".")[0]} */}
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
            </>
        )
    }
}

const mapStateToProps=(state)=>({
    likedProducts:getLikedProducts(state),
    login_id:getLoginId(state)
})
const mapDispatchToProps={
    fetchSelectedProductsAction,
    fetchLikedProductsClearAction,
    fetchCartCount,
    fetchLikedProductsAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);