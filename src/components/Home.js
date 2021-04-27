import { Component } from "react";
import SearchText from "./SearchText";
import PostHomeItem from "./PostHomeItem"
import apiPost from "../apis/apiPost";
import PostItem from "./PostItem";
class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            post:[],
            textSearch : "",
        };
    }
    onChangeInput = (e)=>{
        this.setState({
            textSearch: e.target.value
        })
    }
    clickSearch = () =>{
        const call = async () =>{
            const res = await apiPost({
                method:"get",
                url:"/post/show?title="+this.state.textSearch,
            })
            this.setState({
                post:res.data
            })
        }
        call()
        this.setState({
            textSearch: ""
        })
    } 
    render(){
        let result
        if(this.state.post != ""){
            console.log(this.state.post)
            if(this.state.post.length<3){
                console.log("bai viet")
                result = this.state.post.map((item)=>{
                    return <PostHomeItem id={item.id} title={item.title} image={item.image} />
                })
                console.log(result)
            }else{
                
            }
        }
        return(
            <div className="main-home">
                <div className="home-title-wrapper">
                    <h1>LUNA BLOG</h1>
                </div>
                <div className="home-search-wrapper">
                    <SearchText onChangeInput={()=>this.onChangeInput} clickSearch={()=>this.clickSearch()} value={this.state.textSearch} />
                </div>
                <div className="home-post-wrapper row">
                    <div className="col-xl-2"></div>
                    {result}
                </div>
            </div>
        )
    }
}
export default Home