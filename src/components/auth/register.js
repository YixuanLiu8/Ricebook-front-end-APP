import React, {Component} from 'react'
import { connect } from 'react-redux'
import { changeStatus, updateUsers, newUser } from '../../actions';
import{checkExist} from "../storage/initFetch";

//basic structure for register module
export class Register extends Component{
    state={errMsg:"",name:"",email:"",phone:"",zipcode:"",pw1:"",pw2:"",dob:""}
    constructor (props) {
        super(props);
        this.inputName = this.inputName.bind(this);
        this.inputPw1 = this.inputPw1.bind(this);
        this.inputEmail = this.inputEmail.bind(this);
        this.inputPhone = this.inputPhone.bind(this);
        this.inputZipcode = this.inputZipcode.bind(this);
        this.inputPw2 = this.inputPw2.bind(this);
        this.inputDob = this.inputDob.bind(this);
        this.ValidateInfo = this.ValidateInfo.bind(this);
    }
    inputName(evt){
        this.setState({name:evt.target.value})
    }

    inputPw1(evt){
        this.setState({pw1:evt.target.value})

    }
    inputEmail(evt){
        this.setState({email:evt.target.value})
    }

    inputPhone(evt){
        this.setState({phone:evt.target.value})

    }
    inputZipcode(evt){
        this.setState({zipcode:evt.target.value})
    }

    inputPw2(evt){
        this.setState({pw2:evt.target.value})

    }
    inputDob(evt){
        this.setState({dob:evt.target.value})

    }
    ValidateInfo=()=> {
        //console.log("here")
        if (this.state.name === null || this.state.name === ""
            || this.state.email === null || this.state.email === ""
            || this.state.phone === null || this.state.phone === ""
            ||this.state.zipcode === null || this.state.zipcode === ""
            || this.state.pw1=== null || this.state.pw1 === ""
            || this.state.pw2 === null || this.state.pw2 === ""
            || this.state.dob === null || this.state.dob === "") {
            this.setState({errMsg: "None of the items above could be empty!"});
            //console.log("none")
            return false;
        } else if (this.state.pw1 !== this.state.pw2) {
            this.setState({errMsg: "Two passwords are not match!"});
            return false;
        }
        const saved = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
        let users = this.props.users
        if (users.length === 0) {users = JSON.parse(localStorage.getItem('users'))}
        let obj = {name:this.state.name, zipcode:this.state.zipcode, email:this.state.email, phone: this.state.phone, password: this.state.password, headline: "Me know nothing! Me just a puppy!", dob: this.state.dob, followed: [users[0].name,]}
        if (!checkExist(this, obj)) {localStorage.setItem('currentUser', JSON.stringify(obj));localStorage.setItem('login', true);saved.push(obj);localStorage.setItem("users", JSON.stringify(saved));this.props.newUser(obj);this.props.updateUsers(obj);this.props.changeStatus();
        } else{this.setState({errMsg: "User already exists! Please change your name!"});}
        return false;}
    render()
{return (
        <div>
            <h2>Register</h2>
            <div className="box1">
                <form  onSubmit={(evt) => {evt.preventDefault()}}>
                    Name:
                    <input className="input1" type="text" placeholder="Enter user name here"
                          value={this.state.name} id="Name"onChange={this.inputName}  required/><br/><br/><br/>
                    Email:
                    <input className="input1" type="text" placeholder="xxx@xxx.xxx"
                           value={this.state.email} id="Email" onChange={this.inputEmail} required/><br/><br/><br/>
                    Date of Birth:
                    <input className="input1" type="date" placeholder="YY/MM/DD"
                           value={this.state.dob} id="Birthday" onChange={this.inputDob} required/><br/><br/><br/>
                    Phone:
                    <input className="input1" type="text" placeholder="xxx-xxx-xxxx"
                           value={this.state.phone} id="Phone" onChange={this.inputPhone} required/><br/><br/><br/>
                    Zipcode:
                    <input className="input1" type="text" placeholder="xxxxx"
                           value={this.state.zipcode} id="Zipcode" onChange={this.inputZipcode} required/><br/><br/><br/>
                    Password:
                    <input className="input1" type="password" placeholder="*******"
                           value={this.state.pw1} id="YourPassword" onChange={this.inputPw1}
                           required/><br/><br/><br/>
                    PW Confirm:
                    <input className="input1" type="password" placeholder="*******"
                           value={this.state.pw2} id="PasswordConfirmation" onChange={this.inputPw2}
                           required/><br/><br/><br/>
                    <input id="login" className="btn" type="submit" value="Register"
                           onClick={this.ValidateInfo}
                    />
                    <input className="btn" type="reset" value="Clear"/>
                    <div id="errMsg"className="hint">{this.state.errMsg}</div>
                </form>
            </div>
        </div>
    )
      }
        }
export default connect(
    (state) => {
        return {
            users: state.users,
            isLogin: state.isLogin,
        }
    },
    (dispatch) => {
        return {changeStatus: () => dispatch(changeStatus()), updateUsers: (user) => dispatch(updateUsers(user)), newUser: (user) => dispatch(newUser(user)),}
    }
)(Register)
