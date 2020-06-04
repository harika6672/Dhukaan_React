import React, { Component } from 'react'
import ShoppingNavigation from './ShoppingNavigation';
import quote3 from './quote3.jpg';
import quote2 from './quote2.jpg';
import quote1 from './quote1.jpg';
import './ShoppingHome.css';
import { connect } from 'react-redux';
import { fetchProductsAll,fetchSelectedProductsAction} from './Actions/fetchProducts';
import { fetchLikedProducts } from './Actions/action'
import { bindActionCreators } from 'redux';
import { getProducts, getSelectedProducts, getCount} from '../src/Reducers/reducer';
import ProductsDisplay from './ProductsDisplay';
class ShoppingHome extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             wishListStatus:{}
        }
        
    }
    componentDidMount(){
        this.props.fetchProductsAll();
    }
    ordersPlaced=(id)=>{
        // console.log(id);
        this.props.fetchSelectedProductsAction(id);
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
        const {products} = this.props;
       console.log(this.state.wishListStatus)
        return(
            <div className="col-md-12">
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
                    <div className="col-md-4">
                        <ShoppingNavigation/>
                    </div>
                
                    <div className = "col-md-8 col-12 mt-3">
                       
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
                        {products.map((product)=>{
                        return(
                            <ProductsDisplay product={product} status={this.state.wishListStatus} wishList={this.wishList} ordersPlaced={this.ordersPlaced}/>                       
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
    
})
const mapDispatchToProps={
    fetchProductsAll,
    fetchSelectedProductsAction,
    fetchLikedProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingHome);