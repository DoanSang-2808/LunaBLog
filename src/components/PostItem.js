import { Component } from "react";
import { Link } from "react-router-dom";

class PostItem extends Component{
    render(){
        return(
            <div className="item-post row">
                <div className="col-md-4 mb-4">
                    <div className="bg-image hover-overlay shadow-1-strong rounded ripple" data-mdb-ripple-color="light">
                    <img src={this.props.image} className="img-fluid" />
                    {/* <a href="#!">
                        <div className="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                    </a> */}
                    </div>
                </div>
                <div className="col-md-8 mb-4">
                    <h5>{this.props.title}</h5>
                    <p className="content-post">
                        {this.props.content}
                    </p>
                    <p className="createAt-post">{this.props.createAt}</p>
                    <Link to={this.props.url} props="datalink"><button type="button" className="btn btn-info">Đọc chi tiết</button></Link>
                </div>
            </div>
        )
    }
}
export default PostItem