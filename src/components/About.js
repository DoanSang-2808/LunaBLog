import { Component } from "react";
class About extends Component{
    render(){
        return(
            <div className="container">
                <div className="row about-image-wrapper">
                    <img className="about-image" src={window.location.origin + '/images/logo.png'}></img>
                </div>
                <div className="row about-content-wrapper">
                    <div>SẢN PHẨM CỦA LU NA</div>
                </div>
            </div>
        )
    }
}
export default About