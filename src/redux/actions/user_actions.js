import { getCookie } from "../../cookies/cookie";
import ztrade_api from "../../api/ztrade_api";  
import { ActionTypes } from "./types";

export const addNewStaff = (data) => async (dispatch) =>{
  const response = await ztrade_api.post("api/adduser",data).then(
    res => {
      if(res.status === 201){
        alert("User Successfully Added")
        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/user" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/user`
      }
    }
  ).catch(err=>{
    if(err.response.status === 422){
      alert("One Of your fields are mission data")
    }
    else{
      alert(err)
    }
    
  })
}



export const login = (data) => async (dispatch) => {
  const response = await ztrade_api.post("api/login",data).then(
    res => {
    if(res.status === 201){
        dispatch({type:ActionTypes.LOGIN_SUCCESS,payload : res.data})
        window.location.reload();
      
    }
  }
  ).catch(err => {
    console.log(err)
    dispatch({
      type: ActionTypes.USER_ERROR,
      payload: err.response.data
    })
    // dispatch(returnErrors(err.response.data,err.response.status));
  })
}

export const loadUser = () => async (dispatch)=>{
  
  dispatch({type:ActionTypes.USER_LOADING})  
  const sessionId = getCookie("session");
  const response = ztrade_api.get('api/user/show/'+sessionId,tokenConfig(getCookie("token"))).then(res => {
    dispatch({
      type: ActionTypes.USER_LOADED,
      payload: res.data
    })
  }).catch(err =>{
    
    console.log("User Loaded Error");
    // console.log(err.response.data)
  })
}



export const userCleanUp = () => (dispatch) =>{
  dispatch({type:ActionTypes.USER_ERROR_MESSAGE_CLEAN_UP,payload: ""})
}

export const userLoginCleanUp = () => (dispatch) =>{
  dispatch({type:ActionTypes.LOGIN_CLEAN_UP,payload: ""})
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