import { Component } from "react";
import { connect } from "react-redux";
import {fetchPosts} from "../actions"
import apiPost from "../apis/apiPost";
import axios from "axios"
import { Redirect, Route  } from "react-router";
import { Link } from "react-router-dom";
import { read_cookie } from "sfcookies";
class PostDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            post: [],
            redirect:false,
        };
    }
    componentDidMount() {
        var {match} = this.props; 
        var url = "/post/show?id="+match.params.id; 
        console.log(url)
        const call = async () =>{
            const res = await apiPost.get(url)
            this.setState({ post:res.data[0] });
        }
        call()
    }

    deletePost = ()=>{
        console.log("redirect")
        var{match} =this.props
        const token = read_cookie("token")
        const call = async () =>{
            const res = await apiPost({
                method:"get",
                url:"/post/delete?id="+match.params.id,
                headers: { Authorization: "Bearer " + token },
            })
            if(res.data=="success"){
                this.setState({
                    redirect:true
                })
            }else{
                console.log("lỗi")
            }
        }
        call()
    }
    render(){
        if(this.state.redirect){
            const location = {
                pathname: '/post',
                state: { id : this.state.post.id }
              }
            return <Redirect to={location}></Redirect>
        }
        let deletePost = []
        if(localStorage.getItem("Username")){
            deletePost.push(<div className="delete-post-wrapper">
            <div className="delete-post">
                 <button  type="button" className="btn btn-primary" data-toggle="modal" data-target="#delete-post">Xóa bài viết</button>
            </div>
            <div className="update-post">
                 <button  type="button" className="btn btn-primary" data-toggle="modal" data-target="#update-post">Sửa bài viết</button>
            </div>
        </div>)
        }
        return(
            <div>
                <div className="post-detail-image" >
                    <img src={process.env.PUBLIC_URL + '/images/banner2.png'} className="image-post-detail" style={{backgroundImage: `url(${this.state.post.image})`}}></img>
                </div>
                <div className="post-detail-main">
                    <div className="post-detail-title">
                        <h3>{this.state.post.title}</h3>
                    </div>
                    <div className="post-detail-content">
                        <p>{this.state.post.content}</p>
                    </div>
                </div>
                {
                    deletePost.map((item)=>{
                        return item
                    })
                }
                <div className="modal fade" id="delete-post">
                        <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h4 className="modal-title">Bạn có chắc chắn xóa bài viết</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body justify-content-around" >    
                                    <div className="p-1">       
                                    <button type="button" className="btn btn-danger" onClick={this.deletePost} data-dismiss="modal">Xóa</button>
                                    </div>    
                                    <div className="p-1"> 
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
                                    </div>
                            </div>                           
                        </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default PostDetail