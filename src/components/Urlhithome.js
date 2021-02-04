import React, { Component } from 'react'

export default class Urlhithome extends Component {
    constructor(props){
        super(props);
        window.location = "fitnessvwork://app/";
    }
    render() {
        return (
            <div style={{padding:20,width:"100%",height:'100%'}}>
                <h3>This page is for fitnessvwork app redirect.</h3>
                {/* <h3>For Android app redirect 
                    <a href="#" onClick={()=>{window.location = "intent://app/#Intent;scheme=fitnessvwork;package=com.funavry.fitnessvworkoutexpo;end"}}>Click Here</a>
                </h3> */}
            </div>
        )
    }
}
