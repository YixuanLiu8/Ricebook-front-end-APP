import React, {Component} from 'react'
import { connect } from 'react-redux'
import Myself from './myself'
export class ProfileForm extends Component{
    state={errMsg:"" ,newName:this.props.userInfo.name, newEmail: this.props.userInfo.email,newPhone:this.props.userInfo.phone,newZipcode:this.props.userInfo.zipcode,newDOB:this.props.userInfo.dob}
    ValidateInfo=()=> {
        const {name, email, phone, zipcode, pw1, pw2, dob} = this
        if(name.value===this.props.userInfo.name&&email.value===this.props.userInfo.email&&phone.value===this.props.userInfo.phone&&zipcode.value===this.props.userInfo.zipcode&&dob.value===this.props.userInfo.dob)
        {this.setState({errMsg: "Nothing changed!"});return false}
        else if (pw1.value !== pw2.value) {this.setState({errMsg: "Two passwords are not match!"});return false}
            this.setState({newName:name.value, newEmail:email.value,newPhone:phone.value,newZipcode:zipcode.value,newDOB:dob.value})}
render(){
    return(
        <div className="main">
            <h1>Profile Page</h1>
            <div className="box1">
                <form onSubmit={(evt) => {evt.preventDefault()}}>
                    <Myself/>
                    <div className="profile">
                    <tr>
                        <td>
                    Name:
                    <input className="input1" type="text" placeholder="your user name"
                           ref={(c)=>this.name = c} id="Name" required/>
                    <br/>
                    <br/>
                    <br/>
                    Email:
                    <input className="input1" type="text" placeholder="xxx@xxx.xxx"
                           ref={(c)=>this.email =c} id="Email" required />
                    <br/>
                    <br/>
                    <br/>
                    DoB:
                    <input className="input1" type="date"
                           ref={(c)=>this.dob = c} id="Birthday" required />
                    <br/>
                    <br/>
                    <br/>
                    Phone:
                    <input className="input1" type="text" placeholder="xxx-xxx-xxxx"
                           ref={(c)=>this.phone =c} id="Phone" required/>
                    <br/>
                    <br/>
                    <br/>
                    Zipcode:
                    <input className="input1" type="text" placeholder="xxxxx"
                           ref={(c)=>this.zipcode = c} id="Zipcode" required/>
                    <br/>
                    <br/>
                    <br/>
                    Password:
                    <input className="input1" type="password" ref={(c)=>this.pw1 = c}
                           id="YourPassword" required/><br/>
                    <br/>
                    <br/>
                    PW Confirm:
                    <input className="input1" type="password" ref={(c)=>this.pw2 = c}
                           id="PasswordConfirmation" required/><br/>
                        </td>
                        <td>
                            Name:
                            <div id="name1">
                                {this.state.newName}
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            Email:
                            <div id="email1">
                                {this.state.newEmail}
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            Dob:
                            <div id="dob1">
                                {this.state.newDOB}
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            Phone:
                            <div id="phone1">
                                {this.state.newPhone}
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            Zipcode:
                            <div id="zipcode1">
                                {this.state.newZipcode}
                            </div>
                            <br/>
                            <br/>
                            <br/>
                        </td>
                    </tr>
                        </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <input id="update" className="btn" type="submit" value="Update"
                           onClick={this.ValidateInfo}/>
                    <input className="btn" type="reset" value="Clear"/>
                    <div className="hint">{this.state.errMsg}</div>
                </form>
            </div>
        </div>
    )
}}

// add the changed info in to the state
export default connect(
    (state) => {
        return {
            userInfo:state.userInfo
        }
    }
)(ProfileForm)
