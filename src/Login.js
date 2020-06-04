import React,{ Component } from 'react';
import Navigation from './Navigation';
import LoginForm from './LoginForm';
import './Login.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class Login extends Component{
    
    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             password:'',
             status:false,
             login:false,
             showPassword:false
        }
    }
    changeHandler=(event)=>{
        
        let name = event.target.name;
        let val = event.target.value;
        this.setState({
           [name]:val
        });
    }
    checkBoxHandler=(e)=>{
        this.setState({
            showPassword:!this.state.showPassword
        })   
    }
    login=(e)=>{
        console.log(this.props);
        e.preventDefault();
        axios.get('http://localhost/DhukaanPHP/login.php')
      .then(res => {
        const registeredUsers = res.data;
        const usersCount=registeredUsers.length;
        let count=0;
        for(let i of  registeredUsers){
           count++;
           if(i.email === this.state.email && i.password === this.state.password){
              this.setState({
                  login:true,     
             })
            break;
           }
           if(count == usersCount){
            this.setState({
                login:false,
                status:true
            })
           }
        }
      })
    }
    render(){
        if(this.state.login){
            return <Redirect to="/shopping-home"/>
        }
        
        return(
            <div>
                <Navigation/>
                <LoginForm login={this.login} changeHandler={this.changeHandler} user={this.state} checkboxhandler={this.checkBoxHandler}/>
            </div>
            
            
        )
    }
    
}

export default Login;

