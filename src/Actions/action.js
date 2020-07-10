

export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';
export const FETCH_SELECTED_PRODUCTS='FETCH_SELECTED_PRODUCTS';
export const FETCH_LIKED_PRODUCTS='FETCH_LIKED_PRODUCTS';
export const CLEAR_ORDERED_LIKED_PRODUCTS='CLEAR_ORDERED_LIKED_PRODUCTS';

export function fetchProductsPending() {
    return {
        type: FETCH_PRODUCTS_PENDING
    }
}

export function fetchProductsSuccess(products) {
//    console.log(products.data)
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        products: products.data
    }
}

export function fetchProductsError(error) {
    return {
        type: FETCH_PRODUCTS_ERROR,
        error: error
    }
}

export function fetchSelectedProducts(products){
    return{
        type:FETCH_SELECTED_PRODUCTS,
        products: products.data
    }
}
export function fetchLikedProducts(products){
    console.log(products.data)
    return{
        type:FETCH_LIKED_PRODUCTS,
        products: products.data
    }
}
export function clearOrderedLikedItem(id){
    return{
        type:CLEAR_ORDERED_LIKED_PRODUCTS,
        id:id
    }
}
export function fetchIdAction(id){
    console.log(id);
    return{
        type:'FETCH_ID',
        id:id
    }
}
export function fetchCartCount(){
    return{
        type:'CART_COUNT',
        
    }
}