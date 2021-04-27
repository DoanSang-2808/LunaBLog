import { Component } from "react";
import { connect } from "react-redux";
import axios from "axios"
import { read_cookie } from "sfcookies";
class FormCreatePost extends Component{
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            title:"",
            content:"",
            image:null,
            mess:""
        }
        this.uploadSingleFile = this.uploadSingleFile.bind(this)
        this.upload = this.upload.bind(this)
    }
    handleSubmitted = ({ res, fields, form }) => {
        form.reset()
    }
    handleButtonClick = () => {
        console.log("reset")
        this.setState({
            mess:"",
            file:","
        })
        this.form.reset() 
    }
    uploadSingleFile(e) {
        this.setState({
            file: URL.createObjectURL(e.target.files[0]),
            image:  e.target.files[0]
        })
    }
    onChangeTitle =(e)=>{
        this.setState({
            title: e.target.value,
     })
    }
    onChangeContent = (e)=>{
        this.setState({
            content: e.target.value,
     })
    }
    upload(e) {
        e.preventDefault()
    }
    createPost = (e) =>{
        e.preventDefault()
        let  bodyFormData = new FormData();
        bodyFormData.append("title",this.state.title)
        bodyFormData.append("content",this.state.content)
        bodyFormData.append("image",this.state.image)
        const token = read_cookie("token")
        console.log(token)
        axios({
            method: 'post',
            url: "http://127.0.0.1:8000/post/create",
            headers: { Authorization: "Bearer " + token,
            },
            data: bodyFormData,        
        }).then(res=>{
            console.log(res.data)
            this.setState({
                mess:""
            })
            window.location.reload(false);
            }).catch(error=>{
                console.log(error);
                this.setState({
                    mess:"Tạo bài viết thất bại"
                })
            })
    }
    render(){
        let imgPreview;
        if (this.state.file) {
            imgPreview = <img src={this.state.file} alt='' style={{width:'100%'}} />;
        }
        return(
            <div className="modal fade" id="create-post">
            <div className="modal-dialog">
                <div className="modal-content">           
                    <div className="modal-header">
                        <h4 className="modal-title">Tạo bài viết</h4>
                    </div>          
                    <div className="modal-body">
                    <form action="#" onSubmitted={this.handleSubmitted} ref={form => this.form = form} >
                        <div className="form-group">
                            <input type="text" className="form-control" name="title" placeholder="Tiêu đề ..." onChange={this.onChangeTitle}></input>
                        </div>
                        <div class="form-group">
                            <label for="comment">Nội dung:</label>
                            <textarea className="form-control" rows="5" name="content" onChange={this.onChangeContent}></textarea>
                        </div>
                       {/*  */}
                        <div className="form-group preview">
                            {imgPreview}
                        </div>
                        <div className="form-group">
                            <label for="comment">Ảnh: </label>
                            <input type="file" className="form-control input-image-create-post" onChange={this.uploadSingleFile} />
                        </div>
                        <div className="mess-form text-center">{this.state.mess} </div>
                     
                       {/*  */}
                        <button type="submit" className="btn btn-success submit-create-post" onClick={this.createPost} >Tạo</button>
                    
                    </form>
                    </div>                  
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=>this.handleButtonClick()}>Close</button>
                    </div>
  
                </div>
            </div>
        </div>
        )
    }
}
// export default FormCreatePost

export default FormCreatePost