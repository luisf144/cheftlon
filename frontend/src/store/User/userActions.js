import userActionTypes from './userTypes';
import api from "../../utils/Interceptor";
import { handler } from '../../utils/ResponsesHandler'
import {getUsers} from "../UserList/userListActions";
import { success } from "../Alert/alertActions";

export const createUser = (user) => async (dispatch) => {
    try {
        if(user.hasOwnProperty("_id")){
            delete user._id;
        }

        dispatch({
            type: userActionTypes.USER_NEW_REQUEST,
        });

        const { data } = await api.post(
            '/users',
            user
        );

        if(user.avatar){
            //After save user > upload avatar
            user._id = data.data._id;
            dispatch(uploadUserAvatar(user));
        }

        //Show Alert
        dispatch(success(data.message));

        dispatch({
            type: userActionTypes.USER_NEW_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: userActionTypes.USER_NEW_FAILURE,
            payload: handler.errorHandler(error),
        });
    }
}

export const updateUser = (user) => async (dispatch) => {
    try {
        dispatch({
            type: userActionTypes.USER_UPDATE_REQUEST,
        });

        const { data } = await api.put(
            `/users/${user._id}`,
            user
        );

        if(user.avatar){
            // Upload avatar
            dispatch(uploadUserAvatar(user));
        }

        //Show Alert
        dispatch(success(data.message));

        dispatch({
            type: userActionTypes.USER_UPDATE_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: userActionTypes.USER_UPDATE_FAILURE,
            payload: handler.errorHandler(error),
        });
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: userActionTypes.USER_DELETE_REQUEST,
        });

        const { data } = await api.delete(
            `/users/${id}`
        );

        //Reload Users
        dispatch(getUsers());

        //Show Alert
        dispatch(success(data.message));

        dispatch({
            type: userActionTypes.USER_DELETE_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: userActionTypes.USER_DELETE_FAILURE,
            payload: handler.errorHandler(error),
        });
    }
}

export const uploadUserAvatar = (user) => async (dispatch) => {
    try {
        dispatch({
            type: userActionTypes.USER_UPLOAD_AVATAR_REQUEST,
        });

        const formData = new FormData();
        formData.append('avatar', user.avatar);

        const { data } = await api.put(
            `/users/${user._id}/upload-avatar`,
            formData
        );

        dispatch({
            type: userActionTypes.USER_UPLOAD_AVATAR_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: userActionTypes.USER_UPLOAD_AVATAR_FAILURE,
            payload: handler.errorHandler(error),
        });
    }
}

export const changeUserData = (user) => {
    return {
        type: userActionTypes.USER_CHANGE_DATA,
        payload: user
    }
};

export const getUser = (userId) => async (dispatch) => {
    try {
        dispatch({
            type: userActionTypes.GET_USER_REQUEST,
        });

        const { data } = await api.get(`/users/${userId}`);

        dispatch({
            type: userActionTypes.GET_USER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: userActionTypes.GET_USER_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}