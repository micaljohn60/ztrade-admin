import { ActionTypes } from "../actions/types"

const sliderInitialState ={
    loading : true,
    sliders: [],
    error : false,
    errorMessage : []
}

export const SliderReducer = (state = sliderInitialState,{type,payload}={})=>{
    switch(type){
        case ActionTypes.FETCH_SLIDERS:
            return {
                ... state,
                loading : false,
                sliders  : payload
            }
        case ActionTypes.ERROR_MESSAGE:
            return{
                ... state,
                loading : false,
                error : true,
                errorMessage : payload
            }
            case ActionTypes.SLIDER_CLEAN_UP:
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