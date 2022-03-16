import React, { Component } from 'react';
import {connect} from 'react-redux'
import { getPosts, updatePost } from '../../actions'
class ArticlesView extends Component{
    componentDidMount() {
        if (this.props.posts.length > 0) {
            let currentPost = []
            let users = this.props.followedUser
            if (users.length === 0) {
                users = this.props.users;
                let follow = this.props.userInfo.followed;
                users = users.filter( (ele) => {
                    let found = follow.filter(e => e === ele.name)
                    return found.length > 0;
                })
            }
            let current = new Date();
            let r = Math.floor(Math.random() * 86400000)
            let sum = 0;
            for (let j=0; j<10; j++) {
                let i = Math.floor(Math.random() * 100);
                r = Math.floor(Math.random() * 86400000);
                sum += r;
                let obj = {
                    name: this.props.userInfo.name,
                    time: (new Date(current.getTime() - sum)).toLocaleString(),
                    img: '4.jpg',
                    content: this.props.posts[i],
                    key: this.props.userInfo.name + '-' + j
                }
                currentPost.push(obj);
                for (let k=0; k<users.length; k++) {
                    r = Math.floor(Math.random() * 86400000);
                    sum += r;
                    i = Math.floor(Math.random() * 100);
                    currentPost.push({
                        name: users[k].name ,
                        time: (new Date(current.getTime() - sum)).toLocaleString(),
                        img:"5.jpg",
                        content: this.props.posts[i],
                        key: users[k] + '-' + j + new Date()
                    })
                }
            }
            this.props.updatePost(currentPost);
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            keyword: "",
            comments: [
                "Me just a Puppy, Me know nothing!",
                "I am super cool!",
                "Nice to meet you!",
                "LOL",
                "Nah!",
                "Thumbs Up!",
                "Nice post",
                "React Hard!",
                "Study hard, play harder!",
                "Like you pics!"
            ]
        }
        this.handleKeyword = this.handleKeyword.bind(this);
    }

    handleKeyword(evt) {
        this.setState({keyword: evt.target.value});
    }
    render() {
        return(
            <div>
                <div id="searchPost" className="box1">
                <input id="search" className="input1" onChange={this.handleKeyword} placeholder="search your feed"/>
                </div>
                {this.props.currentPost.map(ele => {
                    let cnt = Math.floor(Math.random() * 3) + 2;
                    let comments = []
                    for (let i = 0; i < cnt; i++) {
                        let idx = Math.floor(Math.random() * this.state.comments.length)
                        comments.push(<p key={i}><span>{this.props.users[Math.floor(Math.random() * this.props.users.length)].name} : </span>{this.state.comments[idx]}</p>)
                    }
                    if (!checkContainsKeyword(this.state.keyword, ele.name, ele.content))
                        return null
                    let imgElement = <></>
                    if (ele.img !== "") {
                        imgElement = <img className="img" alt="" src={ele.img}/>
                    }
                    if (this.props.userInfo.name === ele.name) {
                        return (<div id="cUserPosts" key={ele.key}>
                            {imgElement}
                            <div className="box1">
                                <p><b>{ele.name}</b> {ele.time}</p>
                                <p>{ele.content}</p>
                                <button type='button' className='btn'>Comment</button>
                                <button type='button' className='btn'>Edit</button>
                                <input type="text" className="input1" placeholder="Leave your comments here!"></input>
                                <div className="comments">
                                    {comments}
                                </div>
                            </div>
                        </div>)
                    } else {
                        return (<div id key={ele.key}>
                            {imgElement}
                            <div className="box1">
                                <p><b>{ele.name}</b>  {ele.time}</p>
                                <p>{ele.content}</p>
                                <button type='button' className='btn'>Comment</button>
                                <button type='button' className='btn'>Edit</button>
                                <input type="text" className="input1" placeholder="Leave your comments here!"></input>
                                <div className="comments">
                                    {comments}
                                </div>
                            </div>
                        </div>)
                    }
                })}
            </div>
        )
    }
}
function checkContainsKeyword(key, name, content) {
    if (name.includes(key)) return true;
    if (content.includes(key)) return true;
    return false
}
export default connect(
    (state) => {
        return {
            userInfo: state.userInfo,
            users: state.users,
            posts: state.posts,
            followedUser: state.followedUser,
            currentPost: state.currentPost,
        }
    },
    (dispatch) => {
        return {
            getPosts: (posts) => dispatch(getPosts(posts)),
            updatePost: (post) => dispatch(updatePost(post)),
        }
    }
)(ArticlesView)
