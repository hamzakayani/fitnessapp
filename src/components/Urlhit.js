import React, { Component } from 'react'

export default class Urlhit extends Component {
    constructor(props){
        super(props);
        this.state = { 
            width: 0, height: 0 ,
            email:'' , password:'',
            alertshow:false,
            alerttext:'',
            token:''
        };
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const token = urlParams.get('token');
        this.state.token=urlParams.get('token');
        window.location = "fitnessvwork://name/"+token;
    }
    render() {
        return (
            <div style={{padding:20,width:"100%",height:'100%'}}>
                <h3>This page is for fitnessvwork app email varification.</h3>
                {/* <h3>For Android app verification 
                    <a href="#" onClick={()=>{window.location = "intent://name/"+this.state.token+"/#Intent;scheme=fitnessvwork;package=com.funavry.fitnessvworkoutexpo;end"}}>Click Here</a>
                </h3> */}
            </div>
        )
    }
}
