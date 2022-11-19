import { ActionTypes } from "../actions/types"

const productInitialState ={
    loading : true,
    products: [],
    product:[],
    error : false,
    errorMessage : []
}

export const ProductReducer = (state = productInitialState,{type,payload}={})=>{
    switch(type){
        case ActionTypes.FETCH_PRODUCTS:
            return {
                ... state,
                loading : false,
                products  : payload
            }
        case ActionTypes.FETCH_SINGLE_PRODUCT:
            return{
                ... state,
                loading : false,
                product  : payload
            }
        case ActionTypes.PRODUCT_MESSAGE:
            return{
                ... state,
                loading : false,
                error : true,
                errorMessage : payload
            }
            case ActionTypes.PRODUCT_CLEAN_UP:
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