import React, { Component } from 'react'
import Sidebar from './Sidebar';
import Navi from './Navi';
import axios from 'axios';
import Footer from './Footer';
export default class MealPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('usertoken'),
      usersdata: [],
      search: '',
      classnamesidebar: 'navbar-nav sidebar sidebar-light accordion',
      alerttext: '',
      alertshow: false,
      alertshowsuccess:false,
      createmealname:'',
      recipesdata:[],
      mealsdata:[],
      selectedmeal:'',
      selectedrecipe:"",
      recipedesc:'',
      showrecipedetail:false,
      selectedtype:'all',
      selectedrecipeedit:'',
      selectedtypeupdate:'all',
      searchusers:'',
      addedusers:[]
    };
    if(this.state.token){
      this.getRecipies();
    this.getAllMealPlans();
    }
    else{
      localStorage.clear();
      this.props.history.push('/login');
    }
    
  }


  createmealplan = async () => {
    if(this.state.createmealname.trim()!==''){
      var body = {
        "name": this.state.createmealname.trim()
      }
      axios.post(global.url+'/addMealPlan/', body, {
        headers: {
          "Authorization": this.state.token,
          "Content-Type": "application/json"
        }
      }).then(res => {
          console.log(res.data);
          if(res.data.statusCode===200){
            document.getElementById("createmeal").reset();
            this.setState({createmealname:''});
            this.getAllMealPlans();
            this.setState({ alertshow:false,alertshowsuccess:true,alerttext: res.data.message });
          }
          else{
            this.setState({ alertshow:true,alertshowsuccess:false,alerttext: res.data.message });
          }
      }).catch(error => {
        this.setState({ alertshow:true,alertshowsuccess:false,alerttext: 'Network Error' });
      })
    }
    // else{
    //   this.setState({ alertshow:true,alertshowsuccess:false, alerttext: 'Meal Name is Required' });
    // }
    
  }


  getRecipies = async () => {
    axios.get(global.url+'/getRecipes/', {
      headers: {
        "Authorization": this.state.token,
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log('====================================');
      console.log(res.data);
      console.log('====================================');
      if(res.data.statusCode===200){
        this.setState({recipesdata:res.data.data});
      }
      else{
        this.setState({ alertshow:true,alertshowsuccess:false, alerttext: res.data.message });
      }
    }).catch(err => {
      this.setState({ alertshow:true,alertshowsuccess:false, alerttext: 'Network Error' });
    });
  };


  getAllMealPlans = async () => {
    axios.get(global.url+'/getAllMealPlans/', {
      headers: {
        "Authorization": this.state.token,
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log('====================================');
      console.log(res.data);
      console.log('====================================');
      if(res.data.statusCode===200){
        this.setState({mealsdata:res.data.data});
      }
      else{
        this.setState({ alertshow:true,alertshowsuccess:false, alerttext: res.data.message });
      }
    }).catch(err => {
      this.setState({ alertshow:true,alertshowsuccess:false, alerttext: 'Network Error' });
    });
  };


  addRecipeToPlan = async (recipeid) => {
    var body = {
      "recipeid": recipeid,
      "mealplanid":this.state.selectedmeal.mealplanid
    }
    axios.post(global.url+'/addRecipeToPlan/', body, {
      headers: {
        "Authorization": this.state.token,
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res.data);
      if(res.data.statusCode===200){
        this.getAllMealPlans();
        if(res.data.message!=='Added recipe to meal plan'){
          this.setState({ alertshow:true,alertshowsuccess:false, alerttext: res.data.message });
        }
        else{
          this.setState({ alertshow:false,alertshowsuccess:true, alerttext: res.data.message });
        }
      }
      else{
        this.setState({ alertshow:true,alertshowsuccess:false, alerttext: res.data.message });
      }
    }).catch(err => {
      this.setState({ alertshow:true,alertshowsuccess:false, alerttext: 'Network Error' });
    });
  };


  mealdelete = async (id) => {
    var body = {
      "mealplanid": id
    }
    axios.post(global.url+'/deleteMealPlan/', body, {
      headers: {
        "Authorization": this.state.token,
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log('====================================');
      console.log(res.data);
      console.log('====================================');
      if(res.data.statusCode===200){
        this.getAllMealPlans();
        this.setState({ alertshow:false,alertshowsuccess:true,alerttext: res.data.message });
      }
      else{
        this.setState({ alertshow:true,alertshowsuccess:false, alerttext: res.data.message });
      }
    })
    .catch(err => {
      this.setState({ alertshow:true,alertshowsuccess:false, alerttext: 'Network Error' });
    });
  };


  mealupdate = async () => {
    if (this.state.editmealplanname.trim() !== "") {
      var body = {
        "mealplanid": this.state.selectedmeal.mealplanid,
        "mealplanname": this.state.editmealplanname.trim()
      }
      axios.post(global.url+'/updateMealPlan/', body, {
        headers: {
          "Authorization": this.state.token,
          "Content-Type": "application/json"
        }
      }).then(res => {
        console.log('====================================');
        console.log(res.data);
        console.log('====================================');
        if(res.data.statusCode===200){
          this.getAllMealPlans();
          this.setState({ alertshow:false,alertshowsuccess:true,alerttext: res.data.message });
        }
        else{
          this.setState({ alertshow:true,alertshowsuccess:false, alerttext: res.data.message });
        }
      }).catch(err => {
        this.setState({ alertshow:true,alertshowsuccess:false, alerttext: 'Network Error' });
      });
    } 
  };


  recipedelete = (id) => {
    var body = {
        "mealrecipeid": id
      }
      axios.post(global.url+'/deleteRecipeFromPlan/', body, {
        headers: {
          "Authorization": this.state.token,
          "Content-Type": "application/json"
        }
      }).then(res => {
        console.log(res.data);
        if(res.data.statusCode===200){
          this.getAllMealPlans();
          this.setState({ alertshow:false,alertshowsuccess:true,alerttext: res.data.message });
        }
        else{
          this.setState({ alertshow:true,alertshowsuccess:false, alerttext: res.data.message });
        }
      })
      .catch(err => {
        this.setState({ alertshow:true,alertshowsuccess:false, alerttext: 'Network Error' });
      });
  };

  recipeupdate = (recipe ,selectedrecipeedit) => {
    console.log('====================================');
    console.log(recipe);
    console.log('====================================');
    var body = {
        "mealrecipeid": this.state.selectedrecipeedit.mealrecipeid,
        "recipeid": recipe.recipeid
      }
      axios.post(global.url+'/updateRecipeInPlan/', body, {
        headers: {
          "Authorization": this.state.token,
          "Content-Type": "application/json"
        }
      }).then(res => {
        console.log(res.data);
        if(res.data.statusCode===200){
          this.getAllMealPlans();
          this.setState({ alertshow:false,alertshowsuccess:true,alerttext: res.data.message });
        }
        else{
          this.setState({ alertshow:true,alertshowsuccess:false, alerttext: res.data.message });
        }
      })
      .catch(err => {
        this.setState({ alertshow:true,alertshowsuccess:false, alerttext: 'Network Error' });
      });
  };

  sharemealplan=(id)=>{
    console.log('====================================');
    console.log(this.state.selectedmeal);
    console.log('====================================');
    var body = {
        "mealplanid": this.state.selectedmeal.mealplanid,
        "userSharedWith": id,
        "issuperadmin": true
      }
      axios.post(global.url+'/shareAdminMealPlan/', body, {
        headers: {
          "Authorization": this.state.token,
          "Content-Type": "application/json"
        }
      }).then(res => {
        console.log(res.data);
        if(res.data.statusCode===200){
          document.getElementById("searchusers").reset();
          this.setState({searchusers:'',usersdata:[]});
          this.getAllMealPlans();
          this.setState({ alertshow:false,alertshowsuccess:true,alerttext: res.data.message });
        }
        else{
          this.setState({ alertshow:true,alertshowsuccess:false, alerttext: res.data.message });
        }
      })
      .catch(err => {
        this.setState({ alertshow:true,alertshowsuccess:false, alerttext: 'Network Error' });
      });
  }

  getuserbywave=async(search)=>{
    var body={
      "limit":10,
      "start":0,
      "name":search,
      "waveid":0,
      "mealplanid": this.state.selectedmeal.mealplanid
    }
    axios.post(global.url+'/getUsersForMealPlan/', body ,{headers:{
      "Authorization": this.state.token,
      "Content-Type":"application/json"
    }})
    .then(res => {
        console.log(res.data);
        if(res.data.statusCode===200){
          this.setState({usersdata:res.data.data.users})
        }
    }).catch(error=>{
      this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
    })
  }

  getSharedPlanUsers=(id)=>{
    this.setState({addedusers:[]})
    var body={
      "mealplanid":id,
    }
    axios.post(global.url+'/getSharedPlanUsers/', body ,{headers:{
      "Authorization": this.state.token,
      "Content-Type":"application/json"
    }})
    .then(res => {
        console.log(res.data);
        if(res.data.statusCode===200){
          this.setState({addedusers:res.data.data})
        }
    }).catch(error=>{
      this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
    })
  }
  deleteSharedPlanUser=(id)=>{
    this.setState({addedusers:[]})
    var body={
      "mappingId":id,
    }
    axios.post(global.url+'/deleteSharedPlanUser/', body ,{headers:{
      "Authorization": this.state.token,
      "Content-Type":"application/json"
    }})
    .then(res => {
        console.log(res.data);
        if(res.data.statusCode===200){
          this.getSharedPlanUsers(this.state.selectedmeal.mealplanid);
        }
    }).catch(error=>{
      this.setState({alertshow:true,alertshowsuccess:false,alerttext:'Network Error'});
    })
  }
  togglesidebar = () => {
    if (this.state.classnamesidebar === 'navbar-nav sidebar sidebar-light accordion') {
      this.setState({ classnamesidebar: 'navbar-nav sidebar sidebar-light accordion toggled' })
    }
    else {
      this.setState({ classnamesidebar: 'navbar-nav sidebar sidebar-light accordion' })
    }
  }
  calculateProteinRangeStatusColor=({mealProteins, targetProteins} )=>{
    const parsedTargetProtein= parseInt(targetProteins);
    const parsedMealProtein =  parseInt(mealProteins);
    console.log('target protein', parsedTargetProtein);
    console.log('meal protein', parsedMealProtein);
    let color = null
    if(parsedMealProtein==parsedTargetProtein){
      color = 'lightgreen'
    }
    else if(parsedMealProtein>=parsedTargetProtein && parsedMealProtein<=parsedTargetProtein+50){
        color = 'lightgreen';
    }
    else if(parsedMealProtein<=parsedTargetProtein && parsedMealProtein>=parsedTargetProtein-10){
      color = 'lightgreen'
    }
    else{
      color='red'
    }
    return color
  }
  render() {
    return (
      <div id="wrapper">
        <Sidebar classnamesidebar={this.state.classnamesidebar} itemclass={['nav-item', 'nav-item ', 'nav-item ', 'nav-item active',]} />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">

            {/* nav bar start  */}
            {/* nav bar start  */}
            <nav className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
              <button id="sidebarToggleTop" onClick={() => { this.togglesidebar() }} style={{ borderWidth: 0, borderRadius: 0, backgroundColor:'white' }}
                className="btn-input btn-link rounded-circle mr-3">
                <i className="fa fa-bars" style={{ color: 'black' }}></i>
              </button>
              <Navi/>
            </nav>
            {/* nav bar end  */}
            {/* nav bar end  */}


            <div className="container-fluid meal-plan-create" id="container-wrapper">
              <div className="d-sm-flex align-items-center  mb-2">
                <h1 className="h3 mb-0 text-gray-800 col-md-6 check-in-heading mb-3 responsive" style={{ paddingRight: 0, }}>
                  Meal Plan 
                </h1>
                <div className="col-md-4 mb-3 responsive emplty-div"></div>
                <div className=" col-md-2 mb-3 responsive fileds-tab">
                </div>
                <div className="col-md-4 mb-3 mr-0 responsive fileds-tab" style={{ marginLeft: 0 ,marginRight: 0,padding:0}}>
                  <button data-toggle="modal" data-target="#createModalMealPlan" className="btn button-style "
                    style={{ width: '100%', height: 40,border:0 }} onPress={()=>{
                      document.getElementById("createmeal").reset();
                      this.setState({createmealname:''});}}>Create Meal Plan</button>
                </div>
                
              </div>
            </div>

            <div className="scrollviewcontentmealplan meal-plan-create">
              <div className="row">
                {this.state.mealsdata.map((item,index)=>{
                  return(
                    <div key={index} className="col-md-5 mealplan-box" style={{backgroundColor:'#fff'}}>
                      <div className="row" style={{ padding:10,backgroundColor:'#f6f7fa' }}>
                        <div className="col-md-12">
                          <div className="mealplan-head text-truncate" title={item.mealplanname}>{item.mealplanname}</div>
                          <div style={{ float: "right" }}>
                            <i data-toggle="modal" data-target="#sharemealplan" title="Share" 
                              onClick={()=>{this.setState({selectedmeal:item});
                              document.getElementById("searchusers").reset();
                              this.setState({searchusers:'',usersdata:[]});
                              this.getSharedPlanUsers(item.mealplanid)}} 
                              className="fas fa-share-alt btn-fa  wave-icon border-color mr-2"></i>
                            <i data-toggle="modal" data-target="#addModal" title="Add" onClick={()=>{this.setState({selectedmeal:item})}} className="fas fa-plus btn-fa  wave-icon border-color"></i>
                            <i data-toggle="modal" data-target="#editModalMealPlan" onClick={()=>{this.setState({editmealplanname:item.mealplanname,selectedmeal:item})}}  title="Edit" className="fas fa-pen  wave-icon border-color"></i>
                            <i className="far fa-trash-alt  wave-icon border-color" onClick={()=>{this.mealdelete(item.mealplanid)}} title="Delete" ></i>
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ backgroundColor: 'white' }}>
                        <div className="col-md-12" style={{backgroundColor: '#fff',borderRadius: 10,padding: 20,paddingTop: 10,paddingBottom: 10,}}>
                          <div style={{ width: '50%',textAlign:'center' ,float:'left'}}>
                            <div className="mealplan-calories">
                              <img src='http://admin.fitnessvwork.com/img/calories.png' style={{ width: 20, height: 20 }} alt="Calories" />
                              <p className="calories-point"> Calories: </p>
                              <p className="proteins-point"> {item.calories} </p>
                            </div>
                            
                          </div>
                          <div style={{ width: '50%',textAlign:'center',float:'left' }}>
                            <div className="mealplan-calories">
                              <img src='http://admin.fitnessvwork.com/img/proteins.png' style={{ width: 20, height: 20 }} alt="Proteins"/>
                              <p className="calories-point"> Proteins:  </p>
                              <p className="proteins-point"> {item.proteins}g </p>
                            </div>
                           
                          </div>
                        </div>
                        <div className="row" style={{paddingLeft:16}}>
                        {item.recipes.map((recipesitem,recipesindex)=>{
                          return(
                            
                            <div key={recipesindex} className="col-md-4 inside_mealpanbox " >
                              <div className="img-mealplan" >
                                <img className="meal-plan-order" alt="profile" src={global.url+recipesitem.recipeimage}/>
                                <div className="middle">
                                  <i data-toggle="modal" data-target="#updateModal" onClick={()=>{this.setState({selectedtypeupdate:recipesitem.recipetype,selectedrecipeedit:recipesitem})}} title="Edit" className="fas fa-pen  wave-icon modal-color "></i>
                                  <i className="far fa-trash-alt  wave-icon modal-color" title="Delete" onClick={()=>{this.recipedelete(recipesitem.mealrecipeid)}}  ></i>
                                </div>
                              </div>
                              <span className="name-list-heading"> {recipesitem.recipetype} </span>
                              <br></br>
                              <p className="desp-mealplan"> {recipesitem.recipename} </p>
                            </div>
                            
                            
                          )
                        })}
                        </div>
                        {(item.recipes.length===0) && (
                          <div style={{width:'100%',paddingTop:65}}>
                            <p style={{fontSize:20,fontWeight:'600',textAlign:'center',justifyContent:'center',color:'#000'}}>No recipes added.</p>
                          </div>
                        )}
                        
                      </div>
                    </div>
                  )
                })}
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






        {/* Modal  */}
        {/* Modal  */}
        {/* Modal  */}
        <div className="modal fade" id="addModal" role="dialog">
          <div className="modal-dialog modal_login" style={{maxWidth:700}}>
            <div className="modal-content">
              <div className="modal-header modal-border">
                <h4 className="modal-title modal-heading edit-Heading">Meal Plans</h4>
                <button type="button" className="close fas fa-times" data-dismiss="modal"></button>
              </div>
              <div className=" float-left" style={{padding:23,paddingBottom:7}}>
              <div className="col-md-12 float-left" style={{marginBottom:20}}>
                <div className="col-md-12 responsive " style={{paddingLeft:0,paddingRight:16}}>
                  <select className="btn form-control btn-height border-color searchmealplannamee"
                  onChange={(event)=>{this.setState({selectedtype:event.target.value})}}
                  value={this.state.selectedtype}>
                    <option value="all">All</option>
                    <option value="BREAKFAST">Breakfast</option>
                    <option value="LUNCH">Lunch</option>
                    <option value="DINNER">Dinner</option>
                    <option value="SNACK">Snack</option>
                    <option value="EATOUT">Eatout</option>
                  </select>
                </div>
              </div>
              <div className="mealplansdivouter">
                {this.state.recipesdata.map((item,index)=>{
                  return(
                    <div key={index}>
                    {(this.state.selectedtype==='all' || this.state.selectedtype===item.recipetype) && (
                      <div key={index} className="col-md-4 float-left" style={{paddingLeft:14,marginBottom:10,cursor:'pointer',}} onClick={()=>{this.setState({recipedesc:item,showrecipedetail:true})}}>
                        <img className="meal-plan-img-modal" alt="profile" src={global.url+item.recipeimage} />
                        <div className="content">
                          <p className="text-center recipesptag">{item.recipename}</p>
                        </div>
                      </div>
                    )}
                    </div>
                  )
                })}
              </div>

              {(this.state.showrecipedetail===true) && (
              <div style={{position:'absolute',top:0,bottom:0,left:0,right:0,background: '#0000008c'}}>
                <div className="speech-bubble">
                  <div>
                    <span className="heading-description">{this.state.recipedesc.recipename}</span>
                    <button type="button" onClick={()=>{this.setState({showrecipedetail:false})}} className="close">&times;</button>
                  </div>
                  <div className="row">
                    <div className="col-md-8 pl-0">
                    <div className="heading-description col-md-8 mt-2 pl-0">Nutrition :</div>
                    <div className="col-md-7 pl-0">Carbohydrates : {this.state.recipedesc.recipecarbs}gm</div>
                    <div className="col-md-7 pl-0 ">Proteins : {this.state.recipedesc.recipeproteins}gm</div>
                    <div className="col-md-7 pl-0 ">Calories : {this.state.recipedesc.recipecalories}gm</div>
                    </div>
                    <div className="col-md-4 pt-4">
                      <button className="btn btn-elegant btn-rounded btn-sm my-0 mealplan-btn" data-dismiss="modal" onClick={()=>{this.setState({showrecipedetail:false}) ;this.addRecipeToPlan(this.state.recipedesc.recipeid)}}  style={{ width: '100%', height: 40 }}>Add to Meal Plan</button>
                    </div>
                  </div>
                  <div className="row pl-3 pr-3">
                    <div className="col-md-12 heading-description mt-2 pl-0">Ingredients :</div>
                    <ul className="description-list">
                      {this.state.recipedesc.ingredients.map((ingredientsitem,index)=>{
                        return(
                          <li key={index}> {ingredientsitem.ingredientname} ({ingredientsitem.ingredientqty} {ingredientsitem.ingredientunit})</li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              
              )}
              </div>
            </div>
          </div>
        </div>
        {/* Modal  */}
        {/* Modal  */}
        {/* Modal  */}




        {/* update Modal  */}
        {/* update Modal  */}
        {/* update Modal  */}
        <div className="modal fade" id="updateModal" role="dialog">
          <div className="modal-dialog modal_login" style={{maxWidth:700}}>
            <div className="modal-content">
              <div className="modal-header modal-border">
                <h4 className="modal-title modal-heading edit-Heading">Meal Plans</h4>
                <button type="button" className="close fas fa-times" data-dismiss="modal"></button>
              </div>
              <div className="float-left" style={{padding:23,paddingBottom:7,minHeight:500,maxHeight:500,overflow:'auto'}}>
              {this.state.recipesdata.map((item,index)=>{
                return(
                  <div key={index}>
                  {(this.state.selectedtypeupdate===item.recipetype) && (
                    <div key={index} className="col-md-4 float-left" style={{paddingLeft:14,marginBottom:10,cursor:'pointer',}} onClick={()=>{this.setState({recipedesc:item,showrecipedetail:true})}}>
                      <img className="meal-plan-img-modal" alt="profile" src={global.url+item.recipeimage} />
                      <div className="content">
                        <p className="text-center recipesptag">{item.recipename}</p>
                      </div>
                    </div>
                  )}
                  
                  </div>
                )
              })}


              {(this.state.showrecipedetail===true) && (
              <div style={{position:'absolute',top:0,bottom:0,left:0,right:0,background: '#0000008c'}}>
              <div className="speech-bubble">
                <div>
                  <span className="heading-description">{this.state.recipedesc.recipename}</span>
                  <button type="button" onClick={()=>{this.setState({showrecipedetail:false})}} className="close">&times;</button>
                </div>
                <div className="row">
                  <div className="col-md-8 pl-0">
                  <div className="heading-description col-md-8 mt-2 pl-0">Nutrition :</div>
                  <div className="col-md-7 pl-0">Carbohydrates : {this.state.recipedesc.recipecarbs}gm</div>
                  <div className="col-md-7 pl-0 ">Proteins : {this.state.recipedesc.recipeproteins}gm</div>
                  <div className="col-md-7 pl-0 ">Calories : {this.state.recipedesc.recipecalories}gm</div>
                  </div>
                  <div className="col-md-4 pt-4">
                    <button className="btn btn-elegant btn-rounded btn-sm my-0 mealplan-btn" data-dismiss="modal" onClick={()=>{this.setState({showrecipedetail:false}) ;this.recipeupdate(this.state.recipedesc)}}  style={{ width: '100%', height: 40 }}>Add to Meal Plan</button>
                  </div>
                </div>
                <div className="row pl-3 pr-3">
                  <div className="col-md-12 heading-description mt-2 pl-0">Ingredients :</div>
                  <ul className="description-list">
                    {this.state.recipedesc.ingredients.map((ingredientsitem,index)=>{
                      return(
                        <li key={index}> {ingredientsitem.ingredientname} ({ingredientsitem.ingredientqty} {ingredientsitem.ingredientunit})</li>
                      )
                    })}
                  </ul>
                </div>
              </div>
              </div>
              )}
              </div>
            </div>
          </div>
        </div>
        {/* update Modal  */}
        {/* update Modal  */}
        {/* update Modal  */}


        {/* add modal  */}
        {/* add modal  */}
        {/* add modal  */}
        <div className="modal fade" id="editModalMealPlan" role="dialog">
          <div className="modal-dialog modal_login">
            <div className="modal-content">
              <div className="modal-header modal-border">
                <h4 className="modal-title modal-heading edit-Heading">Edit Meal Plan </h4>
                <button type="button" className="close fas fa-times" data-dismiss="modal"></button>
              </div>
              <form onSubmit={e=>{e.preventDefault()}}>
              <div className="row" style={{padding:33}}>
                <div className="form-group col-md-12">   
                  <label className="edit-modal-user">Meal Plan Name * </label>
                  <div>    
                    <input onChange={e => { this.setState({ editmealplanname: e.target.value }) }} value={this.state.editmealplanname} 
                    type="text" className="form-control field-text p-0" name="name" placeholder="Name" required/>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div>
                  <button style={{border:0}} onClick={()=>{this.mealupdate()}} data-dismiss="modal" className="btn button-style">Save</button>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
        {/* add modal  */}
        {/* add modal  */}
        {/* add modal  */}

        {/* share modal  */}
        {/* share modal  */}
        {/* share modal  */}
        <div className="modal fade" id="sharemealplan" role="dialog">
          <div className="modal-dialog modal_login">
            <div className="modal-content">
              <div className="modal-header modal-border">
                <h4 className="modal-title modal-heading edit-Heading">Share Meal Plan </h4>
                <button type="button" className="close fas fa-times" data-dismiss="modal"></button>
              </div>
              <div className="row" style={{padding:20}}>
              <form id="searchusers" className="w-100">
                <div className="input-group mb-2 col-md-12">
                    <input style={{ textAlign: 'inherit' }} type="text" className="btn-input form-control btn-height border-color btn-border"
                      placeholder="Search" onClear={e => {this.setState({usersdata:[]})}} onChange={e => { this.getuserbywave(e.target.value)}} />
                </div>
                </form>
                <div className="col-md-12 userdatalist">
                  {this.state.usersdata.map((item,index)=>{
                    return(
                      <div key={index} style={{borderWidth:1,borderBottomColor:'grey',borderBottomStyle:'solid',paddingBottom:5,marginBottom:10}}>
                      <p style={{marginBottom:0}} >{item.fullname} ({item.email}) <i title="Add" onClick={()=>{this.sharemealplan(item.userId)}} className="fas fa-plus btn-fa border-color  wave-icon float-right " data-dismiss="modal" style={{marginTop:5}}></i></p>
                      <p style={{marginBottom:0,marginTop:0}}>
                        <strong>Calories : </strong> 
                        <span style={{color: (item.userMealPlan[0].calories == parseInt(item.caloriestarget))
                                  ? "lightgreen":(item.userMealPlan[0].calories >= parseInt(item.caloriestarget) &&
                                  item.userMealPlan[0].calories-100 <= parseInt(item.caloriestarget)) 
                                    ?'lightgreen':
                                    (item.userMealPlan[0].calories <= parseInt(item.caloriestarget) &&
                                    item.userMealPlan[0].calories+100 >= parseInt(item.caloriestarget))?'lightgreen'
                                  : "red"
                        }}>
                          <strong>{item.userMealPlan[0].calories}</strong>
                        </span>/{item.caloriestarget} 
                        <strong> Proteins : </strong> 
                        <span style={{color: this.calculateProteinRangeStatusColor({targetProteins: item.proteinstarget, mealProteins: item.userMealPlan[0].proteins} )}}>
                        <strong>{item.userMealPlan[0].proteins}</strong>
                        </span>/{item.proteinstarget}</p>
                    </div>
                    )
                  })}
                  
                </div>
                <div className="form-group col-md-12">   
                  <label className="edit-modal-user" style={{fontSize:20,paddingBottom:20}}>Users </label>
                  <div className="float-left w-100" style={{maxHeight:150,overflow:'auto'}}>   
                  {this.state.addedusers.map((item,index)=>{
                    return(
                      <div key={index} style={{borderWidth:1,borderBottomColor:'grey',borderBottomStyle:'solid',paddingBottom:5,marginBottom:10}}>
                        <p style={{marginBottom:0}} >{item.fullname} ({item.email}) <i title="Delete" className="fas fa-times-circle btn-fa  wave-icon  float-right " style={{border:0 , fontSize:20}} onClick={()=>{this.deleteSharedPlanUser(item.mappingId)}}></i></p>
                        <p style={{marginBottom:0,marginTop:0}}>
                        <strong>Calories : </strong> 
                        <span style={{color: (item.userMealPlan[0].calories == parseInt(item.caloriestarget))
                                  ? "lightgreen":(item.userMealPlan[0].calories >= parseInt(item.caloriestarget) &&
                                  item.userMealPlan[0].calories-100 <= parseInt(item.caloriestarget)) 
                                    ?'lightgreen':
                                    (item.userMealPlan[0].calories <= parseInt(item.caloriestarget) &&
                                    item.userMealPlan[0].calories+100 >= parseInt(item.caloriestarget))?'lightgreen'
                                  : "red"
                        }}>
                          <strong>{item.userMealPlan[0].calories}</strong>
                        </span>/{item.caloriestarget} 
                        <strong> Proteins : </strong> 
                        <span style={{color: this.calculateProteinRangeStatusColor({targetProteins: item.proteinstarget, mealProteins: item.userMealPlan[0].proteins} )
                        }}>
                        <strong>{item.userMealPlan[0].proteins}</strong>
                        </span>/{item.proteinstarget}</p>
                      </div>
                    )
                  })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* share modal  */}
        {/* share modal  */}
        {/* share modal  */}


        {/* create meal plan  */}
        {/* create meal plan  */}
        {/* create meal plan  */}
        <div className="modal fade" id="createModalMealPlan" role="dialog">
          <div className="modal-dialog modal_login">
            <div className="modal-content">
              <div className="modal-header modal-border">
                <h4 className=" modal-title modal-heading edit-Heading">Create Meal Plan </h4>
                <button type="button" className="close fas fa-times" data-dismiss="modal" onPress={()=>{
                      document.getElementById("createmeal").reset();
                      this.setState({createmealname:''});}}></button>
              </div>
              <form id="createmeal" onSubmit={e => { e.preventDefault(); }}>  
                <div className="row" style={{padding:33}}>
                  <div className="form-group col-md-12">   
                    <label className="edit-modal-user">Meal Plan Name *</label>
                    <div>  
                      <input type="text" onChange={e => { this.setState({ createmealname: e.target.value }) }} 
                      onClear={e =>{this.setState({ createmealname: '' })}} className="form-control field-text p-0" name="name" placeholder="Name"
                      required/>
                    </div>
                  </div>
                </div>
                <div className="modal-footer" >
                  <div>
                    <button style={{border:0}} onClick={() => this.createmealplan()} className="btn button-style">Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* create meal plan  */}
        {/* create meal plan  */}
        {/* create meal plan  */}
        </div>

      </div>
    )
  }
}
