import { ActionTypes } from "../actions/types"

const roleAndPermissionInitialState ={
    loading : true,
    roleAndPermission: [],
    error : false,
    errorMessage : [],
    message : [],
    deninePermission : false,
    deninePermissionMessage : []
}

export const RoleAndPermissionReducer = (state = roleAndPermissionInitialState,{type,payload}={})=>{
    switch(type){
        case ActionTypes.FETCH_ROLE_PERMISSION:
            return {
                ... state,
                loading : false,
                roleAndPermission  : payload
            }

            case ActionTypes.FETCH_PERMISSION:
                return {
                    ... state,
                    loading : false,
                    roleAndPermission  : payload
                }
            case ActionTypes.ABOUT_US_POST:
                return {
                    ... state,
                    loading : false,
                    message  : "Successfully Updated"
                }
        case ActionTypes.GET_ABOUT_US_ERROR:
            return {
                ... state,
                loading : false,
                error:true,
                errorMessage : payload
            }
        case ActionTypes.ABOUT_US_CLEAN_UP:
            return {
                ... state,
                
                error: false,
                errorMessage : []
            }
        default:
            return state;
    }
}