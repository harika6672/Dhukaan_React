import React, { Component } from 'react';
import axios from 'axios';

class AddCategory extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             category_name:'',
             message:"",
             db_name:"category"
        }
    }
    
    changeHandler=(e)=>{
        this.setState({
            category_name:e.target.value
        })
    }
    addCategory=(event)=>{
        event.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost/DhukaanPHP/category.php',
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
        return(
            <div className="col-md-6 justify-content-center">
                <form>
                    <div className="form-group">
                        <label>Category Name</label>
                        <input type="text" onChange={this.changeHandler} className="form-control"/>
                    </div>
                    <input type="submit" id="btnAdd" className="btn btn-primary" value="Add Category" onClick={this.addCategory}/>
                </form> 
            </div>
        )
    }
}
export default AddCategory;