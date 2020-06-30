import React from 'react'
import { Link } from "react-router-dom";
import './Nav.css'

const Navigation=()=>{
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <p style={{fontStyle:'italic'}} className="navbar-brand">DHUKAAN</p>
            
           
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
                </ul>
                
           
        </nav>
    )
    
}
export default Navigation;