import { ActionTypes } from "../actions/types"

const bannerInitialState ={
    loading : true,
    banners: [],
    banner : [],    
    error : false,
    errorMessage : [],
    deninePermission : false,
    deninePermissionMessage : []
}

export const BannerReducer = (state = bannerInitialState,{type,payload}={})=>{
    switch(type){
        case ActionTypes.FETCH_BANNERS:
            return {
                ... state,
                loading : false,
                banners  : payload
            }
        case ActionTypes.BANNER_ERROR_MESSAGE:
            return {
                ... state,
                loading : false,
                error : true,
                errorMessage : payload
            }
        case ActionTypes.BANNER_PERMISSION_DENINE:
            return {
                ... state,
                loading : false,
                deninePermission : true,
                banners : []
            }
        case ActionTypes.BANNER_CLEAN_UP:
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