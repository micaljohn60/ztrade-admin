import ztrade_api from "../../api/ztrade_api"
import { ActionTypes } from "./types"

export const updateAboutUs =  (data) => async (dispatch) => {    
    const response = await ztrade_api.post("api/aboutus/update/1",data).then(res =>{
     if(res.status === 201){
        dispatch({type: ActionTypes.ABOUT_US_POST,
            payload : res.data})
       
     }
    })
    .catch(err =>{
        
    })   
}  

export const getAboutUs = () => async (dispatch) => {
    const response = await ztrade_api.get("api/aboutus/list")
    .then(res=>{
      dispatch({type:ActionTypes.GET_ABOUT_US,payload:res.data   })
    }).catch(err=>{
      dispatch({type:ActionTypes.GET_ABOUT_US,payload:[]  })
    });    
}

export const aboutusClenaup = () => (dispatch) =>{
    dispatch({type:ActionTypes.ABOUT_US_CLEAN_UP,payload: ""})
  }