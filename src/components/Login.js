import React, { Component } from 'react';
import axios from 'axios';
import Footer from './Footer';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            width: 0, height: 0 ,
            email:'' , password:'',
            alertshow:false,
            alerttext:'',
        };
        console.log('====================================');
        console.log(localStorage.getItem('usertoken'));
        console.log('====================================');
        if(localStorage.getItem('usertoken')!=null){
            this.props.history.push('/app');
        }
    }  
    componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions=()=> {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    loginfun(){
        var body={
            "email":this.state.email,
            "password":this.state.password
        }
        axios.post(global.url+'/adminLogin/', body )
        .then(res => {
            console.log(res.data);
            if(res.data.statusCode===200){
                localStorage.setItem('usertoken', res.data.data.token);
                this.props.history.push('/app');
            }
            else{
                this.setState({alertshow:true,alerttext:res.data.message});
            }
        }).catch(error=>{
            this.setState({alertshow:true,alerttext:'Network Error'});
        })
    }
    render() {
        return (
            <div className="loginbg" style={{height:this.state.height}}>
                
                <div className="modal-dialog modal-login modal_login">
                    <div style={{backgroundColor: '#191919',height:65,borderTopLeftRadius: 15,borderTopRightRadius: 15}}>
                        <div className="col-md-4 offset"></div>
                        <div className="sidebar-brand-icon " style={{textAlign:'center'}}>
                            <img className="mobile-logo" src="http://admin.fitnessvwork.com/img/logo.png" style={{width:'35%',padding:9}} alt="Logo" />
                        </div>
                    </div>
                    <div className="modal-content" style={{position:'relative',marginBottom:30}}>
                        <h4 className="modal-header pt-2" style={{paddingTop: 0,fontWeight:'600'}}>
                            <span className="modal-title login-color" >Login</span> <span className="text-color">Fitness V Work</span>
                        </h4>
                        <div className="modal-body">
                            <div className="form-group">
                                <div className="input-group logininput">
                                    <span className="input-group-addon"><i className="fa fa-user pt-1"></i></span>
                                    <input style={{backgroundColor:'#f6f7fa'}} type="text" className="form-control"
                                        name="username" placeholder="Username" required="required" onChange={e => {this.setState({email:e.target.value})}} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group logininput">
                                    <span className="input-group-addon"><i className="fa fa-lock pt-1"></i></span>
                                    <input style={{backgroundColor:'#f6f7fa'}} type="password" className="form-control"
                                        name="password" placeholder="Password" required="required" 
                                        onChange={e => {this.setState({password:e.target.value})}}/>
                                </div>
                            </div>
                            <div className="form-group login-mobile" style={{paddingTop:0,paddingBottom: 0,paddingLeft: 120,paddingRight: 120,}}>
                                <button onClick={() => this.loginfun()} className="btn btn-block btn-sm" style={{color:'white'}}>Login</button>
                            </div>
                        </div>
                        {(this.state.alertshow===true) && (
                            <div className="alert alert-danger alert-dismissible fade show" style={{position:'absolute',bottom:-10,right:0,zIndex:999999}} role="alert">
                                <strong>Alert! <br/> </strong> {this.state.alerttext}
                                <button type="button" className="close" aria-label="Close" onClick={()=>{this.setState({alertshow:false})}}>
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        )}
                    </div>
                    
                    <Footer/>
                </div>
                
            </div>
            
        )
    }
}
