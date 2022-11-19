import ztrade_api from "../../api/ztrade_api";
import { ActionTypes } from "./types";

export const fetchBanners = () => async (dispatch) => {
    const response = await ztrade_api.get("api/banner/list")
    .then(res=>{
      dispatch({type:ActionTypes.FETCH_BANNERS,payload:res.data   })
    }).catch(err=>{
      dispatch({type:ActionTypes.FETCH_BANNERS,payload:[]  })
    });    
}


export const deleteBanner  = (id) => async (dispatch) =>{
  const response = await ztrade_api.delete(`api/banner/delete/${id}`).then(
    res=>{
   
      if(res.status === 201){

        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/banner" 
        : 
        window.location.href = "https://talentandjobs-testing.web.app/dashboard/productcategory"
        
      }
    }
  )
}


export const addBanner = (data) => async (dispatch) =>{

  
    const response = await ztrade_api.post("api/banner/create",data).then(
      res=>{
     
        if(res.status === 201){

        //   dispatch({type:ActionTypes.SUCCESS_MESSAGE,payload: "Successfully Created"})
          process.env.REACT_APP_STATUS === "development"  ? 
          window.location.href = "http://localhost:3000/dashboard/banner" 
          : 
          window.location.href = "https://talentandjobs-testing.web.app/dashboard/productcategory"
          
        }
        else{
          dispatch({type:ActionTypes.ERROR_MESSAGE,payload: res.error})
        }
      }
    ).catch(err=>{
      dispatch({type:ActionTypes.ERROR_MESSAGE,payload: err.response.data})
    }) 
  
}

export const updateBanner = (data,id) => async (dispatch) =>{

  
  const response = await ztrade_api.post(`api/banner/update/${id}`,data,tokenConfigFile()).then(
    res=>{
   
      if(res.status === 201){

        dispatch({type:ActionTypes.SUCCESS_MESSAGE,payload: "Successfully Created"})
        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/banner" 
        : 
        window.location.href = "https://talentandjobs-testing.web.app/dashboard/productcategory"
        
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
  dispatch({type:ActionTypes.CATEGORY_CLEAN_UP,payload: ""})
}

export const tokenConfigFile =() =>{
 
  // const userToken = JSON.parse(token)
  const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  // if(userToken) {
  //     config.headers['Authorization'] = `Bearer ${userToken}`;
  // }

  return config;
}