import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateUsers,changeStatus} from '../../actions'

export class Login extends Component {
    state={errMsg:'',username:"",password:""}
    constructor (props) {
        super(props);
        this.inputName = this.inputName.bind(this);
        this.inputPassword = this.inputPassword.bind(this);
    }
    Validate = () => {
        //const {username, password} = this
        if (this.state.username === '' || this.state.password === '') {
            this.setState({errMsg: 'Enter your name and password here!'})
        } else if (this.state.username !== "" && this.state.username !== null && this.state.password!== "" && this.state.username !== null) {
            for (let i = 0; i < this.props.users.length; i++) {
                if (this.props.users[i].password === this.state.password && this.props.users[i].name === this.state.username) {

                    localStorage.setItem('currentUser', JSON.stringify(this.props.users[i]));
                    localStorage.setItem('login', true);
                    this.props.changeStatus();
                    this.props.updateUsers(this.props.users[i]);
                }
            }
            this.setState({errMsg: "User not found! Please register first!"});
        }
    }
    inputName(evt){
        this.setState({username:evt.target.value})
    }

    inputPassword(evt){
        this.setState({password:evt.target.value})

    }
    render() {
        return (
            <div>
                <h2>Log In</h2>
                <br/>
                <div className="box1">
                    <form onSubmit={(evt) => {evt.preventDefault()}}>
                        User Name:
                        <input className="hint" type="text" placeholder="Enter user name here"
                               value={this.state.username} onChange={this.inputName} id="Name"/>
                        <br/><br/>
                        Password:
                        <input className="hint" type="password"
                               value={this.state.password}  onChange={this.inputPassword} id="YourPassword"/>
                        <br/>
                        <span className="hint1" id='Pswalert'></span>
                        <br/>
                        <br/>
                        <input id="login" className="btn" type="submit" value="Login"
                               onClick={this.Validate}/>
                        <input className="btn" type="reset" value="Clear"/>
                        <div id="errMsg" className="hint">{this.state.errMsg}</div>
                    </form>
                </div>
            </div>
        )

    }
}
export default connect(
    (state)=> {
        return {
            isLogin:state.isLogin,
            users: state.users,
            posts: state.posts,
        }
    },
    (dispatch) => {
        return {
            updateUsers:(user)=>dispatch(updateUsers(user)),
            changeStatus:()=>dispatch(changeStatus())
        }
    }
)(Login)
