import React, { Component } from 'react';
import axios from 'axios';

class AddProduct extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             categories:[],
             product_category_id:'',
             product_image:null,
             product_name:'',
             price:'',
             quantity:'',
             image_name:''
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
            val=event.target.files[0];

            this.setState({
                product_image:val,
                image_name:event.target.files[0].name
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
        const formData = new FormData();
        formData.append('product_category_id', this.state.product_category_id);
        formData.append('product_image',this.state.product_image)
        formData.append('image_name',this.state.image_name)
        formData.append('product_name',this.state.product_name)
        formData.append('price',this.state.price)
        formData.append('quantity',this.state.quantity)
        axios({
            method: 'post',
            url: 'http://localhost/DhukaanPHP/upload.php',
            data: formData,
            // headers:{'content-type': 'multipart/form-data'}
            
        })
        .then((response)=> {
            
            console.log(response.data);
            alert("Product Added");
            
           
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