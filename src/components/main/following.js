import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addFollower, removeFollower, updateFollower, NewPost} from '../../actions';

class Following extends Component{
    componentDidMount() {
        let users = this.props.users;
        let follow = this.props.userInfo.followed;
        users = users.filter( (ele) => {
            let found = follow.filter(e => e === ele.name)
            return found.length > 0;
        })
        this.props.updateFollower(users);
    }

    constructor (props) {
        super(props);
        this.state = { addFollower: ""}
        this.state= {foundErr:""}

        this.handleUnfollow = this.handleUnfollow.bind(this);
        this.handleAddUserChange = this.handleAddUserChange.bind(this);
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
    }

    handleAddUserChange(evt) {
        this.setState({addFollower: evt.target.value});
    }

    handleUpdateUser() {
        for(let i=0;i<this.props.users.length;i++){
            if(this.state.addFollower === this.props.users[i].name) {
                    let id = Math.floor(Math.random() * this.props.posts.length)
                    this.props.addFollower({
                        name: this.state.addFollower,
                    });
                for (let i = 0; i < 10; i++) {
                    this.props.NewPost({
                        name: this.state.addFollower,
                        content: this.props.posts[id],
                        time: (new Date()).toLocaleString(),
                        img: '5.jpg',
                        key: this.state.addFollower + '-' + id + new Date()
                    })
                }
                this.setState({foundErr:""})
                break;
            }
         else {
                this.setState({foundErr:"Follower not found!"})
            }
        }
    }
    handleUnfollow(evt) {
        this.props.removeFollower(evt.target.id);
    }
    render() {
        return (
            <div>
                {this.props.followedUser.map((ele,idx) => {
                    return (
                        <div className="box1">
                        <div key={idx}>
                            <br/>
                            <img alt="" src="3.jpeg"></img>
                            <div id="Follower">
                                <h5>{ele.name}</h5>
                                <p>Me know nothing,Me just a Puppy!</p>
                                <br/>
                                <button id="removeFollower" className="btn" onClick={this.handleUnfollow} id={ele.name}>Unfollow</button>
                            </div>
                        </div>
                        </div>
                    )
                })}
                <br/>
                <div className="box1">
                    <input id='addFollowing' type='text' className="input1" onChange={this.handleAddUserChange} placeholder="Add a follower"></input>
                    <br/>
                    <span>{this.state.foundErr}</span>
                    <br/>
                    <button id="updateFollower" className="btn" onClick={this.handleUpdateUser}>add</button>
                    <br/>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            users: state.users,
            posts: state.posts,
            userInfo: state.userInfo,
            followedUser: state.followedUser,
        }
    },
    (dispatch) => {
        return {
            updateFollower: (users) => dispatch(updateFollower(users)),
            addFollower: (user) => dispatch(addFollower(user)),
            removeFollower: (name) => dispatch(removeFollower(name)),
            NewPost: (post) => dispatch(NewPost(post))
        }
    }
)(Following)
