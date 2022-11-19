import { ActionTypes } from "../actions/types"

const storeInitialState ={
    loading : true,
    stores: [],
    store : [],    
    error : false,
    errorMessage : []
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
        case ActionTypes.STORE_MESSAGE:
            return {
                ... state,
                loading : false,
                error : true,
                errorMessage : payload
            }
        case ActionTypes.STORE_CLEAN_UP:
            return {
                ... state,
                loading : false,
                error : false,
                errorMessage : []
            }
        default:
            return state;
    }
}