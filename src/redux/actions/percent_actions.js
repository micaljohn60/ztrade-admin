import ztrade_api from "../../api/ztrade_api";
import { ActionTypes } from "./types";

export const fetchPercent = () => async (dispatch) => {
    const response = await ztrade_api.get("api/percentage/show/1",)
    .then(res=>{
      dispatch({type:ActionTypes.FETCH_PERCENT,payload:res.data   })
    }).catch(err=>{
      dispatch({type:ActionTypes.FETCH_PERCENT,payload:[]  })
    })
    ;
    
} 

export const updatePercent = (data) => async (dispatch) =>{
  const response = await ztrade_api.post("api/percentage/update/1",data).then(
    res=>{
   
      if(res.status === 201){

        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/app" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/app`
        
      }
    }
  )
}