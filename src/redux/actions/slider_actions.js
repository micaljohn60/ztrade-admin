import ztrade_api from "../../api/ztrade_api";
import { ActionTypes } from "./types";

export const addSlider = (data) => async (dispatch) =>{
    const response = await ztrade_api.post("api/slider/create",data).then(
      res=>{
     
        if(res.status === 201){
  
          process.env.REACT_APP_STATUS === "development"  ? 
          window.location.href = "http://localhost:3000/dashboard/slider" 
          : 
          window.location.href = "https://talentandjobs-testing.web.app/dashboard/slider"
          
        }
      }
    )
}

export const fetchSlider = () => async (dispatch) => {
    const response = await ztrade_api.get("api/slider/list")
    .then(res=>{
      dispatch({type:ActionTypes.FETCH_SLIDERS,payload:res.data   })
    }).catch(err=>{
      dispatch({type:ActionTypes.FETCH_SLIDERS,payload:[]  })
    });    
}