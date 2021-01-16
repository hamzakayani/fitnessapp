import React, { Component } from 'react'
import { Link } from "react-router-dom";
export default class Navi extends Component {
    render() {
        return (
            <>
            <ul className="navbar-nav ml-auto">
            <li style={{cursor:'pointer'}} className="nav-item dropdown no-arrow">
                <div style={{color:'black'}} className=" dropdown-toggle" id="userDropdown" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img alt="profile" className="img-profile rounded-circle" src="http://admin.fitnessvwork.com/img/joshimage.jpg" style={{maxWidth:60,objectFit:'cover',width:37,height:37}}/>
                </div>
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <Link to='/changepassword'>
                <div style={{paddingLeft:13}} className="dropdown-item" >
                    <i className="fas fa-key fa-sm fa-fw mr-2 text-gray-400"></i>
                    Change Password
                </div>
                </Link>
                <Link to='/login' onClick={()=>{ localStorage.clear(); }}>
                <div style={{paddingLeft:13}} className="dropdown-item">
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                </div>
                </Link>
                
                </div>
            </li>
            </ul>

            
            
            {/* <!-- Modal HTML--> */}
            <div className="modal fade" id="changepswd" role="dialog">
            <div className="modal-dialog modal_login">
              <div className="modal-content">
                <div className="modal-header modal-border">
                  <h4 className="modal-title modal-heading edit-Heading">Edit Wave</h4>
                  <button type="button" className="close fas fa-times" data-dismiss="modal"></button>
                </div>
                <div className="modal-body madal-padd">
                  <form id="editusers" >
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon mt-2"><i className="fa fa-user wave-icon pt-2"></i></span>
                        <input type="number" className="form-control field-text" name="username"
                          placeholder="Number of Users *" required="required" 
                          />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer" style={{textAlign:'center',display:'block'}}>
                  <div className="col-md-6 mb-3 m-auto responsive">
                    <button data-dismiss="modal" className="btn btn-elegant btn-rounded btn-sm my-0 button-style btn-footer">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Modal HTML Close--> */}
          </>
        )
    }
}
