import React, { Component } from 'react'
import Sidebar from './Sidebar';
import Navi from './Navi';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Footer from './Footer';
import InstagramEmbed from 'react-instagram-embed';
export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      token:localStorage.getItem('usertoken'),
      usersdata:[],
      search:'',
      wavedata:[],
      dropdownwavedata:[],
      selectedwave:0,
      selecteduser:'',
      selectededituser:'',
      reviewtxt:'',
      classnamesidebar:'navbar-nav sidebar sidebar-light accordion',
      alerttext:'',
      alertshow:false,
      alertshowsuccess:false,
      totalpages:0,
      start:0,
      // workouts 
      userworkoutdata:[],
      allworkoutdata:[],
      selectedworkoutdetail:'',
      selectedexercise:0,
      selectedworkout:'',
      userrecreationalactivitydata:[],
      recreationalactivitydata:[],
      selectedrecreational:'',
      othertext:'',
      // workouts 
      // user variable
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      confirmpassword:'',
      phone:'',
      age:'',
      gender:'',
      foodpreference:'',
      workoutpreference:'',
      accounttype:'',
      // user variable
      activeIndex: 0,
      protiens:'',
      calories:'',
    };
    if(this.state.token){
      this.getuserbywave();
      this.getwaves();
      this.getAllRecreationalActivity();
    }
    else{
      localStorage.clear();
      this.props.history.push('/login');
    }
    
  }
  getwaves=async()=>{
    var body={
      "limit":1000,
      "start":0,
      "searchParams": "all"
    }
    axios.post(global.url+'/getWaves/', body ,{headers:{
      "Authorization": this.state.token,
      "Content-Type":"application/json"
    }})
    .then(res => {
        console.log(res.data.data);
        if(res.data.statusCode===200){
          this.setState({wavedata:res.data.data})
          var temp=[];
          console.log(res.data.data.length);
          for(var i=0;i<res.data.data.waves.length;i++){
            temp.push({val:res.data.data.waves[i].name,id:res.data.data.waves[i].id})
          }
          this.setState({dropdownwavedata:temp});
          console.log('====================================');
          console.log(temp);
          console.log('====================================');
        }
    }).catch(error=>{
      this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
    })
  }
  gendercheck=(gender)=>{
    if(gender===1){
      return 'Female'
    }
    else{
      return 'Male'
    }
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
restartdays=(id)=>{
var body={
  "userFor":id,
}
axios.post(global.url+'/restartDays/', body ,{headers:{
  "Authorization": this.state.token,
  "Content-Type":"application/json"
}})
.then(res => {
    console.log(res.data);
    if(res.data.statusCode===200){
      this.getuserbywave()
    }
}).catch(error=>{
  this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
})
}
stopdays=(id)=>{
  var body={
    "userFor":id,
  }
  axios.post(global.url+'/stopDays/', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.getuserbywave()
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
  })
}
getuserbywave=async()=>{
  var body={
    "limit":10,
    "start":this.state.start,
    "name":this.state.search,
    "waveid":this.state.selectedwave
  }
  axios.post(global.url+'/getUserByWave/', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.setState({usersdata:res.data.data.users,totalpages:res.data.data.totalPages})
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
addcheckinreview=()=>{
  console.log('====================================');
  console.log(this.state.selecteduser);
  console.log('====================================');
  var body={
    "review":this.state.reviewtxt,
    "reviewFor":this.state.selecteduser.userId,
    "reviewId":this.state.selecteduser.reviewId,
  }
  axios.post(global.url+'/addCheckInReview/', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.setState({reviewtxt:''})
        this.getuserbywave();
        this.setState({alertshow:false,alertshowsuccess:true,alerttext:res.data.message});
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
  })
}
edituser=()=>{
  if(this.state.proteins && this.state.calories && this.state.proteins>=0 && this.state.calories>=0){
    var body={
      "userFor":this.state.selectededituser.userId,
      "proteins":parseInt(this.state.proteins),
      "calories":parseInt(this.state.calories)
    }
    axios.post(global.url+'/updateUserAdmin', body ,{headers:{
      "Authorization": this.state.token,
      "Content-Type":"application/json"
    }})
    .then(res => {
        console.log(res.data);
        if(res.data.statusCode===200){
          this.getuserbywave();
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
deleteuser=(id)=>{
  var body={
    "id":id
  }
  axios.post(global.url+'/deleteUser', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.getuserbywave();
        this.setState({alertshow:false,alertshowsuccess:true,alerttext:res.data.message});
      }
      else{
        this.setState({alertshow:true,alertshowsuccess:false,alerttext:res.data.message});
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
  })
}
adduser=()=>{
  var body={
    "fname":this.state.firstname,
    "lname":this.state.lastname,
    "mobileNo":this.state.phone,
    "email":this.state.email,
    "age": this.state.age,
    "gender": this.state.gender=='male'?0:1,
    "password":this.state.password,
    "foodpreference":this.state.foodpreference,
    "workoutpreference":this.state.workoutpreference,
    "ispremium":this.state.accounttype==2?true:false,
    "isValid":true
  }
  if(this.state.firstname!='' && this.state.lastname!='' && this.state.phone!='' && this.state.email!='' && this.state.age!=''
  && this.state.gender!='' && this.state.password!='' && this.state.accounttype!=''){
    axios.post(global.url+'/userSignup', body ,{headers:{
      "Authorization": this.state.token,
      "Content-Type":"application/json"
    }}).then(res => {
        console.log(res.data);
        if(res.data.statusCode===200){
          this.getuserbywave();
          this.setState({alertshow:false,alertshowsuccess:true,alerttext:res.data.message});
          this.setState({
            firstname:'',
            lastname:'',
            phone:'',
            email:'',
            age:'',
            gender:'',
            password:'',
            foodpreference:'',
            workoutpreference:'',
            accounttype:'',})
        }
        else{
          this.setState({alertshow:true,alertshowsuccess:false,alerttext:res.data.message});
        }
    }).catch(error=>{
      this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
    })
  }
  
}

// Workout Services
// Workout Services
createWorkoutPlan = async (phase,id) => {
  var body={
    "phase":phase,
    "userFor":id
  }
  axios.post(global.url+'/createWorkOut/', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }}).then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.getWorkouts(this.state.selecteduser)
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
  })
};
Deleteworkout = async (id,userid) => {
  var body={
    "id":id,
    "userFor":userid
  }
  axios.post(global.url+'/deleteWorkout', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.getWorkouts(this.state.selecteduser)
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
  })
};
getWorkouts = async (data) => {
  var body={
    "phase":data.currentphase,
    "userFor":data.userId
  }
  axios.post(global.url+'/getMyWorkoutsByPhase', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.setState({userworkoutdata:res.data.data})
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
  })
};
getAllWorkouts = async (item) => {
  console.log('====================================');
  console.log(item);
  console.log('====================================');
  var body={
    "phase":item.currentphase,
    "userFor":item.userId
  }
  axios.post(global.url+'/getAllWorkouts', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.setState({allworkoutdata:res.data.data})
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
  })
};
addWorkoutToMyPlan = async () => {
  console.log('====================================');
  console.log(this.state.allworkoutdata[this.state.selectedexercise].id);
  console.log(this.state.selectedworkout.id);
  console.log(this.state.selecteduser.currentphase);
  console.log('====================================');
  var body={
    "id":this.state.selectedworkout.id,
    "workoutid":this.state.allworkoutdata[this.state.selectedexercise].id,
    "phase":this.state.selecteduser.currentphase,
    "userFor":this.state.selecteduser.userId
  }
  axios.post(global.url+'/addWorkoutToMyPlan/', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.getWorkouts(this.state.selecteduser)
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
  })
};
getUserRecreationalActivity = () => {
  var body={
    "workoutId": this.state.selectedworkout.id,
    "userFor":this.state.selectedworkout.userid,
  }
  axios.post(global.url+'/getUserRecreationalActivity/', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.setState({userrecreationalactivitydata:res.data.data});
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
  })
};
addRecreationalActivity = () => {
  if (this.state.selectedrecreational!=='12') {
    this.addrec();
  } else {
    if (this.state.othertext !== '') {
      this.addrec();
    } else {
      alert("Please add other Activity");
    }
  }
};
deleterecreational = (id, isOther) => {
  var body={
    "recreationalMappingId": id,
    "isOther": isOther,
    "userFor":this.state.selectedworkout.userid,
  }
  axios.post(global.url+'/deleteRecreationalActivity/', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.getUserRecreationalActivity();
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
  })
};
addrec = async () => {
  var body={
    "workoutId": this.state.selectedworkout.id,
    "recreationalDayId": this.state.selectedrecreational,
    "isOther": this.state.othertext ? true : false,
    "recreationalDayName": this.state.othertext,
    "userFor":this.state.selectedworkout.userid
  }
  axios.post(global.url+'/addRecreationalActivity/', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.getUserRecreationalActivity();
        this.setState({ other: "" });
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
  })
};
getAllRecreationalActivity = () => {
  axios.get(global.url+'/getAllRecreationalActivity/' ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.setState({recreationalactivitydata:res.data.message});
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
  });
};
// Workout Services
// Workout Services
handleClick(index, props) {
  this.setState({ activeIndex: index });
}



    render() {
        return (
            <div id="wrapper">
            <Sidebar classnamesidebar={this.state.classnamesidebar} itemclass={['nav-item','nav-item ','nav-item active','nav-item ']}/>
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
                  <div className="d-sm-flex align-items-center mb-2">
                    <h1 className="h3 mb-0 text-gray-800 col-md-5 check-in-heading mb-3 responsive" style={{paddingRight: 0,}}>
                     Users
                    </h1>
                    {/* <div className="col-md-2 mb-3 responsive emplty-div"></div> */}
                    <div className="col-md-2 mb-3 responsive fileds-tab" style={{marginLeft:40}}>
                      {/* <select className="btn form-control btn-height border-color btn-border" 
                      onChange={(event)=>{this.setState({selectedwave:event.target.value});
                      setTimeout(() => {
                        this.getuserbywave();
                      }, 500)}} 
                      value={this.state.selectedwave}>
                        <option value='0' >All</option>
                      {this.state.dropdownwavedata.map((item,index)=>{
                        return(
                          <option value={item.id} key={index}>{item.val}</option>
                        )
                      })}
                      </select> */}
                    </div>
                    <div className=" col-md-2 mb-3 responsive fileds-tab">
                      <form>
                      <div className="input-group">
                        <input style={{textAlign:'inherit'}} type="text" className="btn-input form-control btn-height border-color btn-border"
                          placeholder="Search" value={this.state.search} onChange={e => {this.setState({search:e.target.value})}} />
                        <div className="input-group-append">
                          <button style={{borderWidth:0}} className="btn btn-secondary btn-border" type="submit" onClick={e => {e.preventDefault(); this.getuserbywave()}}>
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                      </form>
                    </div>
                    <div className="col-md-2 mb-3 responsive" style={{marginLeft:10}}>
                        <button data-toggle="modal" data-target="#myModal" className="btn btn-rounded button-style "
                            style={{width:'100%',height:40,border:0}}>Create User</button>
                    </div>
                  </div>
                </div>
                <div className='scrollviewcontent'>
                {this.state.usersdata.map((item,index) => {
                  return(
                <div className="row ml-4 mr-4 mb-4 table-content" key={index}>
                  <div className="col-md-12 table-img" style={{textTransform:'capitalize'}}>
                    <img alt="profile" className="img-profile rounded-circle mr-2 ml-3" src= {global.url+item.image.replace('/public', '')}
                      style={{objectFit:'cover',float:'left'}} />
                   <div className="text-truncate col-md-5 pt-2 pl-0" style={{float:'left',cursor:'pointer'}} title={item.fname + ' ' +  item.lname}>   {item.fname} {item.lname} </div>
                     <div className="row button-set">
                     <button style={{border:0}} className="btn btn-sm button-style" data-toggle="modal" 
                      data-target="#workoutModal" onClick={()=>{this.setState({selecteduser:item});this.getWorkouts(item);
                      this.getAllWorkouts(item)}}>Workout</button>
                     {(item.stopdayscheck===1) && (
                        <button style={{border:0}} className="btn btn-sm  button-style" onClick={()=>{
                          this.restartdays(item.userId);
                        }}>Start Timer</button>
                      )}
                      {(item.stopdayscheck===0) && (
                        <button style={{border:0}} className="btn btn-sm button-style" onClick={()=>{
                          this.stopdays(item.userId);
                        }}>Stop Timer</button>
                      )}
                      {(item.review===null) && (
                      <button style={{border:0}} className="btn btn-sm button-style"  data-toggle="modal" data-target="#addnotes" onClick={()=>{
                          this.setState({selecteduser:item})
                        }}>Add Notes</button>
                      )}
                      {(item.review!==null) && (
                        <>
                      
                        <button style={{border:0}} className="btn btn-sm button-style"  data-toggle="modal" data-target="#editnotes" onClick={()=>{
                            this.setState({selecteduser:item,reviewtxt:item.review})
                          }}>View Notes</button>
                        </>
                      )}
                     </div>



                     <div className="modal fade" id="workoutModal" role="dialog">
                      <div className="modal-dialog modal_login" style={{maxWidth:740}}>
                        <div className="modal-content">
                          <div className="modal-header modal-border">
                            <h4 className="modal-title modal-heading edit-Heading">Workout </h4>
                            <button type="button" className="close fas fa-times" data-dismiss="modal"></button>
                          </div>
                          {this.state.userworkoutdata.map((item,index)=>{
                            return(
                              <div className="img-container" style={{marginTop:20}} key={index}>
                                {(item.url!==null) && (
                                  <div role="button" onClick={()=>{
                                    if(this.state.selectedworkoutdetail!==index){
                                      this.setState({selectedworkoutdetail:index,selectedworkout:item,selectedexercise:0});
                                      setTimeout(() => {
                                        this.getUserRecreationalActivity();
                                      }, 500);
                                    }
                                    else{
                                      this.setState({selectedworkoutdetail:'',selectedworkout:'',selectedexercise:0});
                                      setTimeout(() => {
                                        this.getUserRecreationalActivity();
                                      }, 500);
                                    }
                                  }} style={{cursor:'pointer'}}>
                                    <img className="workout-modal-img" src={global.url+item.url} alt=""/>
                                    <div className="top-right" style={{zIndex:9999}}>
                                      {/* <i data-toggle="modal" data-target="#editModalMealPlan" title="Edit" className="fas fa-pen  img-icon-color "></i> */}
                                      <i className="far fa-trash-alt img-icon-color" title="Delete" onClick={()=>{this.Deleteworkout(item.id,item.userid)}}></i>
                                    </div>
                                    <div className="centered">{item.name}</div>
                                    <div className="centered2" style={{color:'#fff'}}>{item.type}</div>
                                  </div>
                                )}
                                {(item.url===null) && (
                                  <div className="m-0" onClick={()=>{
                                    if(this.state.selectedworkoutdetail!==index){
                                      this.setState({selectedworkoutdetail:index,selectedworkout:item,selectedexercise:0});
                                      setTimeout(() => {
                                        this.getUserRecreationalActivity();
                                      }, 500);
                                    }
                                    else{
                                      this.setState({selectedworkoutdetail:'',selectedworkout:'',selectedexercise:0});
                                      setTimeout(() => {
                                        this.getUserRecreationalActivity();
                                      }, 500);
                                    }
                                  }} style={{cursor:'pointer'}}>
                                    <img className="img-fluid  workout-modal-img" alt=""/>
                                    <div className="top-right" style={{zIndex:9999}}>
                                    <i className="far fa-trash-alt add-workout" title="Delete" onClick={()=>{this.Deleteworkout(item.id,item.userid)}}></i>
                                    </div>
                                    <div className="centered add-workout">{item.name}</div> 
                                    <div className="centered2">Add Workout</div>
                                  </div>
                                )}
                                {(this.state.selectedworkoutdetail===index) && (
                                  <div className="bordar-modal-workout">
                                    <div className="row" >
                                      <ul className="col-md-12" style={{marginBottom:0}}>
                                        {this.state.allworkoutdata.map((item,index)=>{
                                          return(
                                            <>
                                              {(this.state.selectedexercise===index) && (
                                                <li key={index} className="border-style tab-center"> <button className="btn btn-elegant btn-rounded btn-sm my-0 btn-active" onClick={()=>{
                                                  if(index===5){
                                                    this.getUserRecreationalActivity();
                                                  }
                                                  this.setState({selectedexercise:index})}}>{item.name}</button></li>
                                              )}
                                              {(this.state.selectedexercise!==index) && (
                                                <li className="border-style"> <button className="btn btn-elegant btn-rounded btn-sm my-0 tab-style-active" onClick={()=>{
                                                  if(index===5){
                                                    this.getUserRecreationalActivity();
                                                  }
                                                  this.setState({selectedexercise:index})}}>{item.name}</button></li>
                                              )}
                                            </>
                                          )
                                        })}
                                        {/* <li className="border-style"> <button className="btn btn-elegant btn-rounded btn-sm my-0 tab-style-active ">Pull</button></li> */}
                                      </ul>
                                    </div>
                                    <div className="container add-exercise-btn border-top">
                                      <button className=" btn btn-elegant btn-rounded btn-sm my-0 tab-style" onClick={()=>{this.addWorkoutToMyPlan()}} >Add Exercise</button>
                                    </div>
                                    <div> 
                                    <div className="container slider-padd mt-5">
                                      <div id="demo" className="carousel slide" data-ride="carousel">
                                      <div className="carousel-inner no-padding">
                                      {(this.state.allworkoutdata[this.state.selectedexercise].properties!=null) && (
                                      <>
                                      {JSON.parse(this.state.allworkoutdata[this.state.selectedexercise].properties).map((properties,index)=>{
                                        const className = this.state.activeIndex === index ? 'carousel-item active' : 'carousel-item';
                                        return(
                                          <>
                                          {(!properties.url) && (
                                            <div key={index}>
                                              {(properties.description) && (<p style={{color:'#000',textAlign:'left'}}>{properties.name} ({properties.description})</p>)}
                                              {(!properties.description) && (<p style={{color:'#000',textAlign:'left'}}>{properties.name}</p>)}
                                            </div>
                                          )}
                                          {(properties.url) && (
                                            <div className={className} key={index} onClick={this.handleClick.bind(this, index, this.props)}>
                                              <div className="col-xs-12 col-sm-12 col-md-12">
                                                <div href="#" className="slider_info">
                                                  {(properties.url && properties.url[0]!=='h') && (
                                                    <iframe src={"https://player.vimeo.com/video/"+properties.url} title="Workout Viedos">
                                                      <p>Your browser does not support iframes.</p>
                                                    </iframe>
                                                  )}
                                                  {(properties.url && properties.url[0]==='h') && (
                                                    <InstagramEmbed
                                                      url={properties.url}
                                                      maxWidth={300}
                                                      hideCaption={false}
                                                      containerTagName='div'
                                                      protocol=''
                                                      injectScript
                                                    />
                                                  )}
                                                </div> 
                                                {(properties.description) && (
                                                  <p className="text-color-decp mt-3" style={{color:'#000',textAlign:'left'}}>
                                                    {properties.name} ({properties.description})
                                                  </p>
                                                )}
                                                {(!properties.description) && (
                                                  <p className="text-color-decp mt-3" style={{color:'#000',textAlign:'left'}}>
                                                    {properties.name}
                                                  </p>
                                                )}
                                              </div>
                                            </div>
                                           )}
                                          </>
                                        )
                                      })}
                                      </>
                                      )}
                                      {(this.state.allworkoutdata[this.state.selectedexercise].properties===null) && (
                                        <div className="row">
                                          <div className="col-md-12">
                                            <p style={{fontSize:16,fontWeight:600 , color:'#000',textAlign:'left',marginBottom:5}}> Add Activities</p>
                                          </div>
                                          <div className="col-md-12 mb-3 ">
                                            <select className="btn form-control btn-height border-color activities" style={{width:'80%',float:'left'}}
                                            onChange={(event)=>{ this.setState({selectedrecreational:event.target.value})}} 
                                            value={this.state.selectedrecreational}>
                                            {this.state.recreationalactivitydata.map((item,index)=>{
                                              return(
                                                <option value={item.id} key={index}>{item.name}</option>
                                              )
                                            })}
                                            </select>
                                            <button className=" btn btn-elegant btn-rounded btn-sm my-0 tab-style" style={{height:40,width:'18%'}} onClick={()=>{this.addRecreationalActivity()}}>Add</button>
                                          </div>
                                          {(this.state.selectedrecreational==='12') && (
                                            <div className="col-md-12 mb-3 ">
                                              <input onChange={(event)=>{ this.setState({othertext:event.target.value})}}  
                                                type="text" className="form-control" name="other" placeholder='Other'/>
                                            </div>
                                          )}
                                          
                                          <div className="col-md-12">
                                            <p style={{fontSize:16,fontWeight:600 , color:'#000',textAlign:'left',marginBottom:5}}> Added Activities</p>
                                          </div>
                                          <div className="col-md-12">
                                            {this.state.userrecreationalactivitydata.map((item,index)=>{
                                              return(
                                                <p key={index} style={{fontSize:14,fontWeight:400 , color:'#000',textAlign:'left',marginBottom:5}}> 
                                                  {item.recreationalDayName} 
                                                  <i title="Delete" className="fas fa-times-circle btn-fa  wave-icon  float-right" onClick={()=>{this.deleterecreational(item.recreationalMappingId,item.isOther)}}
                                                    style={{border:0,fontSize:20}}>
                                                  </i>
                                                </p>
                                              )
                                            })}
                                            {(this.state.userrecreationalactivitydata.length===0) && (
                                              <p key={index} style={{fontSize:16,fontWeight:500 , color:'#000',textAlign:'center',marginBottom:5}}> 
                                                No Activities Added.
                                              </p>
                                            )}
                                          </div>
                                          
                                        </div>
                                      )}
                                      </div>
                                      {(this.state.allworkoutdata[this.state.selectedexercise].name !== 'LISS EXERCISES' && this.state.allworkoutdata[this.state.selectedexercise].name !== 'RECREATIONAL DAY') && (
                                        <>
                                          <a className="carousel-control-prev" href="#demo" data-slide="prev">
                                            <span className="sp fas fa-chevron-left left-arrow" ></span>
                                          </a>
                                          <a className="carousel-control-next" href="#demo" data-slide="next">
                                            <span className="sp right-arrow fa fa-chevron-right"></span> 
                                          </a>
                                        </>
                                      )}
                                    </div>
                                  </div> 
                                </div>
                                </div>
                                )}
                                

                              </div>
                            )
                          })}
                          
                        
                        <div style={{marginBottom:20,marginTop:20}}>
                          <div className="col-md-6  m-auto ">
                            <button style={{border:0}} onClick={()=>{this.createWorkoutPlan(this.state.selecteduser.currentphase,this.state.selecteduser.userId)}} 
                            className="btn btn-sm my-0 button-style btn-footer">Add Workout</button>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>


                  </div>
        
                  <div className="table table-scroll">
                    <table className="table table-bordered mb-4" style={{backgroundColor:'#f8f8f8'}}>
        
                      <thead>
                        <tr style={{textAlign:'center',color:'black'}}>
                          {/* <th className=" text-truncate" style={{fontWeight:'500'}}>Wave</th> */}
                          <th className=" text-truncate" style={{fontWeight:'500'}}>Phase Number</th>
                          <th className=" text-truncate" style={{fontWeight:'500'}}>Gender</th>
                          <th className=" text-truncate" style={{fontWeight:'500'}}>Premium</th>
                          <th className=" text-truncate" style={{fontWeight:'500'}}>Proteins</th>
                          <th className="text-truncate" style={{fontWeight:'500'}}>Calories</th>
                          <th className="text-truncate" style={{fontWeight: '500',textAlign: 'center'}}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table-width" style={{textAlign:'center',color:'black',fontWeight: '400',}}>
                          {/* <td className="text-truncate">{item.waveName}</td> */}
                          <td className="text-truncate">{item.currentphase}</td>
                          <td className="text-truncate">{this.gendercheck(item.gender)}</td>
                          <td className="text-truncate">{item.ispremium ? 'true': 'false'}</td>
                          <td className="text-truncate">{parseInt(item.proteinstarget)}g</td>
                          <td className="text-truncate">{parseInt(item.caloriestarget)}</td>
                          <td className="pt-2 text-truncate">
                                <span>
                                <i data-toggle="modal" data-target="#editModal" title="Edit" onClick={()=>{this.setState({selectededituser:item,proteins:item.proteinstarget,calories:item.caloriestarget})}}  className="fas fa-pen  wave-icon border-color"></i>
                                <i  className="far fa-trash-alt  wave-icon border-color" title="Delete" onClick={()=>{this.deleteuser(item.id)}}></i>
                                </span>
                            </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                  )         
                })}
              </div>
              <ReactPaginate
                previousLabel={'PRE'}
                nextLabel={'NEXT'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.state.totalpages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(data)=>{
                  console.log(data);
                  this.setState({start:data.selected*10});
                  setTimeout(() => {
                    this.getuserbywave();
                  }, 200);
                }}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
              </div>
        
          {/* <!-- Modal HTML--> */}
            <div className="modal fade" id="addnotes" role="dialog">
              <div className="modal-dialog modal_login">
              {/* <!-- Modal content--> */}
              <div className="modal-content">
                <div className="modal-header modal-border">
                  <h4 className=" modal-title modal-heading ">Josh Notes</h4>
                  <button type="button" className="close fas fa-times" data-dismiss="modal"></button>
                </div>
                <div className="modal-body madal-padd">
                  <div className="form-group">
                    <textarea onChange={e => {this.setState({reviewtxt:e.target.value})}} className="form-control mt-4" placeholder="Josh Notes" rows="3"></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <div >
                    <button style={{border:0}} className="btn btn-sm button-style"  data-dismiss="modal" onClick={()=>{this.addcheckinreview()}}>Add</button>
                  </div>
                </div>
              </div>
            {/* // <!-- Modal HTML Close--> */}
            </div>
          </div>
          {/* <!-- Modal HTML Close--> */}
          {/* <!-- Modal HTML--> */}
          <div className="modal fade" id="editnotes" role="dialog">
              <div className="modal-dialog modal_login">
              {/* <!-- Modal content--> */}
              <div className="modal-content">
                <div className="modal-header modal-border">
                  <h4 className="modal-title modal-heading ">Josh Notes</h4>
                  <button type="button" className="close fas fa-times" data-dismiss="modal"></button>
                </div>
                <div className="modal-body view-motes-modal">
                  <div className="form-group">
                    <textarea style={{height:160}} className="form-control mt-4" onChange={e => {this.setState({reviewtxt:e.target.value})}} placeholder="Josh Notes" rows="3" value={this.state.reviewtxt}></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <div>
                    <button style={{border:0}} className="btn btn-sm button-style"  data-dismiss="modal" onClick={()=>{this.addcheckinreview()}}>Save</button>
                  </div>
                </div>
              </div>
            {/* // <!-- Modal HTML Close--> */}
            </div>
          </div>
          {/* <!-- Modal HTML Close--> */}
          {/* <!-- Modal HTML--> */}
            <div className="modal fade" id="editModal" role="dialog">
                          <div className="modal-dialog modal_login">
                          <form onSubmit={e => { e.preventDefault(); }}>
                        <div className="modal-content">
                          <div className="modal-header modal-border">
                            <h4 className="modal-title modal-heading edit-Heading">Edit User</h4>
                            <button type="button" className="close fas fa-times" data-dismiss="modal"></button>
                          </div>
                          <div className="modal-body madal-padd">
                          
                        <div className="row">
                          <div className="form-group col-md-6">   
                            <label className="edit-modal-user">Phone</label>   
                            <input type="tel" className="form-control field-text p-0" disabled name="name" value={this.state.selectededituser.mobileno}
                                  required="required"/>
                          </div>
                          <div className="form-group col-md-6"> 
                            <label className="edit-modal-user">Email</label>   
                            <input type="text" className="form-control field-text p-0" name="name" disabled value={this.state.selectededituser.email}
                              required="required"/>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">   
                            <label className="edit-modal-user">Password</label>
                            <input type="password" className="form-control field-text p-0" disabled name="name" placeholder="*********"
                              required="required"/>
                          </div>
                          <div className="form-group col-md-6"> 
                            <label className="edit-modal-user">Phase</label>     
                            <input type="number" disabled className="form-control field-text p-0" name="name" placeholder={this.state.selectededituser.currentphase}
                              required="required"/>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">   
                            <label className="edit-modal-user">Week</label> 
                            <input type="number"  disabled className="form-control field-text p-0" name="name" value={Math.ceil(this.state.selectededituser.day/7).toString()}
                              required="required" onChange={e => {this.setState({wavename:e.target.value})}}/>
                          </div>
                          <div className="form-group col-md-6"> 
                            <label className="edit-modal-user">Day</label>                    
                            <input type="number"  disabled className="form-control field-text p-0" name="name" value={this.state.selectededituser.day}
                            required="required" onChange={e => {this.setState({wavename:e.target.value})}}/>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">   
                            <p className="edit-modal-user">Calories *</p>   
                            <input type="number"  min="0" className="form-control field-text p-0" name="name" value={parseInt(this.state.calories)}
                              required="required" onChange={e => {this.setState({calories:e.target.value})}}/>
                          </div>
                          <div className="form-group col-md-6">   
                            <p className="edit-modal-user">Proteins *</p>   
                            <input type="number"  min="0" className="form-control field-text p-0" name="name" value={parseInt(this.state.proteins)}
                              required="required" onChange={e => {this.setState({proteins:e.target.value})}}/>
                          </div>
                        </div>
                        {(this.state.selectededituser.ispremium==1)&&(
                          <div className="row">
                            <div className="form-group col-md-6">   
                              <p className="edit-modal-user float-left w-100">Food Preference</p>   
                              <p type="text" style={{overflow: 'hidden',textOverflow:'ellipsis',wordBreak:'break-word',height:'auto'}} 
                              className="form-control field-text p-0 float-left w-100" >{this.state.selectededituser.foodpreference}</p>
                            </div>
                            <div className="form-group col-md-6">   
                              <p className="edit-modal-user float-left w-100">Workout Preference</p>   
                              <p type="text" style={{overflow: 'hidden',textOverflow:'ellipsis',wordBreak:'break-word',height:'auto'}} 
                              className="form-control field-text p-0 float-left w-100" >{this.state.selectededituser.workoutpreference}</p>
                            </div>
                          </div>
                        )}
                        
                          </div>
                          <div className="modal-footer" style={{textAlign:'center',display:'block'}}>
                            <div >
                              <button style={{border:0}} className="btn btn-sm button-style" onClick={()=>{this.edituser(this.state.selectededituser)}}>Save</button>
                              
                            </div>
                          </div>
                        </div>
                        </form>
                      </div>
                    </div>
          {/* <!-- Modal HTML Close--> */}
          {/* <!-- Modal HTML--> */}
            <div className="modal fade" id="myModal" role="dialog">
              <div className="modal-dialog modal_login">
                {/* <!-- Modal content--> */}
                <form id="createuser" onSubmit={e => { e.preventDefault(); }}>
                <div className="modal-content">
                  <div className="modal-header modal-border">
                    <h4 className="modal-title modal-heading">Create User</h4>
                    <button type="button" className="close fas fa-times" data-dismiss="modal" onClick={()=>{this.setState({firstname:'',lastname:'',email:'',password:'',phone:'',age:'',gender:'',foodpreference:'',workoutpreference:'',accounttype:''})}}></button>
                  </div>
                  <div className="modal-body madal-padd">
                      <div className="form-group" style={{width:'48%',float:'left',marginRight:10}}>
                        <div className="input-group">
                          <input type="text" className="form-control field-text" name="name" placeholder="First Name *"
                            required="required" value={this.state.firstname} onChange={e => {this.setState({firstname:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="form-group" style={{width:'48%',float:'left'}}>
                        <div className="input-group">
                          <input type="text" className="form-control field-text" name="name" placeholder="Last Name *"
                            required="required" value={this.state.lastname} onChange={e => {this.setState({lastname:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="form-group" style={{width:'100%',float:'left'}}>
                        <div className="input-group">
                          <input type="email" className="form-control field-text" name="name" placeholder="Email *"
                            required="required" value={this.state.email} onChange={e => {this.setState({email:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="form-group"  style={{width:'100%',float:'left',marginRight:10}}>
                        <div className="input-group">
                          <input type="password" className="form-control field-text" name="name" placeholder="Password *"
                            required="required" value={this.state.password} onChange={e => {this.setState({password:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="form-group"  style={{width:'100%',float:'left'}}>
                        <div className="input-group">
                          <input type="phone" className="form-control field-text" name="name" placeholder="Phone *"
                            required="required" value={this.state.phone} onChange={e => {this.setState({phone:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="form-group"  style={{width:'48%',float:'left',marginRight:10}}>
                        <div className="input-group">
                          <input type="number" className="form-control field-text" name="name" placeholder="Age *"
                            required="required" value={this.state.age} onChange={e => {this.setState({age:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="form-group"  style={{width:'48%',float:'left'}}>
                        <div className="input-group">
                          <select className="btn form-control btn-height border-color btn-border"
                            onChange={(event)=>{this.setState({gender:event.target.value});}} value={this.state.gender}>
                              <option value="">Select Gender</option>
                              <option value="1">Male</option>
                              <option value="2">Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group"  style={{width:'100%',float:'left'}}>
                        <div className="input-group">
                          <select className="btn form-control btn-height border-color btn-border"
                            onChange={(event)=>{this.setState({accounttype:event.target.value});}} value={this.state.accounttype}>
                              <option value="">Account Type *</option>
                              <option value="3">Free</option>
                              <option value="1">Standard</option>
                              <option value="2">Premium</option>
                          </select>
                        </div>
                      </div>
                      {(this.state.accounttype==2) && (
                        <>
                        <div className="form-group"  style={{width:'48%',float:'left',marginRight:10}}>
                          <div className="input-group">
                            <input type="text" className="form-control field-text" name="name" placeholder="Food Preferences *" 
                            value={this.state.foodpreference} onChange={e => {this.setState({foodpreference:e.target.value})}}/>
                          </div>
                        </div>
                        <div className="form-group"  style={{width:'48%',float:'left'}}>
                          <div className="input-group">
                            <input type="text" className="form-control field-text" name="name" placeholder="Workout Preferences *" 
                            value={this.state.workoutpreference} onChange={e => {this.setState({workoutpreference:e.target.value})}}/>
                          </div>
                        </div>
                        </>
                      )}
                      
                      
                  </div>
                  {/* <!-- Modal HTML Close--> */}
                  <div className="modal-footer">
                    <div className="btn-group-vertical">
                      <button className="btn button-style " 
                       onClick={()=>{ this.adduser()}}>Create User</button>
                    </div>
                  </div>
                </div>
                </form>
              </div>
            </div>
          {/* <!-- Modal HTML--> */}
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
