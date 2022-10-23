import ztrade_api from "../../api/ztrade_api";
import { ActionTypes } from "./types";




export const addStore = (data) => async (dispatch) =>{
  const response = await ztrade_api.post("api/store/create",data).then(
    res=>{
   
      if(res.status === 201){

        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/brand" 
        : 
        window.location.href = "https://talentandjobs-testing.web.app/dashboard/brand"
        
      }
    }
  )
}

export const fetchStores = () => async (dispatch) => {
    const response = await ztrade_api.get("api/store/list")
    .then(res=>{
      dispatch({type:ActionTypes.FETCH_STORES,payload:res.data   })
    }).catch(err=>{
      dispatch({type:ActionTypes.FETCH_STORES,payload:[]  })
    });    
}

export const deleteStore = (id) => async (dispatch) =>{
    const response = await ztrade_api.delete(`api/store/delete/${id}`,).then(
      res=>{
     
        if(res.status === 201){
  
          process.env.REACT_APP_STATUS === "development"  ? 
          window.location.href = "http://localhost:3000/dashboard/brand" 
          : 
          window.location.href = "https://talentandjobs-testing.web.app/dashboard/brand"
          
        }
      }
    )
  }



