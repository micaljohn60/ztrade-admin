import { ActionTypes } from "../actions/types"

const aboutUsInitialState ={
    loading : true,
    aboutus: [],
    error : false,
    errorMessage : [],
    message : []
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
        case ActionTypes.ABOUT_US_CLEAN_UP:
            return {
                ... state,
                loading : true,
                aboutus  : []
            }
        default:
            return state;
    }
}