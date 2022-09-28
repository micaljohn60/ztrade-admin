import { ActionTypes } from "../actions/types"

const categoryInitialState ={
    loading : true,
    categories: [],
    category : [],
    subcategories: [],
    error : false
}

export const CategoryReducer = (state = categoryInitialState,{type,payload}={})=>{
    switch(type){
        case ActionTypes.FETCH_CATEGORIES:
            return {
                ... state,
                loading : false,
                categories  : payload
            }
        case ActionTypes.FETCH_SUB_CATEGORIES:
            return {
                ... state,
                loading : false,
                subcategories  : payload
            }
        default:
            return state;
    }
}