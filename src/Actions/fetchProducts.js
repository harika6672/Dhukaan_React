import {fetchProductsPending, fetchProductsSuccess, fetchProductsError, fetchSelectedProducts, fetchLikedProducts, clearOrderedLikedItem} from './action'
import axios from 'axios';

function fetchProducts(id) {
    return dispatch => {
        dispatch(fetchProductsPending());
        axios.get(`http://localhost/DhukaanPHP/get_product.php/${id}`)
        
        .then(res => {  
            dispatch(fetchProductsSuccess(res));
            return res;
        })
       
    }
}

export function fetchSelectedProductsAction(id){
  return dispatch=>{
    dispatch(fetchSelectedProducts(id))
  }
}

export function fetchLikedProductsAction(id){
  return dispatch=>{
    dispatch(fetchLikedProducts(id))
  }
}
export function fetchLikedProductsClearAction(id){
  console.log(id);
  return dispatch=>{
    dispatch(clearOrderedLikedItem(id))
  }
}
export function fetchProductsAll(){
  return dispatch => {
   
    axios.get('http://localhost/DhukaanPHP/getproducts.php')
    
    .then(res => {  
      console.log(res);
        dispatch(fetchProductsSuccess(res));
        return res;
    })
   
}
}
export default fetchProducts;