import { Component } from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
class Header extends Component{
    render(){
        return(
            <div className="header" >   
                <ul className="row nav nav-tabs" role="tablist">
                    <li className="header-home col-xl-2 nav-item">
                        <Link  className="nav-link active" data-toggle="tab" to="/">Home</Link>
                    </li> 
                    <li className="header-post col-xl-2 nav-item" >
                        <Link className="nav-link" data-toggle="tab" to="/post">Post</Link>
                    </li>
                    <li className="header-about col-xl-2 nav-item">
                        <Link className="nav-link" data-toggle="tab" to="/about">About</Link>
                    </li>
                    <li className="header-signin col-xl-2 nav-item">
                        <Link className="nav-link" data-toggle="tab" to="/signin">SignIn</Link>
                    </li>
                </ul>
            </div>
        )
    }
}
export default Header