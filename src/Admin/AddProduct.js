import React, { Component } from 'react';
import axios from 'axios';

class AddProduct extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             categories:[],
             product_category_id:'',
             product_image:'',
             product_name:'',
             price:'',
             quantity:''
        }
    }
    

    componentDidMount(){
        axios.get('http://localhost/DhukaanPHP/get_category.php')
        .then(res => {
          const categories_data = res.data;
          for(let category of categories_data){
            this.setState({
                categories:[...this.state.categories,category]
            })
          }
        })
    }

    changeHandler=(event)=>{
        let name=event.target.name;
        let val=event.target.value;
        if(name==="product_image"){
            val=event.target.files[0].name;
            this.setState({
                product_image:val
            },()=>{
                console.log(this.state.product_image);
            })

        }
        if(name!=="product_image"){
            this.setState({
            [name]:val 
            })
        }
    }

    addProduct=(event)=>{
       console.log(this.state);
        event.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost/DhukaanPHP/product.php',
            data: this.state,
            
        })
        .then((response)=> {
           
            console.log(response.data);
           
        })
        .catch(function (response) {
            //handle error
            console.log(response)
        })
    }

    render(){
        
        let categories=this.state.categories;
        return(
            <div className="col-md-8">
                <form method="post" encType="multipart/form-data">
                    <div className="form-group">
                        <label>Category Name</label>
                         <select id="category" className="form-control" name="product_category_id" onChange={this.changeHandler}>
                                    <option value="">Choose State</option>
                                    {categories.map((category)=>{
                                        return(
                                        <option value={category.category_id} key={category.category_id}>{category.category_name}</option>
                                        )
                                    })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" name="product_name" onChange={this.changeHandler}/>
                    </div>
                    <div className="form-group">
                        <input type="file" onChange={this.changeHandler} name="product_image" />
                    </div>
                    <div className="form-group">
                        <label>Product Price</label>
                        <input type="text" name="price" onChange={this.changeHandler}/>
                    </div>
                    <div className="form-group">
                        <label>Product Quantity</label>
                        <input type="text" name="quantity" onChange={this.changeHandler}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" onClick={this.addProduct} value="Add Product" className="btn btn-success"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddProduct;