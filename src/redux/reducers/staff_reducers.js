import { setCookie,getCookie } from "../../cookies/cookie";
import { ActionTypes } from "../actions/types";


const staffInitialState = {    

    error : false,
    errorMessage : [],
    count : [],
    isLoading: true,
    customerLoading : true,
    staff: [],
    customers : [],
    deninePermission : false,
    deninePermissionMessage : [],
    deninePermission : false,
    deninePermissionMessage : []
    
}

export const StaffReducer = (state = staffInitialState, {type, payload}={}) => {

    switch (type){
        case ActionTypes.FETCH_STAFFS:
            return{
                ...state,
                isLoading: false,
                staff : payload
            }
        case ActionTypes.FETCH_CUSTOMERS:
            return{
                ...state,
                customerLoading: false,
                customers : payload
            }
        case ActionTypes.FETCH_USER_COUNT:
            return{
                ...state,
                isLoading:false,
                count : payload
            }
        default:
            return state;
    }
};