import React,{ Component } from 'react';
import Navigation from './Navigation';
import LoginForm from './LoginForm';
import './Login.css';
import axios from 'axios';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { fetchIdAction } from './Actions/action';
import { bindActionCreators } from 'redux';
import Auth from './Auth'

class Login extends Component{
    
    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             password:'',
             status:false,
             login:false,
             showPassword:false,
             login_id:0
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
                   login_id:i.id
               })
               localStorage.setItem('loginid',this.state.login_id)
            this.props.fetchIdAction(localStorage.getItem('loginid'));
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
      Auth.authenticate();
    }
    render(){
        if(this.state.login){
            return <Redirect to="/shopping-home"/>
        }
        
        return(
            <div>
                <Navigation />
                <LoginForm login={this.login} changeHandler={this.changeHandler} user={this.state} checkboxhandler={this.checkBoxHandler}/>
            </div>
            
            
        )

    }
 
    
}
const mapDispatchToProps = dispatch => ({
    fetchIdAction: bindActionCreators(fetchIdAction, dispatch)
  })

export default connect(null,mapDispatchToProps)(Login);

