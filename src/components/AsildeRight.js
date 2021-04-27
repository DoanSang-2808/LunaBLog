import { Component } from "react";
import Header from "./Header";
import Main from "./Main";
class AslideRight extends Component{
    render(){
        return(
            <div className="aslide-right container-fluid">  
                <Header/>
                <Main/>
            </div>  
        )
    }
}
export default AslideRight