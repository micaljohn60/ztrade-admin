import { getCookie } from "src/cookies/cookie";
import ztrade_api from "../../api/ztrade_api";
import { ActionTypes } from "./types";

export const addSlider = (data) => async (dispatch) =>{
    const response = await ztrade_api.post("api/slider/create",data,tokenConfig(getCookie('token'))).then(
      res=>{
     
        if(res.status === 201){
  
          process.env.REACT_APP_STATUS === "development"  ? 
          window.location.href = "http://localhost:3000/dashboard/slider" 
          : 
          window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/slider`
          
        }
        else if(res.status === 403){
          
        }
        else {
          dispatch({type:ActionTypes.ERROR_MESSAGE,payload: res.error})
        }
      }
    ).catch(err => {
      dispatch({type:ActionTypes.ERROR_MESSAGE,payload: err.response.data})
    })
}


export const updateSlider = (data,id) => async (dispatch) =>{
  const response = await ztrade_api.post(`api/slider/update/${id}`,data,tokenConfig(getCookie("token"))  ).then(
    res=>{
   
      if(res.status === 201){

        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/slider" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/slider`
        
      }
      if(res.status === 403){
        dispatch({type:ActionTypes.SLIDER_PERMISSION_DENINE,payload: res.data})
      }
      else {
        dispatch({type:ActionTypes.ERROR_MESSAGE,payload: res.error})
      }
    }
  ).catch(err => {
    if(err.response.status === 403){
      dispatch({type:ActionTypes.SLIDER_PERMISSION_DENINE,payload: err.response.data})
    }
    dispatch({type:ActionTypes.ERROR_MESSAGE,payload: err.response.data})
  })
}

export const sliderCleanUp = () => (dispatch) =>{
  dispatch({type:ActionTypes.SLIDER_CLEAN_UP,payload: ""})
}

export const fetchSlider = () => async (dispatch) => {
    const response = await ztrade_api.get("api/slider/list",tokenConfig(getCookie("token")))
    .then(res=>{
      dispatch({type:ActionTypes.FETCH_SLIDERS,payload:res.data   })
    }).catch(err=>{
      if(err.response.status === 403){
        dispatch({type:ActionTypes.SLIDER_PERMISSION_DENINE,payload: []  })
      }
    });    
}

export const deleteSlider = (id) => async (dispatch) =>{
  const response = await ztrade_api.delete(`api/slider/delete/${id}`,tokenConfig(getCookie("token"))).then(
    res=>{
   
      if(res.status === 201){

        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/slider" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/slider`
        
      }
    }
  )
}

export const tokenConfig =(token) =>{
 
  const userToken = JSON.parse(token)
  const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept" : "application/json"
      },
    };
  if(userToken) {
    
      config.headers['Authorization'] = `Bearer ${userToken}`;
  }

  return config;
}