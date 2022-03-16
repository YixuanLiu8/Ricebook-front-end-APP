import React, { Component, useRef } from 'react';
import { NewPost, getPosts } from '../../actions';
import { connect } from 'react-redux';
class AddArticle extends Component{
    constructor (props) {
        super(props);
        this.state = {
            newPost: ""
        }
        this.updateMyPost = this.updateMyPost.bind(this)
        this.submitPost = this.submitPost.bind(this)
        this.clearPost = this.clearPost.bind(this)
    }

    updateMyPost(evt) {
        this.setState({newPost: evt.target.value})
    }

    submitPost(evt) {
        let id = Math.floor(Math.random() * 30);
        this.props.NewPost({
            name: this.props.userInfo.name,
            content: this.state.newPost,
            time: (new Date()).toLocaleString(),
            img:"",
            key: this.props.userInfo.name + '-' + id
        })
        this.clearPost();
    }
    clearPost(evt) {
        this.setState({newPost: ""})
    }
    render() {
        return (
            <div className="box1">
                <div>
                    <img className="img" alt="" src="3.jpeg"/>
                </div>
                <div className="box1">
                    Share something new!
                    <textarea cols="80" rows="15" value={this.state.newPost}
                              onChange={this.updateMyPost}>
                </textarea> <br/>
                    <div>
                        <input type="file" className="input"></input>
                    </div>
                    <br/>
                        <button type="btn" className="btn1" onClick={this.submitPost}>Post</button>
                        <br/>
                        <button type="btn" className="btn1"  onClick={this.clearPost}>Clear</button>
                </div>
            </div>
        )
    }

}

export default connect(
    (state) => {
        return {
            user : state.user,
            userInfo:state.userInfo
        }
    },
    (dispatch) => {
        return {
            NewPost: (post) => dispatch(NewPost(post)),
            getPosts: (posts) => dispatch(getPosts(posts))
        }
    }
)(AddArticle)
