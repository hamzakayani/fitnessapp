import React, { Component } from 'react'

export default class Alert extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        return (
            <div className="alert alert-danger alert-dismissible fade show" style={{alignSelf:'flex-end',position:'fixed',top:80}} role="alert">
                <strong>Alert! <br/> </strong> {this.props.text}
                <button type="button" className="close" aria-label="Close" onClick={()=>{this.setState({alertshow:false})}}>
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
}
