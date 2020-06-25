import React from 'react'
import { Link } from "react-router-dom";

const Navigation=()=>{
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <p style={{fontStyle:'italic'}} className="navbar-brand">DHUKAAN</p>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
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
                
            </div>
        </nav>
    )
    
}
export default Navigation;