import React, { Component } from 'react'

export default class Urlhit extends Component {
    constructor(props){
        super(props);
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const token = urlParams.get('token')
        console.log(token);
        window.location = "fitnessvwork://name/"+token;
    }
    render() {
        return (
            <div style={{padding:20,width:"100%",height:'100%'}}>
                <h3>This page is for fitnessvwork app email varification.</h3>
            </div>
        )
    }
}
