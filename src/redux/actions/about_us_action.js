import ztrade_api from "../../api/ztrade_api"
import { ActionTypes } from "./types"

export const updateAboutUs =  (data) => async (dispatch) => {    
    const response = await ztrade_api.post("api/aboutus/update/1",data).then(res =>{
     if(res.status === 201){
        dispatch({type: ActionTypes.ABOUT_US_POST,payload : res.data})
            process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/aboutus" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/aboutus`
       
     }
    })
    .catch(err =>{
      dispatch({type:ActionTypes.GET_ABOUT_US_ERROR,payload: err.response.data})
    })   
}  

export const getAboutUs = () => async (dispatch) => {
    const response = await ztrade_api.get("api/aboutus/list")
    .then(res=>{
      dispatch({type:ActionTypes.GET_ABOUT_US,payload:res.data   })
    }).catch(err=>{
      dispatch({type:ActionTypes.GET_ABOUT_US_ERROR,payload: err.response.data})
    });    
}

export const aboutusClenaup = () => (dispatch) =>{
    dispatch({type:ActionTypes.ABOUT_US_CLEAN_UP,payload: ""})
  }

  export const updateTermsAndConditions =  (data) => async (dispatch) => {    
    const response = await ztrade_api.post("api/termandcondition/update/1",data).then(res =>{
     if(res.status === 201){
        dispatch({type: ActionTypes.TERMS_POST,payload : res.data})
            process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/terms_and_conditions" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/terms_and_conditions`
       
     }
    })
    .catch(err =>{
      dispatch({type:ActionTypes.TERMS_ERROR,payload: err.response.data})
    })   
}  

export const getTermsAndConditions= () => async (dispatch) => {
    const response = await ztrade_api.get("api/termandcondition/list")
    .then(res=>{
      dispatch({type:ActionTypes.GET_TERMS,payload:res.data   })
    }).catch(err=>{
      dispatch({type:ActionTypes.TERMS_ERROR,payload: err.response.data})
    });    
}

export const termsAndConditionsClenaup = () => (dispatch) =>{
    dispatch({type:ActionTypes.TERM_CLEAN_UP,payload: ""})
  }

  export const updatePrivacyPolicy =  (data) => async (dispatch) => {    
    const response = await ztrade_api.post("api/privacypolicy/update/1",data).then(res =>{
     if(res.status === 201){
        dispatch({type: ActionTypes.POLICY_POST,payload : res.data})
            process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/privacy_policy" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/privacy_policy`
       
     }
    })
    .catch(err =>{
      dispatch({type:ActionTypes.POLICY_ERROR,payload: err.response.data})
    })   
}  

export const getPrivicyPolicy = () => async (dispatch) => {
    const response = await ztrade_api.get("api/privacypolicy/list")
    .then(res=>{
      dispatch({type:ActionTypes.GET_POLICY,payload:res.data   })
    }).catch(err=>{
      dispatch({type:ActionTypes.POLICY_ERROR,payload: err.response.data})
    });    
}

export const termsPrivacyPolicy = () => (dispatch) =>{
    dispatch({type:ActionTypes.POLICY_CLEAN_UP,payload: ""})
  }