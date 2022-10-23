import { ActionTypes } from "../actions/types"

const storeInitialState ={
    loading : true,
    stores: [],
    store : [],    
    error : false
}

export const StoreReducer = (state = storeInitialState,{type,payload}={})=>{
    switch(type){
        case ActionTypes.FETCH_STORES:
            return {
                ... state,
                loading : false,
                stores  : payload
            }
        case ActionTypes.FETCH_SINGLE_STORE:
            return {
                ... state,
                loading : false,
                store  : payload
            }
        default:
            return state;
    }
}