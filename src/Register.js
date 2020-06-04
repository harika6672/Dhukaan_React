import React,{ Component } from 'react';
import Navigation from './Navigation';
import RegistrationForm  from './RegistrationForm';
import axios from 'axios';

class Register extends Component{
   
   constructor(props){
       super(props);
       this.state={
            person:{
                firstname:"",
                lastname:"",
                email:"",
                password:"",
                gender:"",
                dob:"",
                mobilenum:"",
                address:"",
                address2:"",
                state:"",
                city:"",
                zip:"",
            },
            errors:{
                firstname:"",
                lastname:"",
                email:"",
                password:"",
                dob:"",
                mobilenum:"",
                address:"",
                address2:"",
                state:"",
                city:"",
                zip:"" 
            },
            status:false,
            message:""
        }
    }

   changeHandler=(event)=>{
        let name=event.target.name;
        let val=event.target.value;
        let error;
        const validNameRegex=/^[a-zA-Z ]+$/;
        const validZipRegex=/^[0-9]{6,8}$/;
        const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        const validPasswordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        const validMobileNumRegex=/^[6-9][0-9]*$/;
        switch (name) {
            
          case 'firstname': 
            
            if(val.length<3){
                error="Cannot be less than 3 characters long";
            }else if(!val.match(validNameRegex)){
                error="Only Characters are allowed";
            }
            else{
                error="";
            }
                
            break;
            case 'lastname': 
            if(val.length<3){
                error="Cannot be less than 3 characters long";
            }else if(!val.match(validNameRegex)){
                error="Only Characters are allowed";
            }else{
                error="";
            }
            break;
            case 'email': 
            if(validEmailRegex.test(val)){
                error="";
            }else{
                error="Not a valid Email";
            }
            break;
            case 'password': 
            if(validPasswordRegex.test(val)){
                error="";
            }else{
                error="Not a valid Password";
            }
            break;
            case 'dob': 
            if(val.length===0){
                error="This Field is Required";
            }else{
                error="";
            }
            break;
            case 'mobilenum': 
            if(!val.match(validMobileNumRegex)){
                error="Not a valid Mobile Number";
            }else if(val.length !== 10){
                error="Mobile Number must contain 10 digits";
            }else{
                error="";
            }
            break;
            case 'address': 
            if(val.length===0){
                error="This Field is Required";
            }else{
                error="";
            }
            break;
            case 'address2': 
            if(val.length===0){
                error="This Field is Required";
            }else{
                error="";
            }
            break;
            case 'city': 
            if(val.length===0){
                error="This Field is Required";
            }else if(!val.match(validNameRegex)){
                error="Only Characters are allowed";
            }else{
                error="";
            }
            break;
            case 'state': 
            if(val.length===0){
                error="This Field is Required";
            }else{
                error="";
            }
            break;
            case 'zip': 
            if(val.length===0){
                error="This Field is Required";
            }else if(!val.match(validZipRegex)){
                error="Please check again";
            }else{
                error="";
            }
            break;
        }

     
       
        this.setState({
            person:{
                ...this.state.person,
                [name]:val
            },
            errors:{
                ...this.state.errors,
                [name]:error
            }
            
       })

       if(error){
           this.setState({
               status:false
           })
        }else{
            this.setState({
                status:true
            })
        }
       
   }
   register=(event)=>{
        const {person}=this.state;
        event.preventDefault();
        if(person.firstname===""||person.password===""||person.state===""||person.gender===""||person.zip===""||person.address===""||person.address2===""||person.email===""||
            person.lastname===""||person.city===""){
            this.setState({
                message:"All Fields are Required"
            })
        }
        else{

           
            axios({
                method: 'post',
                url: 'http://localhost/DhukaanPHP/signUp.php',
                data: this.state.person,  
            })
            .then((response)=> {
                //handle success
                console.log(response.data);
                this.setState({
                    message:"Registration Successful..."
                })
                document.getElementById("btnRegister").disabled = true;
    
            })
            .catch(function (response) {
                //handle error
                console.log(response)
            })
            }
        
        
   }
  
    render(){
        let {firstname,lastname,password,email,dob,mobilenum,address,address2,city,state,zip}=this.state.errors;
        return(
            <div>
                <Navigation/>
                <RegistrationForm 
                    changeHandler={this.changeHandler} 
                    register={this.register}
                    firstname={firstname}
                    lastname={lastname}
                    password={password}
                    email={email}
                    dob={dob}
                    mobilenum={mobilenum}
                    address={address}
                    address2={address2}
                    city={city}
                    state={state}
                    zip={zip}
                    status={this.state.status}
                    message={this.state.message}/>
            </div>      
        )
    }
    
}

export default Register;

