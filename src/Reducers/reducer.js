import {FETCH_PRODUCTS_PENDING, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR,FETCH_SELECTED_PRODUCTS, FETCH_LIKED_PRODUCTS
,CLEAR_ORDERED_LIKED_PRODUCTS} from '../Actions/action';

const initialState = {
    pending: false,
    products: [],
    error: null,
    selectedProducts:[],
    cartCount:0,
    likedProducts:[],
    loginId:0
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
          return{
            ...state,
            pending: false,
            selectedProducts: action.products
            // selectedProducts:state.selectedProducts.concat(state.products[i]),
            // cartCount:state.cartCount+1
          }

          case 'CART_COUNT':
            return{
              ...state,
              cartCount:state.selectedProducts.length
            }
              
    
        case FETCH_LIKED_PRODUCTS:
          return{
            ...state,
            pending: false,
            likedProducts: action.products
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
        case 'FETCH_ID':
          return{
            ...state,
            loginId:action.id
          }
            
        default: 
            return state;
    }
}

export const getProducts = state => {
  console.log(state.products)
  return state.products;
}
export const getProductsPending = state => state.pending;
export const getProductsError = state => state.error;
export const getSelectedProducts=state=>{
  // console.log(state.selectedProducts)
  // console.log(state.selectedProducts.length)
  return state.selectedProducts;
}
export const getLikedProducts=state=>{
  // console.log(state.likedProducts)
  return state.likedProducts;
}
export const getCount=state=>{
  // console.log(state.selectedProducts.length)
  return state.selectedProducts.length;
}
export const getLoginId=state=>{
//  console.log(state.loginId)
  return state.loginId;
}