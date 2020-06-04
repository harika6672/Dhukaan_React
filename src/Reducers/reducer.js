import {FETCH_PRODUCTS_PENDING, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR,FETCH_SELECTED_PRODUCTS, FETCH_LIKED_PRODUCTS
,CLEAR_ORDERED_LIKED_PRODUCTS} from '../Actions/action';

const initialState = {
    pending: false,
    products: [],
    error: null,
    selectedProducts:[],
    cartCount:0,
    likedProducts:[]
}

export function productsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_PRODUCTS_PENDING: 
            return {
                ...state,
                pending: true
            }
          
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                pending: false,
                products: action.products
            }
        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case FETCH_SELECTED_PRODUCTS:
          for(let i=0; i < state.products.length; i++){
            if(state.products[i].product_id === action.id){
               return{
                 ...state,
                 selectedProducts:state.selectedProducts.concat(state.products[i]),
                 cartCount:state.cartCount+1
               }
            }    
        }
        case FETCH_LIKED_PRODUCTS:
          for(let i=0; i < state.products.length; i++){
            if(state.products[i].product_id === action.id){
               return{
                 ...state,
                 likedProducts:state.likedProducts.concat(state.products[i]),
                 
               }
            }    
        }
        case CLEAR_ORDERED_LIKED_PRODUCTS:
            const likedProducts=state.likedProducts.filter((item, index)=>{
              if(index !== action.id){
                return item;
              }
            })
            return{
              ...state,
              likedProducts:likedProducts
              }
            
        default: 
            return state;
    }
}

export const getProducts = state => {
  return state.products;
}
export const getProductsPending = state => state.pending;
export const getProductsError = state => state.error;
export const getSelectedProducts=state=>{
  
  return state.selectedProducts;
}
export const getLikedProducts=state=>{
  console.log(state.likedProducts)
  return state.likedProducts;
}
export const getCount=state=>{
 
  return state.cartCount;
}