import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/helper';


const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color: '#3ccc4a'}
    }else{
        return {color: '#fff'}
    }
}

const Menu =({history}) => (
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link style={currentTab(history, '/')} 
                    className="nav-link" 
                    to="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link 
                    className="nav-link" 
                    style={currentTab(history, '/cart')}
                    to="/cart">
                    Cart
                </Link>
            </li>
            {/* {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                <Link 
                    style={currentTab(history, '/user/dashboard')} 
                    className="nav-link" to="/user/dashboard">
                    Dashboard
                </Link>
            </li>
            )} */}

           {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                <Link 
                    style={currentTab(history, '/admin/dashboard')} 
                    className="nav-link"
                    to="/admin/dashboard"
                >
                    Admin Dashboard
                </Link>
            </li>
           )}
            
            {!isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                    <Link 
                        style={currentTab(history, '/signup')}
                        className="nav-link" to="/signup">
                        Signup
                    </Link>
                </li>
                <li className="nav-item">
                    <Link 
                        style={currentTab(history, '/signin')} 
                        className="nav-link" to="/signin">
                        Signin
                    </Link>
                </li>
    
                </Fragment>
            )}

            {/* SignOut */}

            {isAuthenticated() && (
                <li className="nav-item">
                    <span
                        style={{}}
                        className="nav-link text-warning"
                        onClick={()=>{
                            signout(()=>{
                                history.push('/')
                            })
                        }}
                    >
                        Signout
                    </span>
                </li>
            )}

        </ul>
    </div>
)

export default withRouter(Menu)
