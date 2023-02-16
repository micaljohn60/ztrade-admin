import { getCookie } from "src/cookies/cookie";
import ztrade_api from "../../api/ztrade_api";
import { ActionTypes } from "./types";

export const fetchBanners = () => async (dispatch) => {
    const response = await ztrade_api.get("api/banner/list",tokenConfig(getCookie("token")))
    .then(res=>{
      dispatch({type:ActionTypes.FETCH_BANNERS,payload:res.data   })
    }).catch(err=>{
      if(err.response.status == 403){
        dispatch({type:ActionTypes.BANNER_PERMISSION_DENINE,payload:[]  })
      }
    });    
}


export const deleteBanner  = (id) => async (dispatch) =>{
  const response = await ztrade_api.delete(`api/banner/delete/${id}`,tokenConfig(getCookie("token"))).then(
    res=>{
   
      if(res.status === 201){

        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/banner" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/banner`
        
      }
    }
  )
}


export const addBanner = (data) => async (dispatch) =>{

  
    const response = await ztrade_api.post("api/banner/create",data,tokenConfig(getCookie("token"))).then(
      res=>{
     
        if(res.status === 201){

        //   dispatch({type:ActionTypes.SUCCESS_MESSAGE,payload: "Successfully Created"})
          process.env.REACT_APP_STATUS === "development"  ? 
          window.location.href = "http://localhost:3000/dashboard/banner" 
          : 
          window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/banner`
          
        }
        else{
          dispatch({type:ActionTypes.BANNER_ERROR_MESSAGE,payload: res.error})
        }
      }
    ).catch(err=>{
      dispatch({type:ActionTypes.BANNER_ERROR_MESSAGE,payload: err.response.data})
    }) 
  
}

export const updateBanner = (data,id) => async (dispatch) =>{

  
  const response = await ztrade_api.post(`api/banner/update/${id}`,data,tokenConfig(getCookie("token"))).then(
    res=>{
   
      if(res.status === 201){

        dispatch({type:ActionTypes.SUCCESS_MESSAGE,payload: "Successfully Created"})
        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/banner" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/banner`
        
      }
      else{
        dispatch({type:ActionTypes.ERROR_MESSAGE,payload: res.error})
      }
    }
  ).catch(err=>{
    dispatch({type:ActionTypes.ERROR_MESSAGE,payload: err.response.data})
  }) 

}

export const bannerCleanUp = () => (dispatch) =>{
  dispatch({type:ActionTypes.BANNER_CLEAN_UP,payload: ""})
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
