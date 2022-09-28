import { ActionTypes } from "./types";
import ztrade_api from "src/api/ztrade_api";


export const loginUser =  (data) => async (dispatch) => {    
    const response = await ztrade_api.post("api/login/email",data).then(res =>{
      dispatch({type: ActionTypes.ADD_USER,
        payload : res.data})
    })
    .catch(err =>{
      alert("Log in Fail - Check Email and Pasword")      
    })   
}  