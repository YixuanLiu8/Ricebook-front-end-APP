import {GET_USERS,
    UPDATE_USERS,
    NEW_USER,
    CHANGE_USER_STATUS,
    GET_POSTS,
    UPDATE_HEADLINE,
    UPDATE_FOLLOWER,
    ADD_FOLLOWER,
    REMOVE_FOLLOWER,
    NEW_POST,
    UPDATE_POST} from './actions'
// init the state and change the state
const initialState = {
    isLogin:false,
    posts:[],
    users:[],
    userInfo: {
        dob: "",
        email: "",
        followed: [],
        headline: "",
        name: "",
        password: "",
        phone: "",
        zipcode: "",
    },
    followedUser: [],
    currentPost: [],
}
export function Reducer(state=initialState,action){
    switch (action.type){
        case UPDATE_POST:
            return {...state, currentPost: action.post}
        case NEW_POST:
            return {...state, currentPost: [action.post,...state.currentPost]}
        case UPDATE_HEADLINE:
            let updatedUserInfo = state.userInfo;
            let newUser = state.users;
            updatedUserInfo.headline = action.headline;
            for (let i=0; i<newUser.length; i++) {
                if (newUser[i].name === updatedUserInfo.name) {
                    newUser[i] = updatedUserInfo;
                    break;
                }
            }
            updateUserInfoToLocalStorage(state)
            return {...state, userInfo: updatedUserInfo, users: newUser};
        case UPDATE_FOLLOWER:
            return {...state, followedUser: action.users}
        case ADD_FOLLOWER:
            return {...state, followedUser: [...state.followedUser, action.user]}
        console.log(action.user)
        case REMOVE_FOLLOWER:
            return {...state,
                currentPost: state.currentPost.filter(ele => ele.name !== action.name),
                followedUser: state.followedUser.filter(ele => ele.name !== action.name)}
        case NEW_USER:
            return{...state,users: [...state.users, action.user]}
        case GET_POSTS:
            return{...state, posts: action.posts}
        case CHANGE_USER_STATUS:
            return {...state, isLogin: !state.isLogin}
        case GET_USERS:
            return {...state, users: action.users}
        case UPDATE_USERS:
            return {...state, userInfo: Object.assign(state.userInfo, action.user)}
        default:
            return state
    }
}
function updateUserInfoToLocalStorage(state) {
    window.localStorage.setItem('users', JSON.stringify(state.users));
    window.localStorage.setItem('currentUser', JSON.stringify(state.userInfo));
}
export default Reducer
