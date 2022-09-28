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
        window.location.href = "https://talentandjobs-testing.web.app/dashboard/productcategory"
        
      }
    }
  )
}

export const addCategory = (data) => async (dispatch) =>{
  const response = await ztrade_api.post("api/category/create",data).then(
    res=>{
   
      if(res.status === 201){

        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/productcategory" 
        : 
        window.location.href = "https://talentandjobs-testing.web.app/dashboard/productcategory"
        
      }
    }
  )
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
        window.location.href = "https://talentandjobs-testing.web.app/dashboard/productcategory"
        
      }
    }
  )
}

export const deleteSubCategory = (id) => async (dispatch) =>{
  const response = await ztrade_api.delete(`api/subcategory/delete/${id}`).then(
    res=>{
   
      if(res.status === 201){

        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/productcategory" 
        : 
        window.location.href = "https://talentandjobs-testing.web.app/dashboard/productcategory"
        
      }
    }
  )
}