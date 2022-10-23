import { ActionTypes } from "../actions/types"

const categoryInitialState ={
    loading : true,
    categories: [],
    category : [],
    subcategories: [],
    error : false,
    errorMessage : []
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
        case ActionTypes.ERROR_MESSAGE:
            return {
                ... state,
                loading : false,
                error : true,
                errorMessage : payload
            }
        case ActionTypes.CATEGORY_CLEAN_UP:
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