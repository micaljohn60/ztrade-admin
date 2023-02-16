import { getCookie } from "src/cookies/cookie";
import ztrade_api from "../../api/ztrade_api";
import { ActionTypes } from "./types";


export const fetchSiteSetting = () => async (dispatch) => {
  const response = await ztrade_api.get("api/sitesetting/list",tokenConfig(getCookie("token")))
  .then(res=>{
    dispatch({type:ActionTypes.FETCH_SITE_SETTING,payload:res.data   })
  }).catch(err=>{
      if(err.response.status == 403){
        dispatch({type:ActionTypes.FETCH_SITE_SETTING,payload:[]  })
      }
  });    
}

export const updateSiteSetting = (data) => async (dispatch) => {
  const response = await ztrade_api.post("api/sitesetting/update/1",data,tokenConfig(getCookie("token")))
  .then(res=>{
        if(res.status === 201){
          process.env.REACT_APP_STATUS === "development"  ? 
          window.location.href = "http://localhost:3000/dashboard/products" 
          : 
          window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/site_setting`
        }
  }).catch(err=>{
      if(err.response.status == 403){
        alert("Error Updating Site Setting")
      }
  });    
}

export const tokenConfig =(token) =>{
 
  const userToken = JSON.parse(token)
  const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  if(userToken) {
      config.headers['Authorization'] = `Bearer  ${userToken}`;
  }

  return config;
}