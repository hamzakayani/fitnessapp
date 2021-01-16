import React, { Component } from 'react'
import Sidebar from './Sidebar';
import Navi from './Navi';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Footer from './Footer';
export default class Checkins extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      token:localStorage.getItem('usertoken'),
      checkindata:[],
      wavedata:[],
      search:'',
      dropdownwavedata:[],
      selectedwave:'all',
      selectedfilter:'all',
      classnamesidebar:'navbar-nav sidebar sidebar-light accordion',
      selectedcheckindata:[],
      selectedwaveparam:[],
      isChecked:1,
      reviewtxt:'',
      alertshow:false,
      alertshowsuccess:false,
      alerttext:'',
      totalpages:0,
      start:0
    };
    if(this.state.token){
      this.getcheckin();
    }
    else{
      localStorage.clear();
      this.props.history.push('/login');
    }
    
  }
getcheckin(){
  var body={
    "limit":10,
    "start":this.state.start,
    "searchParams": this.state.selectedwave,
    "userName": this.state.search,
    "filterParams":this.state.selectedfilter
  }
  axios.post(global.url+'/getCheckInData/', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        if(res.data.data.length!==0){
          this.setState({checkindata:res.data.data.users,totalpages:res.data.data.totalPages})
        }
      }
      else{
        if(res.data.message==='Invalid token. Please login.'){
          localStorage.clear();
          this.props.history.push('/login');
        }
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
trainweek=(trainweek)=>{
  if(trainweek==='1'){
      return 'Amazing';
  }
  if(trainweek==='2'){
      return 'Good';
  }
  if(trainweek==='3'){
      return 'Hmm ok';
  }
  if(trainweek==='4'){
      return 'Awful';
  }
}
addcheckinreview=(item)=>{
  var body={
    // "phase":item.phase,
    "review":item.review,
    "reviewFor":this.state.selectedcheckindata.userid,
    "checkInId":item.checkinid,
    "reviewId":item.reviewId
  }
  axios.post(global.url+'/addCheckInReview/', body ,{headers:{
    "Authorization": this.state.token,
    "Content-Type":"application/json"
  }})
  .then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.getcheckin();
        this.setState({alertshow:false,alertshowsuccess:true,alerttext:res.data.message});
      }
  }).catch(error=>{
    this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
  })
}
    render() {
        return (
            <div id="wrapper">
            <Sidebar classnamesidebar={this.state.classnamesidebar} itemclass={['nav-item','nav-item active','nav-item ','nav-item ' ]}/>
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
                    <h1 className="h3 mb-0 text-gray-800 col-md-5 check-in-heading mb-3 responsive" style={{paddingRight: 0,}}>
                      Check Ins
                    </h1>
                    <div className="col-md-2 mb-3 responsive fileds-tab" >
                    {/* <select className="btn form-control btn-height border-color btn-border"
                      onChange={(event)=>{this.setState({selectedwave:event.target.value});
                      setTimeout(() => { this.getcheckin()}, 500)}} value={this.state.selectedwave}>
                        <option value="all">All Waves</option>
                        <option value="live">Live Waves</option>
                        <option value="past">Past Waves</option>
                      </select> */}
                    </div>
                    <div className="col-md-2 mb-3 responsive fileds-tab" >
                    <select className="btn form-control btn-height border-color btn-border"
                      onChange={(event)=>{this.setState({selectedfilter:event.target.value});
                      setTimeout(() => { this.getcheckin()}, 500)}} value={this.state.selectedfilter}>
                        <option value="all">All</option>
                        <option value="outstanding">Outstanding</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    
                    <div className=" col-md-2 mb-3 responsive fileds-tab">
                      <form>
                      <div className="input-group">
                        <input style={{textAlign:'inherit'}} type="text" className="btn-input form-control btn-height border-color btn-border"
                          placeholder="Search"  onChange={e => {this.setState({search:e.target.value})}}/>
                        <div className="input-group-append">
                          <button style={{borderWidth:0}} className="btn btn-secondary btn-border" type="submit" onClick={e => {e.preventDefault(); this.getcheckin()}} >
                            <i className="fa fa-search" ></i>
                          </button>
                        </div>
                      </div>
                      </form>
                    </div>

                  </div>
                </div>
                <div className='scrollviewcontent'>
                {this.state.checkindata.map((item,index) => {
                  return(
                    <div className="row ml-4 mr-4 mb-4 table-content" key={index}>
                      <div className="col-md-12 table-img" style={{textTransform:'capitalize'}}>
                        <img alt="profile" className="img-profile rounded-circle mr-2 ml-3" src= {global.url+item.image.replace('/public', '')}
                          style={{objectFit:'cover',float:'left'}} />
                         <div className="text-truncate col-md-5 pt-2 pl-0" style={{float:'left',cursor:'pointer'}} title={item.fname + ' ' +  item.lname}>   {item.fname} {item.lname} </div>
                          <div className="float-right pt-2">
                          <button style={{border:0}} className="btn btn-sm button-style" 
                          data-toggle="modal"
                          data-target="#myModal" onClick={()=>{this.setState({selectedcheckindata:item})}}>View</button>
                          </div>
                      </div>
                      
            
                      <div className="col-md-12 table-scroll">
                        <table className="table table-bordered mb-4" style={{backgroundColor:'#f8f8f8'}}>
                          <thead>
                            <tr style={{textAlign:'center',color:'black'}}>
                              {/* <th className="table-width text-truncate" style={{fontWeight:'500'}}>Wave</th> */}
                              <th className="table-width text-truncate" style={{fontWeight:'500'}}>Phase Number</th>
                              <th className="table-width text-truncate" style={{fontWeight:'500'}}>Gender</th>
                              <th className="table-width text-truncate" style={{fontWeight:'500'}}>Proteins</th>
                              <th className="table-width text-truncate" style={{fontWeight:'500'}}>Calories</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="table-width" style={{textAlign:'center',color:'black',fontWeight: '400',}}>
                              {/* <td className="text-truncate">{item.wavename}</td> */}
                              <td className="text-truncate">{item.currentphase}</td>
                              <td className="text-truncate">{this.gendercheck(item.gender)}</td>
                              <td className="text-truncate">{parseInt(item.proteinstarget)}g</td>
                              <td className="text-truncate">{parseInt(item.caloriestarget)}</td>
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
                    this.getcheckin();
                  }, 200);
                }}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
              </div>
{/* model */}
{/* model */}
{/* model */}
{/* model */}
<div className="modal fade" id="myModal" role="dialog">
  <div className="modal-dialog checkin">
    <div className="modal-content">
      <div className="modal-header modal-border">
        <h4 className="modal-title modal-heading">Check In Details</h4>
        <button type="button" className="close fas fa-times" data-dismiss="modal"></button>
      </div>
      
                        
      <div className="modal-body madal-padd-checkin">
        <form>
          <div className="warpper">
            {(this.state.selectedcheckindata.length!==0) && (
              <>
              {this.state.selectedcheckindata.checkIn.map((item,index)=>{
                return(
                  <input className="radio" id={'checkin'+(index+1)} name="group" type="radio" key={index} defaultChecked={this.state.isChecked===index+1}/>
                )
              })}
              </>
            )}
            
            <div className="tabs">
            {(this.state.selectedcheckindata.length!==0) && (
            <>
            {this.state.selectedcheckindata.checkIn.map((item,index)=>{
              return(
                <label className="tab" id={'tab'+(index+1)} htmlFor={'checkin'+(index+1)}  key={index} onClick={()=>{
                  this.setState({isChecked:index+1})
                }}>CheckIn-{index+1}</label>
              )
            })}
            </>
            )}
            </div>
            {/* <nav style={{padding:16}}>
              <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
              {(this.state.selectedcheckindata.length!==0) && (
                <>
                  {this.state.selectedcheckindata.checkIn.map((item,index)=>{
                    return(
                      <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Check In {index+1}</a>
                    )
                  })}
                </>
              )}
              </div>
            </nav> */}
            <div className="panels checkin ">
            {(this.state.selectedcheckindata.length!==0) && (
            <>
            {this.state.selectedcheckindata.checkIn.map((item,index)=>{
              return(
                <div className="panel modal-field row " id={'panel'+(index+1)} key={index}>
                  <div className="col-md-9 p-2 m-0 float-left modal-bottom">
                    <div className="row margin-b">
                      <div className="col-md-6 col-sm-6">
                        <label className="lbl">Last Week Weight:</label>
                        <br></br>
                        <label className="lbl label-border col-md-12">{item.lastweekweight} kg</label>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <label className="lbl">Weight Now:</label>
                        <br></br>
                        <label className="lbl label-border col-md-12">{item.weightnow} kg</label>
                      </div>
                    </div>
                    <div className="row margin-b">
                      <div className="col-md-12 col-sm-6">
                        <label className="lbl">How many times did you train this week?</label>
                        <br></br>
                        {(item.trainfrequency===1) && (
                        <label className="lbl label-border col-md-12">{item.trainfrequency} Time</label>
                        )}
                        {(item.trainfrequency!==1) && (
                        <label className="lbl label-border col-md-12">{item.trainfrequency} Times</label>
                        )}
                      </div>
                    </div>
                    <div className="row margin-b">
                      <div className="col-md-12 col-sm-6">
                        <label className="lbl">How you train this week?</label>
                        <br></br>
                        <label className="lbl label-border col-md-12">{this.trainweek(item.trainthisweek)}</label>
                      </div>
                    </div>
                    <div className="row margin-b">
                      <div className="col-md-12 col-sm-6">
                        <label className="lbl">Which box best describes your diet this week?</label>
                        <br></br>
                        <label className="lbl label-border col-md-12">{item.food}</label>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-md-12 col-sm-6">
                        <label className="lbl">How was your week generally (Only for premium)</label>
                        <div className="form-group">
                          <input className="form-control mt-2" disabled  value={item.describetraining} style={{height:44,backgroundColor:'white'}}></input>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 col-sm-6">
                        <label className="lbl">Review</label>
                        <div className="form-group">
                          <textarea onChange={e => {item.review=e.target.value;this.setState({reviewtxt:''})}} className="form-control mt-2"  placeholder="Review..." value={item.review}></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="row margin-b">
                    <div className="col-md-12 review-btn">
                      <button className="btn btn-elegant btn-rounded btn-sm my-0 button-style btn-footer" 
                      data-dismiss="modal" onClick={()=>{this.addcheckinreview(item)}}>
                        Send Review
                      </button>
                    </div>
                    </div> 
                  </div> 
                  <div className="col-md-3 p-2 m-0 float-left imagescheckin">
                    <div className="" style={{padding:0,textAlign:'center'}}>
                      <p>Front Image</p> 
                      {(item.frontimage!=null) && (
                        <img src={ global.url+item.frontimage} alt="Front" style={{width:'100%',height:110,objectFit:'cover'}}/>
                      )}
                      {(item.frontimage==null) && (
                        <img  src="http://admin.fitnessvwork.com/img/joshimage.jpg" alt="Front"  style={{width:'100%',height:110,objectFit:'cover'}}/>  
                      )}
                    </div>
                    <div className="" style={{padding:3,textAlign:'center'}}>
                    <p>Back Image</p>
                      {(item.backimage!=null) && (
                        <img src={global.url+item.backimage} alt="Back" style={{width:'100%',height:110,objectFit:'cover'}}/>
                      )}
                      {(item.backimage==null) && (
                        <img  src="http://admin.fitnessvwork.com/img/joshimage.jpg" alt="Back"  style={{width:'100%',height:110,objectFit:'cover'}}/>  
                      )}
                    </div>
                    <div className="" style={{padding:3,textAlign:'center'}}>
                    <p>Side Image</p>
                      {(item.sideimage!=null) && (
                        <img src={global.url+item.sideimage}  alt="Side"  style={{width:'100%',height:110,objectFit:'cover'}}/>  
                      )}
                      {(item.sideimage==null) && (
                        <img  src="http://admin.fitnessvwork.com/img/joshimage.jpg" alt="Side"  style={{width:'100%',height:110,objectFit:'cover'}}/>  
                      )}
                    </div>
                  </div>
                </div>  
              )
            })}
            </>
            )}
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
{/* model */}
{/* model */}
{/* model */}
{/* model */}
{/* model */}
{/* model */}

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
