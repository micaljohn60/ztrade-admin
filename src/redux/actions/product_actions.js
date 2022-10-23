import ztrade_api from "../../api/ztrade_api";
import { ActionTypes } from "./types";

export const addProduct = (data) => async (dispatch) =>{

  
    const response = await ztrade_api.post("api/product/create",data).then(
      res=>{
     
        if(res.status === 201){

          dispatch({type:ActionTypes.SUCCESS_MESSAGE,payload: "Successfully Created"})
          process.env.REACT_APP_STATUS === "development"  ? 
          window.location.href = "http://localhost:3000/dashboard/products" 
          : 
          window.location.href = "https://talentandjobs-testing.web.app/dashboard/products"
          
        }
        else{
          dispatch({type:ActionTypes.ERROR_MESSAGE,payload: res.error})
        }
      }
    ).catch(err=>{
      dispatch({type:ActionTypes.ERROR_MESSAGE,payload: err.response.data})
    }) 
  
}