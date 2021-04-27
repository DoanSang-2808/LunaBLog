import { Component } from "react";
import { Link } from "react-router-dom";

class PostHomeItem extends Component{
    render(){
        return(
            <div className="card col-xl-2 home-post-item">
                <img  className="card-img-top" src={this.props.image}></img>
                <div className="card-body">
                    <p className="card-text"><Link to={`/post/${this.props.id}`}>{this.props.title}</Link></p>
                </div>
            </div>
        )
    }
}
export default PostHomeItem