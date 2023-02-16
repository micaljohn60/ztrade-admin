import { ActionTypes } from "../actions/types";

const percentInitialState ={
    loading : true,
    percent: [],
    error : false,
    deninePermission : false,
    deninePermissionMessage : []
}

export const PercentReducer = (state = percentInitialState,{type,payload}={})=>{
    switch(type){
        case ActionTypes.FETCH_PERCENT:
            return {
                ... state,
                loading : false,
                percent  : payload
            }
        default:
            return state;
    }
}