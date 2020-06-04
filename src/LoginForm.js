import React from 'react'

const LoginForm = (props) =>{
    const divstyle={
        position:'relative',
        marginTop:'10%'
    }
    
    const { email, password, status, login, showPassword } = props.user;
    
    
    return(
        <div className="container h-100">
                <h2 style={{fontStyle:'italic',textAlign:'center',position:'relative',top:'30px'}}>Login</h2>
                    <div className="row justify-content-center" style={divstyle}>
                    
                        <div className="col-md-6 col-12">
                            <form className="loginForm">
                                <div className="form-group">
                                    <span className="fa fa-envelope"></span>
                                    <label className="control-label" htmlFor="email">&nbsp;Email</label>
                                    <input type="text" className="form-control" placeholder="Email Address" name="email" onChange={props.changeHandler}/>
                                </div>
                                <div className="form-group">
                                    <i className="fa fa-key" aria-hidden="true"></i>
                                    <label className="control-label" htmlFor="password">&nbsp;Password</label>
                                    <input type="password" className="form-control" placeholder="Password" name="password" onChange={props.changeHandler}/>
                                    <div>{showPassword ? <p className="alert alert-primary">{password}</p> :''}</div>
                                    <input type = "checkbox" id="showPassword" onClick={props.checkboxhandler}/>Show Password
                                </div>
                                
                                    <div className="form-group">
                                        <input type="submit" name="login" onClick={props.login} className="btn btn-success"/>
                                    </div>
                                    <div className="form-group">  
                                        <a href="#">Forgot Password?</a>
                                    </div>
                               
                            </form>
                            
                            <div className="col-md-12 mt-3">
                                {status?
                                <div className="alert alert-danger">Please Check your Credentials Again</div>:""}
                            </div>
                      
                        </div>
                    </div>
        </div>
    )
}

export default LoginForm;