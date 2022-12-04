import { setCookie,getCookie } from "../../cookies/cookie";
import { ActionTypes } from "../actions/types";


const initialState = {    
    isAuthenticated: null,
    state : null,
    error : false,
    errorMessage : [],
    isLoading: false,
    user: null,
    token: getCookie("token"),
}

export const UserReducer = (state = initialState, {type, payload}={}) => {

    switch (type){
        case ActionTypes.USER_LOADING:
            return{
                ...state,
                isLoading: true,
            }
        case ActionTypes.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: payload,
            }
        case ActionTypes.LOGIN_SUCCESS:
            setCookie("token",JSON.stringify(payload.token),1);  
            setCookie("session",JSON.stringify(payload.user.id),1);           
            return {
                ...state,
                isAuthenticated: true,
                state:"yay",
                isLoading: false,
                user : payload
            }
        case ActionTypes.USER_ERROR:
            return{
                ...state,
                error : true,
                errorMessage : payload,
            }
        case ActionTypes.USER_ERROR_MESSAGE_CLEAN_UP:
            return{
                ...state,
                error : false,
                errorMessage : [],
            }
        default:
            return state;
    }
};