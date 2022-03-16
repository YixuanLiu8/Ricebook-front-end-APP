import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import {changeStatus} from "../../actions";
//basic structure of the nav bar
export class Navigation extends Component {
    Logout=()=> {
        localStorage.removeItem('currentUser');
        localStorage.setItem('login', false);
        this.props.changeStatus();
    }
    render() {
        return (
            <div className="navbar">
                <tr>
                    <td>
                        <div className="btn1">
                            <Link to={'/profile'} style={{color: 'black'}}>Edit Profile</Link>
                        </div>
                    </td>
                    <h1>Hi</h1>
                    <td>
                        <div id="logout" className="btn1" onClick={this.Logout}>
                            <Link to={'/landing'} style={{color: 'black'}}>log out</Link>
                        </div>
                    </td>
                </tr>
            </div>
        )
    }
}
export default connect(
    (state) => {
        return {
            user: state.user,
            isLogin:state.isLogin,
        }
    },
    (dispatch) => {
        return {
            changeStatus: () => dispatch(changeStatus()),
        }
    }
)(Navigation)
