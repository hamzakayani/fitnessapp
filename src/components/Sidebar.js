import React, { Component } from 'react'
import { Link } from "react-router-dom";
export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        // classnamesidebar='navbar-nav sidebar sidebar-light accordion'
        this.state = { 
            sidebardata:
            [
                {id:'1',name:'App',link:'/app',icon:'fa fa-equals'},
                {id:'2',name:'Check Ins',link:'/checkins',icon:'far fa-calendar-alt'},
                {id:'3',name:'Users',link:'/users',icon:'far fa-user'},
                {id:'4',name:'Meal Plan',link:'/mealplan',icon:'fas fa-utensils'}
            ],
            selected:'1',
            itemclass:['nav-item active','nav-item','nav-item','nav-item',]
        };
        // console.log(this.props.location.href)
    }
    selectedfun=(index)=>{
      console.log('====================================');
      console.log(index);
      console.log('====================================');
      var temp=['nav-item','nav-item','nav-item'];
      temp[index]='nav-item active';
      this.setState({itemclass:temp});
    }
    render() {
        return (
            <ul className={this.props.classnamesidebar} id="accordionSidebar">
              <div className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-icon">
                  <img alt="logo" src="http://admin.fitnessvwork.com/img/logo/logo.png" />
                </div>
              </div>
              <hr className="sidebar-divider my-0" />
              {this.state.sidebardata.map((item,index)=>{
                  return(
                    <li className={this.props.itemclass[index]} key={index}>
                        <Link to={item.link} onClick={()=>this.selectedfun(index)}>
                            <div className="nav-link">
                            <i className={item.icon}></i>
                            <span>{item.name}</span>
                            </div>
                        </Link>
                        <hr className="sidebar-divider my-0" />
                    </li>
                  )
              })}
            </ul>
        )
    }
}
