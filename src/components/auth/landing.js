import React, {Component} from 'react'
import { connect } from 'react-redux'
import Register from './register'
import Login from './login'
import {initFetch} from "../storage/initFetch";
import{updateUsers,changeStatus,getUsers,getPosts} from "../../actions";

export class Landing extends Component {
    componentDidMount() {
        initFetch(this);
        let login = JSON.parse(window.localStorage.getItem('login'))
        let user = JSON.parse(window.localStorage.getItem('currentUser'))
        if (login && user) {
            this.props.updateUsers(user);
                this.props.changeStatus()
        }
    }
        render()
        {
            return (
                <div>
                    <h1>Start your journey now!</h1>
                    <table className="main">
                        <tbody>
                        <tr>
                            <td>
                                <Login/>
                            </td>
                            <td>
                                <Register/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }
export default connect(
    state=>{
        return{
            isLogin: state.isLogin,
            posts:state.posts
        }
    },
    dispatch =>{
        return{
            updateUsers:(user)=>dispatch(updateUsers(user)) ,
            changeStatus: () => dispatch(changeStatus()),
            getPosts: (posts) => dispatch(getPosts(posts)),
            getUsers: (users) => dispatch(getUsers(users)),
        }

    }

)(Landing)
