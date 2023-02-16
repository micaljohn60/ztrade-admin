import { ActionTypes } from "../actions/types"

const siteSettingInitialState ={
    loading : true,
    site_setting: [],  
    length : 0,
    error : false,
    errorMessage : [],
    deninePermission : false,
    deninePermissionMessage : []
}



export const SiteSettingReducer = (state = siteSettingInitialState,{type,payload}={})=>{
    switch(type){
        case ActionTypes.FETCH_SITE_SETTING:
            return {
                ... state,
                loading : false,
                site_setting  : payload
            }
       
        default:
            return state;
    }
}