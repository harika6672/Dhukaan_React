import React from 'react';
import { productsReducer } from './Reducers/reducer';

const ProductsDisplay=(props)=>{
    const {product}=props;
    
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
                <div className="card-read-more">
                    
                    <a className="btn btn-link" onClick={()=>props.ordersPlaced(product.product_id)}  data-toggle="modal" data-target="#exampleModal">
                    Order Now
                    </a>
                    
                    {!props.status[product.product_id]?
                    <button style={{marginLeft:'120px',backgroundColor:'white',border:'0'}} onClick={()=>props.wishList(product.product_id)}>
                        <i className="fa fa-heart-o fa-lg"></i>
                    </button>:
                    <button style={{marginLeft:'120px',backgroundColor:'white',border:'0'}} onClick={()=>props.wishList(product.product_id)}>
                        <i className="fa fa-heart fa-lg"></i>
                     </button>}                                  
                    
                </div>
            </div>
        </div>
    )
}

export default ProductsDisplay;