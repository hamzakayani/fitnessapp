import React, { Component } from 'react';
import { Switch } from "react-router-dom";
// import Route from "./Route";
import { Route } from "react-router-dom";
import Login from './components/Login';
import Checkins from './components/Checkins';
import Waves from './components/Waves';
import Users from './components/Users';
import Navi from "./components/Navi";
import Sidebar from "./components/Sidebar";
import MealPlan from "./components/MealPlan";
import ChangePassword from "./components/ChangePassword";
import './App.css';
import Urlhit from './components/Urlhit';
import Urlhithome from './components/Urlhithome';
export default class App extends Component {
  constructor(props){
    super(props);
    global.url='https://apicall.fitnessvwork.com'
  }
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/app" component={Waves} />
        <Route path="/checkins" component={Checkins} />
        <Route path="/users" component={Users} />
        <Route path="/navi" component={Navi}/>
        <Route path="/mealplan" component={MealPlan}/>
        <Route path="/changepassword" component={ChangePassword}/>
        <Route path="/sidebar" component={Sidebar}/>
        <Route path="/urlhit" component={Urlhit}/>
        <Route path="/urlhithome" component={Urlhithome}/>
        
      </Switch>
    )
  }
}
