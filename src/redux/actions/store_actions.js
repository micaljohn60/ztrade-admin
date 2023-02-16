import { getCookie } from "src/cookies/cookie";
import ztrade_api from "../../api/ztrade_api";
import { ActionTypes } from "./types";




export const addStore = (data) => async (dispatch) =>{
  const response = await ztrade_api.post("api/store/create",data,tokenConfig(getCookie("token"))).then(
    res=>{
   
      if(res.status === 201){

        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/brand" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/brand`
        
      }
    }
  ).catch(err=>{
    dispatch({type:ActionTypes.STORE_MESSAGE,payload: err.response.data})
  })
}

export const storeCleanUP = () => (dispatch) =>{
  dispatch({type:ActionTypes.STORE_CLEAN_UP,payload: ""})
}

export const updateStore = (data,id) => async (dispatch) =>{
  const response = await ztrade_api.post(`api/store/update/${id}`,data,tokenConfig(getCookie("token"))  ).then(
    res=>{
   
      if(res.status === 201){

        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/brand" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/brand`
        
      }
      else {
        dispatch({type:ActionTypes.STORE_MESSAGE,payload: res.error})
      }
    }
  ).catch(err => {
    dispatch({type:ActionTypes.STORE_MESSAGE,payload: err.response.data})
  })
}

export const fetchStores = () => async (dispatch) => {
    const response = await ztrade_api.get("api/store/list",tokenConfig(getCookie("token")))
    .then(res=>{
      dispatch({type:ActionTypes.FETCH_STORES,payload:res.data   })
    }).catch(err=>{
      if(err.response.status == 403){
      dispatch({type:ActionTypes.STORE_PERMISSION_DENINE,payload:[] })
      }
      dispatch({type:ActionTypes.FETCH_STORES,payload:[]  })
    });    
}

export const deleteStore = (id) => async (dispatch) =>{
    const response = await ztrade_api.delete(`api/store/delete/${id}`,tokenConfig(getCookie("token"))).then(
      res=>{
     
        if(res.status === 201){
  
          process.env.REACT_APP_STATUS === "development"  ? 
          window.location.href = "http://localhost:3000/dashboard/brand" 
          : 
          window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/brand`
          
        }
      }
    ).catch(err=>{
      alert(err)
    })
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



