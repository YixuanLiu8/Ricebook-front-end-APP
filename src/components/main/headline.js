import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateHeadline } from '../../actions'

export class Headline extends Component {
    state={headline:""}
    updateNewHeadline=()=>{
        const{newHeadline}=this
        this.setState({headline:newHeadline.value})
        this.props.updateHeadline(newHeadline.value)
    }
    render(){
        return(
            <div>
                <img src="3.jpeg"/>
                <div>{this.props.userInfo.name}</div>
                <div>{this.props.userInfo.headline}</div>
                <br/>
                <input className="input1" type="text"  ref={(c)=>this.newHeadline= c}/>
                <br/><br/>
                <input id="changeHl" className="btn" type="submit"
                       value="Change Headline" onClick={this.updateNewHeadline}/>
                <br/>
            </div>
        )
    }
}
export default connect(
    (state) => {
        return {
            userInfo: state.userInfo
        }
    },
    (dispatch) => {
        return {
            updateHeadline:(headline)=>dispatch(updateHeadline(headline))
        }
    }
)(Headline)
