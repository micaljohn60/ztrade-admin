import { ActionTypes } from "../actions/types"

const aboutUsInitialState ={
    loading : true,
    aboutus: [],
    error : false,
    errorMessage : [],
    message : [],
    deninePermission : false,
    deninePermissionMessage : []
}

export const AboutUsReducer = (state = aboutUsInitialState,{type,payload}={})=>{
    switch(type){
        case ActionTypes.GET_ABOUT_US:
            return {
                ... state,
                loading : false,
                aboutus  : payload
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


const termsInitialState ={
    loading : true,
    terms: [],
    error : false,
    errorMessage : [],
    message : [],
    deninePermission : false,
    deninePermissionMessage : []
}

export const TermReducer = (state = termsInitialState,{type,payload}={})=>{
    switch(type){
        case ActionTypes.GET_TERMS:
            return {
                ... state,
                loading : false,
                terms  : payload
            }
            case ActionTypes.TERMS_POST:
                return {
                    ... state,
                    loading : false,
                    message  : "Successfully Updated"
                }
        case ActionTypes.TERMS_POST:
            return {
                ... state,
                loading : false,
                error:true,
                errorMessage : payload
            }
        case ActionTypes.TERM_CLEAN_UP:
            return {
                ... state,
                
                error: false,
                errorMessage : []
            }
        default:
            return state;
    }
}


const policyInitialState ={
    loading : true,
    policy: [],
    error : false,
    errorMessage : [],
    message : [],
    deninePermission : false,
    deninePermissionMessage : []
}

export const PolicyReducer = (state = policyInitialState,{type,payload}={})=>{
    switch(type){
        case ActionTypes.GET_POLICY:
            return {
                ... state,
                loading : false,
                policy  : payload
            }
            case ActionTypes.POLICY_POST:
                return {
                    ... state,
                    loading : false,
                    message  : "Successfully Updated"
                }
        case ActionTypes.POLICY_ERROR:
            return {
                ... state,
                loading : false,
                error:true,
                errorMessage : payload
            }
        case ActionTypes.POLICY_CLEAN_UP:
            return {
                ... state,
                
                error: false,
                errorMessage : []
            }
        default:
            return state;
    }
}