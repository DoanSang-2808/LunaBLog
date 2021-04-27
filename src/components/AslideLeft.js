import { Component } from "react";

class AslideLeft extends Component{
    render(){
        return(
            <div className="aslide-left" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/banner.jpg'})`}}>         
            </div>
        )
    }
}
export default AslideLeft