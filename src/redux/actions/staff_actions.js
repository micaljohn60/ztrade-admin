import { getCookie } from "src/cookies/cookie";
import ztrade_api from "../../api/ztrade_api";  
import { ActionTypes } from "./types";


export const fetchStaffs = (data) => async (dispatch) =>{
    const response = await ztrade_api.get("api/staffs",data).then(
      res => {
        if(res.status === 200){
          dispatch({
            type: ActionTypes.FETCH_STAFFS,
            payload: res.data
          })
        }
      }
    ).catch(err => {
        console.log(err)

        // dispatch(returnErrors(err.response.data,err.response.status));
      })
  }

  export const fetchCustomers = (data) => async (dispatch) =>{
    const response = await ztrade_api.get("api/customers",tokenConfig(getCookie("token"))).then(
      res => {
        if(res.status === 200){
          dispatch({
            type: ActionTypes.FETCH_CUSTOMERS,
            payload: res.data
          })
        }
      }
    ).catch(err => {
        console.log(err)

        // dispatch(returnErrors(err.response.data,err.response.status));
      })
  }

  export const fetchUserCount = (data) => async (dispatch) =>{
    const response = await ztrade_api.get("api/user/list/count",data).then(
      res => {
        if(res.status === 200){
          dispatch({
            type: ActionTypes.FETCH_USER_COUNT,
            payload: res.data
          })
        }
      }
    ).catch(err => {
        console.log(err)

        // dispatch(returnErrors(err.response.data,err.response.status));
      })
  }

  export const updateStaff = (data,id) => async (dispatch) =>{

  
    const response = await ztrade_api.post(`api/staff/update/${id}`,data,tokenConfig(getCookie("token"))).then(
      res=>{
     
        if(res.status === 201){
  
          dispatch({type:ActionTypes.SUCCESS_MESSAGE,payload: "Successfully Created"})
          process.env.REACT_APP_STATUS === "development"  ? 
          window.location.href = "http://localhost:3000/dashboard/user" 
          : 
          window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/user`
          
        }
        else{
          dispatch({type:ActionTypes.ERROR_MESSAGE,payload: res.error})
        }
      }
    ).catch(err=>{
      alert("error")
    }) 
  
  }

  export const deleteStaff = (id) => async (dispatch) =>{
    const response = await ztrade_api.delete(`api/staff/delete/${id}`,tokenConfig(getCookie("token"))).then(
      res=>{
     
        if(res.status === 201){
          alert("Deleted SuccessFully")
          process.env.REACT_APP_STATUS === "development"  ? 
          window.location.href = "http://localhost:3000/dashboard/user" 
          : 
          window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/user`
          
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