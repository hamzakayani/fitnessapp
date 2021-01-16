import React, { Component } from 'react'
import Sidebar from './Sidebar';
import Navi from './Navi';
import axios from 'axios';
import Footer from './Footer';
export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          token:localStorage.getItem('usertoken'),
          classnamesidebar:'navbar-nav sidebar sidebar-light accordion',
          alerttext:'',
          alertshow:false,
          alertshowsuccess:false,
          oldpswd:'',
          newpswd:'',
          confirmpswd:'',
        };
        console.log(this.state.token);
      }
    changepswd=()=>{
        if(this.state.oldpswd.trim()==''){
            this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Enter Old password'});
        }
        else if(this.state.newpswd.trim()==''){
            this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Enter New password'});
        }
        else if(this.state.confirmpswd.trim()==''){
            this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Enter Confirm password'});
        }
        else if(this.state.oldpswd.length<4 || this.state.newpswd.length<4 || this.state.confirmpswd.length<4){
            this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Password Must be 4 Digits'});
        }
        else if(this.state.confirmpswd!=this.state.newpswd){
            this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Password not matched'});
        }
        else{
            var body={
                "oldpassword": this.state.oldpswd,
                "newpassword": this.state.newpswd,
            }
            axios.post(global.url+'/changePassword', body ,{headers:{
            "Authorization": this.state.token,
            "Content-Type":"application/json"
            }})
            .then(res => {
                console.log(res.data);
                if(res.data.statusCode===200){
                    this.setState({oldpswd:'',newpswd:'',confirmpswd:''});
                    this.setState({alertshow:false,alertshowsuccess:true,alerttext:res.data.message});
                }
                else{
                    this.setState({alertshow:true,alertshowsuccess:false,alerttext:res.data.message});
                }
            }).catch(error=>{
            this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
            })
        }
    }
    render() {
        return (
            <div id="wrapper">
            <Sidebar classnamesidebar="navbar-nav sidebar sidebar-light accordion" itemclass={['nav-item','nav-item','nav-item','nav-item']}/>
            <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
            {/* nav bar start  */}
            {/* nav bar start  */}
            <nav className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
            <button id="sidebarToggleTop" onClick={()=>{this.togglesidebar()}} style={{borderWidth:0,borderRadius:0,backgroundColor:'white'}} 
            className="btn-input btn-link rounded-circle mr-3">
            <i className="fa fa-bars" style={{color:'black'}}></i>
            </button>
            <Navi/>
            </nav>
            {/* nav bar end  */}
            {/* nav bar end  */}
            <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center  mb-2">
                <h1 className="h3 mb-0 text-gray-800 col-md-6 check-in-heading mb-3 responsive" style={{paddingRight: 0,}}>
                    Change Password
                </h1>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-7 p-5 mt-4 mb-4 change-password-modal">
                    <div className="row">
                        <div className="form-group col-md-12">   
                            <label className="edit-modal-user ">Old Password</label>
                            <div>    
                                <input placeholder="Password" type="password" className="form-control field-text p-0 pl-2" name="oldpassword"
                                value={this.state.oldpswd} onChange={e => {this.setState({oldpswd:e.target.value})}} required="required"/>
                            </div>
                        </div>
                        <div className="form-group col-md-12"> 
                            <label className="edit-modal-user ">New Password</label>     
                            <div>   
                                <input placeholder="Password" type="password"  min="0" className="form-control field-text p-0 pl-2" name="newpassword"
                                value={this.state.newpswd} onChange={e => {this.setState({newpswd:e.target.value})}} required="required"/>
                            </div>
                        </div>
                        <div className="form-group col-md-12">   
                            <label className="edit-modal-user">Confirm Password</label>
                            <div>    
                                <input placeholder="Password" type="password" className="form-control field-text p-0 pl-2" name="confirmpassword"
                                value={this.state.confirmpswd} onChange={e => {this.setState({confirmpswd:e.target.value})}} required="required"/>
                            </div>
                        </div>
                        <div className="form-group col-md-12 mb-0">
                            <div className="col-md-8 mb-3 m-auto responsive ">
                                <button type="submit" className="btn btn-elegant btn-rounded btn-sm button-style btn-footer mt-3" onClick={()=>{this.changepswd()}}>Change Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {(this.state.alertshowsuccess===true) && (
                <div className="alert alert-success alert-dismissible fade show" style={{alignSelf:'flex-end',position:'fixed',top:80,zIndex:999999,right:0}}>
                <strong>Alert! <br/> </strong> {this.state.alerttext}
                <button type="button" className="close" aria-label="Close" onClick={()=>{this.setState({alertshowsuccess:false})}}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
            )}
            {(this.state.alertshow===true) && (
                <div className="alert alert-danger alert-dismissible fade show" style={{alignSelf:'flex-end',position:'fixed',top:80,zIndex:999999,right:0}}>
                <strong>Alert! <br/> </strong> {this.state.alerttext}
                <button type="button" className="close" aria-label="Close" onClick={()=>{this.setState({alertshow:false})}}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
            )}
            
            <Footer/>
            </div>
        </div>
        </div>
        )
    }
}
