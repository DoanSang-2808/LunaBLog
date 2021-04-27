import React,{ Component } from "react";
import { withCookies, Cookies } from 'react-cookie';
import apiPost from "../apis/apiPost"
import axios from "axios"
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'
class SignIn extends Component{  
    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
            user: localStorage.getItem('Username'),
        }
    }
    handleChangePassword =(e)=>{
        this.setState({
            password: e.target.value,
        })
    }
    handleChangeEmail = (e)=>{
        this.setState({
            email: e.target.value,
     })
    }
    SubmitLogin = (e)=>{       
        e.preventDefault();
        let  bodyFormData = new FormData();
        bodyFormData.append("email",this.state.email)
        bodyFormData.append("password",this.state.password)
        axios({
            method: 'post',
            url: "http://127.0.0.1:8000/auth/login",
            data: bodyFormData, 
            // mode: 'no-cors',
            // withCredentials: true ,
        }).then(res=>{
            // console.log(res.headers["set-cookie"]);
            bake_cookie("token", res.data.token)
            localStorage.setItem("Username",res.data.username)
            this.setState({
                user: res.data.username,
            })         
            }).catch(error=>{
                console.log("Lỗi: ")
                console.log(error);
                alert("Tên tài khoản mật khẩu sai...");
            })
        }
    SubmitLogout = (e)=>{
            e.preventDefault();
            console.log("logout")
            localStorage.removeItem('Username');
            this.setState({
                user: ""
            })
            delete_cookie("token")
        }
    render(){
        const htmlRaw = []
        if(localStorage.getItem('Username')){
            htmlRaw.push(<div>
                <div>Username: {this.state.user}</div>
                <div><button type="submit" className="btn btn-primary" onClick={this.SubmitLogout}>Đăng Xuất</button></div>
            </div>)
        }else{
            htmlRaw.push( <div className="container sign-in">
            <h2>Đăng nhập</h2>
            <form>
                <div className="form-group">
                <label for="email">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Nhập email" name="email" onChange={this.handleChangeEmail}></input>
                </div>
                <div clasclassNames="form-group">
                <label for="pwd">Password:</label>
                <input type="password" className="form-control" id="pwd" placeholder="Nhập password " name="password" onChange={this.handleChangePassword}></input>
                </div>
                <div className="form-group form-check">
                <label className="form-check-label">
                    <input className="form-check-input" type="checkbox" name="remember"></input> Nhớ tài khoản
                </label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.SubmitLogin}>Đăng Nhập</button>
            </form>
        </div>)
        }
        return(
            <div className="sign-in-wrapper">
                {htmlRaw.map((html)=>{
                    return html
                })}
            </div>
        )
    }
}
// export default SignIn
export default SignIn