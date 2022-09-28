import { ActionTypes } from "../actions/types"

const sliderInitialState ={
    loading : true,
    sliders: [],
    error : false
}

export const SliderReducer = (state = sliderInitialState,{type,payload}={})=>{
    switch(type){
        case ActionTypes.FETCH_SLIDERS:
            return {
                ... state,
                loading : false,
                sliders  : payload
            }
        default:
            return state;
    }
}