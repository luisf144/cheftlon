import authActionTypes from './authTypes';
import userActionTypes from "../User/userTypes";

//Get User from LocalStorage
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const initialState = {
    currentUser: userInfo ? userInfo : null,
    loggedIn: userInfo && Object.keys(userInfo).length !== 0,
    isLoading: false,
    error: null,

    //Register
    registering: false,
    registered: false,
    rError: null,
};

const authReducer = (state = initialState, action) => {

    switch(action.type){
        case authActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case authActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.data,
                loggedIn: true,
                isLoading: false,
                error: null,
                rError: null,
            };

        case authActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload,
                loggedIn: false,
                isLoading: false,
            };

        case authActionTypes.REGISTER_REQUEST:
            return {
                ...state,
                registering: true
            };

        case authActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                registering: false,
                registered: true,
            };

        case authActionTypes.REGISTER_FAILURE:
            return {
                ...state,
                rError: action.payload,
                registering: false,
                registered: false,
            };

        case authActionTypes.LOGOUT:
            return {
                ...state,
                currentUser: null,
                loggedIn: false,
                isLoading: false,
                error: null,
            };

        case authActionTypes.GET_PROFILE_REQUEST:
        case authActionTypes.PROFILE_UPDATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case authActionTypes.GET_PROFILE_SUCCESS:
        case authActionTypes.PROFILE_UPDATE_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.data,
                isLoading: false,
                error: null,
            };

        case authActionTypes.GET_PROFILE_FAILURE:
        case authActionTypes.PROFILE_UPDATE_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };

        case authActionTypes.PROFILE_CHANGE_DATA:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    _id: action.payload._id,
                    name: action.payload.name,
                    email: action.payload.email,
                    password: '',
                    isAdmin: action.payload.isAdmin,
                    avatar: action.payload.avatar,
                    avatarChanged: action.payload.avatarChanged,
                },
            };

        default:
            return state;
    }

};

export default authReducer;