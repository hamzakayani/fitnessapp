import React, { Component } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import Navi from './Navi';
import Footer from './Footer';
import Switch from "react-switch";
export default class Waves extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      token:localStorage.getItem('usertoken'),
      classnamesidebar:'navbar-nav sidebar sidebar-light accordion',
      checkedstandard: false,
      checkpremium:false
    };
    if(this.state.token){
      this.getstandardstatus();
      this.getpremiumstatus();
    }
    else{
      localStorage.clear();
      this.props.history.push('/login');
    }
  }
getstandardstatus(){
  var body = {
    type:"standard"
  }
  axios.post(global.url+'/getSignupStatus' ,body,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }}).then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.setState({checkedstandard:res.data.data.status===1?true:false});
      }
      else{
        if(res.data.message==='Invalid token. Please login.'){
          localStorage.clear();
          this.props.history.push('/login');
        }
        else{
          this.setState({alertshow:true,alertshowsuccess:false,alerttext:res.data.message});
        }
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
  })
}
getpremiumstatus(){
  var body = {
    type:"premium"
  }
  axios.post(global.url+'/getSignupStatus',body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }}).then(res => {
    console.log(res.data);
    if(res.data.statusCode===200){
      this.setState({checkpremium:res.data.data.status===1?true:false});
    }
    else{
      if(res.data.message==='Invalid token. Please login.'){
        localStorage.clear();
        this.props.history.push('/login');
      }
      else{
        this.setState({alertshow:true,alertshowsuccess:false,alerttext:res.data.message});
      }
    }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
  })
}
changestandard=()=>{
  this.changestatus('standard',!this.state.checkedstandard);
  this.setState({checkedstandard:!this.state.checkedstandard});
}
changestatus=(type,status)=>{
  var body={
    "type":type,
    "status":status===true?1:0
  }
  axios.post(global.url+'/setSignupStatus/', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }}).then(res => {
    console.log(res.data);
    if(res.data.statusCode===200){
      this.getstandardstatus();
      this.getpremiumstatus();
    }
    else{
      if(res.data.message==='Invalid token. Please login.'){
        localStorage.clear();
        this.props.history.push('/login');
      }
      else{
        this.setState({alertshow:true,alertshowsuccess:false,alerttext:res.data.message});
      }
    }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
  })
}
changepremium=()=>{
  this.changestatus('premium',!this.state.checkpremium);
  this.setState({checkpremium:!this.state.checkpremium})
}
togglesidebar=()=>{
  if(this.state.classnamesidebar==='navbar-nav sidebar sidebar-light accordion')
  {
    this.setState({classnamesidebar:'navbar-nav sidebar sidebar-light accordion toggled'})
  }
  else{
    this.setState({classnamesidebar:'navbar-nav sidebar sidebar-light accordion'})
  }
}

    render() {
        return (
            <div id="wrapper">
            <Sidebar classnamesidebar={this.state.classnamesidebar} itemclass={['nav-item active','nav-item ','nav-item ','nav-item ']}/>
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
              {/* nav bar start  */}
              {/* nav bar start  */}
              <nav className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
                <button id="sidebarToggleTop" onClick={()=>{this.togglesidebar()}} style={{borderWidth:0,borderRadius:0,backgroundColor:'white'}} 
                className="btn-input btn-link rounded-circle mr-3">
                <i className="fa fa-bars pt-2" style={{color:'black'}}></i>
                </button>
                <Navi/>
              </nav>
              {/* nav bar end  */}
              {/* nav bar end  */}
              <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center  mb-2">
                  <h1 className="h3 mb-0 text-gray-800 col-md-6 check-in-heading mb-3 responsive" style={{paddingRight: 0,}}>
                  Dashboard 
                  </h1>
                  <div className="col-md-2 mb-3 responsive">
                  </div>
                </div>
              </div>
              <div style={{padding:20,float:'left',width:'100%'}}>
                <div style={{float:'left',width:'100%',backgroundColor:'#20adbd',padding:10,marginBottom:10}}>
                  <label style={{float:'left',width:'90%',fontSize:20,marginBottom:0,color:'white'}}>
                    Standard Membership ({this.state.checkedstandard==true?'Activated':'Deactivated'})
                  </label>
                  <Switch
                    checked={this.state.checkedstandard}
                    onChange={()=>{this.changestandard()}}
                    onColor="#00ffbf"
                    onHandleColor="#00ffbf"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    className="react-switch"
                    id="material-switch"
                  />
                </div>
              
                <div style={{float:'left',width:'100%',backgroundColor:'#27b390',padding:10}}>
                  <label style={{float:'left',width:'90%',fontSize:20,marginBottom:0,color:'white'}}>
                    Premium Membership ({this.state.checkpremium==true?'Activated':'Deactivated'})
                  </label>
                  <Switch
                    checked={this.state.checkpremium}
                    onChange={()=>{this.changepremium()}}
                    onColor="#00ffbf"
                    onHandleColor="#00ffbf"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    className="react-switch"
                    id="material-switch"
                  />
                </div>
              </div>
              </div>
            {(this.state.alertshow===true) && (
              <div className="alert alert-danger alert-dismissible fade show" style={{alignSelf:'flex-end',position:'fixed',top:80,zIndex:999999}} role="alert">
                <strong>Alert! <br/> </strong> {this.state.alerttext}
                <button type="button" className="close" aria-label="Close" onClick={()=>{this.setState({alertshow:false})}}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            {(this.state.alertshowsuccess===true) && (
              <div className="alert alert-success alert-dismissible fade show" style={{alignSelf:'flex-end',position:'fixed',top:80,zIndex:999999,right:0}}>
                <strong>Alert! <br/> </strong> {this.state.alerttext}
                <button type="button" className="close" aria-label="Close" onClick={()=>{this.setState({alertshowsuccess:false})}}>
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            <Footer/>
            </div>
          </div>
        )
    }
}

