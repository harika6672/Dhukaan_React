import React from 'react';
import Modal from './Modal.js';

const RegistrationForm = (props)=>{
    const headerStyle={
        fontStyle:'italic',textAlign:'center',position:'relative',top:'30px'
    }
    const formStyle={
        position:'relative', marginTop:'10%'
    }
    return(
        <div className="h-100 container">
                <h2 style={headerStyle}>Register</h2>
                    <form style={formStyle} className="needs-validation">
                        <div className="form-row">
                            <div className="form-group col-md-6 col-12">
                            <label htmlFor="firstname">First Name</label>
                            <input type="text" className="form-control" id="firstname" placeholder="First Name" onChange={props.changeHandler} name="firstname"/>
                            <div className="invalid-feedback d-block">{props.firstname}</div>
                            </div>
                            <div className="form-group col-md-6 col-12" >
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" className="form-control" id="lastname" placeholder="Last Name" onChange={props.changeHandler} name="lastname"/>
                            <p className="invalid-feedback d-block">{props.lastname}</p>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 col-12">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Email" onChange={props.changeHandler} name="email" />
                            <p className="invalid-feedback d-block">{props.email}</p>
                            </div>
                            <div className="form-group col-md-6 col-12">
                               
                                    <label htmlFor="password">Password</label>
                                    <div className="row">
                                     <div className="col-md-11">
                                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={props.changeHandler} name="password"/>
                                    </div>
                                <div className="col-md-1">
                                <button type="button" className="btn btn-primary" data-container="body" data-toggle="popover" data-placement="bottom"
                            data-content="password should contain atleast one capital letter,one small letter,one digit and one special character..Length of password should be greater than 8 characters">
                                <i className="fa fa-info-circle" aria-hidden="true"></i>
                            </button>
                                </div>
                                </div> 
                            <p className="invalid-feedback d-block">{props.password}</p>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-3 col-12">
                                <label htmlFor="gender">Gender&nbsp;&nbsp;&nbsp;</label><br/>
                                <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="exampleRadios1" value="Male"  onChange={props.changeHandler}/>Male
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="exampleRadios2" value="Female"  onChange={props.changeHandler}/>Female
                                </div>
                            </div>
                            <div className="form-group col-md-3 col-12">
                                <label htmlFor="dob">Date of Birth</label>
                                <input type="date" className="form-control" name="dob" onChange={props.changeHandler}></input>
                                <p className="invalid-feedback d-block">{props.dob}</p>
                            </div>
                            <div className="form-group col-md-6 col-12">
                                <label htmlFor="mobilenum">Mobile Number</label>
                                <input type="text" id="" name="mobilenum" className="form-control" onChange={props.changeHandler}/>
                                <p className="invalid-feedback d-block">{props.mobilenum}</p>
                            </div>
                        </div>
                       
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" name="address" placeholder="1234 Main St"  onChange={props.changeHandler}/>
                            <p className="invalid-feedback d-block">{props.address}</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address2">Address 2</label>
                            <input type="text" className="form-control" id="address2" name="address2" placeholder="Apartment, studio, or floor"  onChange={props.changeHandler}/>
                            <p className="invalid-feedback d-block">{props.address2}</p>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 col-12">
                                <label htmlFor="city">City</label>
                                <input type="text" className="form-control" id="city" name="city"  onChange={props.changeHandler}/>
                                <p className="invalid-feedback d-block">{props.city}</p>
                            </div>
                            <div className="form-group col-md-4 col-12">
                                <label htmlFor="state">State</label>
                                <select id="state" className="form-control" name="state"  onChange={props.changeHandler}>
                                    <option value="">Choose State</option>
                                    <option value="telengana">Telegana</option>
                                    <option value="ap">Andhra Pradesh</option>
                                </select>
                                <p className="invalid-feedback d-block">{props.state}</p>
                            </div>
                            <div className="form-group col-md-2 col-12">
                                <label htmlFor="zip">Zip</label>
                                <input type="text" className="form-control" id="zip" name="zip"  onChange={props.changeHandler}/>
                                <p className="invalid-feedback d-block">{props.zip}</p>
                            </div>
                        </div>
                        <div className="col-md-12 text-center">
                            <button type="button" id="btnRegister" data-toggle="modal" data-target="#exampleModal" name="register" onClick={props.register} disabled={!props.status} className="btn btn-primary btn-lg btn-center">Sign Up</button>
                        </div> 
                        <Modal message={props.message}/>            
                    </form>
                </div>
           
    )
} 

export default RegistrationForm;