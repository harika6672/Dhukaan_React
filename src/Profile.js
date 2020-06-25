import React, { Component } from 'react';
import './Profile.css';
import ShoppingNavigation from './ShoppingNavigation';
import {connect} from 'react-redux';
import {getLoginId} from './Reducers/reducer';
import axios from 'axios';
class Profile extends Component{
    
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            mobilenum:'',
            password:'',
            address:'',
            address2:'',
            state:'',
            city:''
        }
    }
    
    componentDidMount(){
        axios.get(`http://localhost/DhukaanPHP/get_userprofile.php/${this.props.login_id}`)
        .then(res => {  
         const user=res.data[0];
        

        this.setState({
            name:user.firstname,
            email:user.email,
            mobilenum:user.mobilenum,
            password:user.password,
            address:user.address,
            address2:user.password,
            state:user.state,
            city:user.city
        })
          return res;
      })
    }
    render(){
        const {name,email,mobilenum,password,state,address,address2,city}=this.state;
        return(
             
              
            
                <div className="row">
                    <div className="col-md-4">
                        <ShoppingNavigation/>
                    </div>
                    <div className="col-md-8">
                    <form>
                        <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
                            <div className="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                                    <h5>
                                       {name}
                                    </h5>
                                    
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>password</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{password}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{mobilenum}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Address</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{address}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Address2</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{address2}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>City</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{city}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>State</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{state}</p>
                                            </div>
                                        </div>
                                
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                    </div>
                </div>
                
                    
                    
                </form>   
                    </div>
                    
                </div>
                   
          
            
        )
    }
}

const mapStateToProps=(state)=>({
    login_id:getLoginId(state),
})

export default connect(mapStateToProps)(Profile);