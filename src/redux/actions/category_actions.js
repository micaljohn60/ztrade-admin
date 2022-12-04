import ztrade_api from "../../api/ztrade_api";
import { ActionTypes } from "./types";

export const fetchCategories = () => async (dispatch) => {
    const response = await ztrade_api.get("api/category/list")
    .then(res=>{
      dispatch({type:ActionTypes.FETCH_CATEGORIES,payload:res.data   })
    }).catch(err=>{
      dispatch({type:ActionTypes.FETCH_CATEGORIES,payload:[]  })
    });    
}


export const deleteCategory  = (id) => async (dispatch) =>{
  const response = await ztrade_api.delete(`api/category/delete/${id}`).then(
    res=>{
   
      if(res.status === 201){

        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/productcategory" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/productcategory`
        
      }
    }
  )
}


export const addCategory = (data) => async (dispatch) =>{

  
    const response = await ztrade_api.post("api/category/create",data).then(
      res=>{
     
        if(res.status === 201){

          dispatch({type:ActionTypes.SUCCESS_MESSAGE,payload: "Successfully Created"})
          process.env.REACT_APP_STATUS === "development"  ? 
          window.location.href = "http://localhost:3000/dashboard/productcategory" 
          : 
          window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/productcategory`
          
        }
        else{
          dispatch({type:ActionTypes.ERROR_MESSAGE,payload: res.error})
        }
      }
    ).catch(err=>{
      dispatch({type:ActionTypes.ERROR_MESSAGE,payload: err.response.data})
    }) 
  
}

export const updateCategory = (data,id) => async (dispatch) =>{

  
  const response = await ztrade_api.post(`api/category/update/${id}`,data,tokenConfigFile()).then(
    res=>{
   
      if(res.status === 201){

        dispatch({type:ActionTypes.SUCCESS_MESSAGE,payload: "Successfully Created"})
        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/productcategory" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/productcategory`
        
      }
      else{
        dispatch({type:ActionTypes.ERROR_MESSAGE,payload: res.error})
      }
    }
  ).catch(err=>{
    dispatch({type:ActionTypes.ERROR_MESSAGE,payload: err.response.data})
  }) 

}

export const cleanUp = () => (dispatch) =>{
  dispatch({type:ActionTypes.CATEGORY_CLEAN_UP,payload: ""})
}

export const fetchSubCategories = () => async (dispatch) => {
  const response = await ztrade_api.get("api/subcategory/list")
  .then(res=>{
    dispatch({type:ActionTypes.FETCH_SUB_CATEGORIES,payload:res.data   })
  }).catch(err=>{
    dispatch({type:ActionTypes.FETCH_SUB_CATEGORIES,payload:[]  })
  });    
}

export const addSubCategory = (data) => async (dispatch) =>{
  const response = await ztrade_api.post("api/subcategory/create",data).then(
    res=>{
   
      if(res.status === 201){

        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/productcategory" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/productcategory`
        
      }
    }
  ).catch(err=>{
    dispatch({type:ActionTypes.ERROR_MESSAGE,payload: err.response.data})
  })
}

export const deleteSubCategory = (id) => async (dispatch) =>{
  const response = await ztrade_api.delete(`api/subcategory/delete/${id}`).then(
    res=>{
   
      if(res.status === 201){

        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/productcategory" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/productcategory`
        
      }
    }
  )
}

export const updateSubCategory = (data,id) => async (dispatch) =>{
  
  const response = await ztrade_api.post(`api/subcategory/update/${id}`,data,tokenConfigFile()).then(
    res=>{
   
      if(res.status === 201){

        dispatch({type:ActionTypes.SUCCESS_MESSAGE,payload: "Successfully Created"})
        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/productcategory" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/productcategory`
        
      }
      if (res.status === 404){
        console.log("")
      }
      else{
        dispatch({type:ActionTypes.ERROR_MESSAGE,payload: res.error})
      }
    }
  ).catch(err=>{
    dispatch({type:ActionTypes.ERROR_MESSAGE,payload: err.response.data})
  }) 

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