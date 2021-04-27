import { Component } from "react";
import { Route ,Link, Router} from "react-router-dom"
import FormCreatePost from "./FormCreatePost";
import PostItem from "./PostItem";
import { connect } from "react-redux";
import {fetchPosts} from "../actions/index"
import PostDetail from "./PostDetail"
class Post extends Component{
   constructor(props) {
        super(props);
        this.state = {
            nowpage :1,
        };
    }
    componentDidMount() {
        console.log("componentDidMount")
        this.props.fetchPosts();
    }
    setPage = (countpost)=>{
        this.setState({
            nowpage :countpost
        })
    }   
    render(){
        const posts = this.props.postsOfComponent
        let { match } = this.props
        let url = match.url; 
        ////////Phân trang
        let soBaiViet = posts.length
        let soTrang = Math.ceil(posts.length/3)
        let phanTrang=[];
        if(soTrang<6){
            for(let i = 0;i<soTrang;i++){
                if(i+1 == this.state.nowpage){
                    phanTrang.push(<li className="page-item active"><Link className="page-link" onClick={()=>this.setPage(i+1)}>{i+1}</Link></li>)
                }
                else{
                    phanTrang.push(<li className="page-item"><Link className="page-link" onClick={()=>this.setPage(i+1)}>{i+1}</Link></li>)
                }
                
            }
        }
        let baiViet = []
        if(soBaiViet == 0){
            baiViet.push(<div class="spinner-border text-info"></div>)
        }
        else{
            if(this.state.nowpage === soTrang){
                for(let i=(this.state.nowpage-1)*3;i<(soBaiViet);i++){
                    baiViet.push(<PostItem  createAt={posts[i].createAt} title={posts[i].title} idPost={posts[i].id} content={posts[i].content} image={posts[i].image} createAt={posts[i].createAt} url={`${url}/${posts[i].id}`}/>)
                }
            }else{
                for(let i=(this.state.nowpage-1)*3;i<(this.state.nowpage-1)*3+3;i++){
                    baiViet.push(<PostItem  createAt={posts[i].createAt} title={posts[i].title} idPost={posts[i].id} content={posts[i].content} image={posts[i].image} createAt={posts[i].createAt} url={`${url}/${posts[i].id}`}/>)
                }
            }
        }
        let Addpost = []
        if(localStorage.getItem("Username")){
            Addpost.push(
                <div className="row create-post-wrapper">
                <div className="create-post col-6">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#create-post">Thêm bài viết mới</button>
                </div>
            </div>        
            )
        }
        return(
            <div className="main-post container" >
                <div className="space-post row"></div>
                {Addpost.map((post)=>{
                    return post
                })}
                <FormCreatePost></FormCreatePost>
                {/* List Item */}
                {baiViet.map((bai)=>{
                    return bai
                })}
                {/* <Route path="/post/pagination/:page">

                </Route> */}
                <div className="pagination-wrapp">
                    <ul className="pagination justify-content-center">
                        {phanTrang.map((trang)=>{
                           return trang
                        })}
                    </ul>
                </div>
            </div>
            
        )
    }
}
const mapStateToProps = (state) => {
    return {
      postsOfComponent: state.posts
    }
}
export default connect(mapStateToProps, { fetchPosts })(Post);
