import ztrade_api from "../../api/ztrade_api";
import { ActionTypes } from "./types";


export const fetchProducts = () => async (dispatch) => {
  const response = await ztrade_api.get("api/product/list")
  .then(res=>{
    dispatch({type:ActionTypes.FETCH_PRODUCTS,payload:res.data   })
  }).catch(err=>{
    dispatch({type:ActionTypes.FETCH_PRODUCTS,payload:[]  })
  });    
}

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
          dispatch({type:ActionTypes.PRODUCT_MESSAGE,payload: res.error})
        }
      }
    ).catch(err=>{
      dispatch({type:ActionTypes.PRODUCT_MESSAGE,payload: err.response.data})
    }) 
  
}
export const deleteProduct = (data) => async (dispatch) =>{

  
  const response = await ztrade_api.delete(`api/product/delete${data}`,data).then(
    res=>{
   
      if(res.status === 201){

        dispatch({type:ActionTypes.SUCCESS_MESSAGE,payload: "Successfully Deleted"})
        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/products" 
        : 
        window.location.href = "https://talentandjobs-testing.web.app/dashboard/products"
        
      }
      else{
        dispatch({type:ActionTypes.PRODUCT_MESSAGE,payload: res.error})
      }
    }
  ).catch(err=>{
    dispatch({type:ActionTypes.PRODUCT_MESSAGE,payload: err.response.data})
  }) 

}

export const fetchSingleProducts = (id) => async (dispatch) => {
  const response = await ztrade_api.get(`api/product/show/${id}`)
  .then(res=>{
    dispatch({type:ActionTypes.FETCH_SINGLE_PRODUCT,payload:res.data   })
  }).catch(err=>{
    dispatch({type:ActionTypes.FETCH_SINGLE_PRODUCT,payload:[]  })
  });    
}

export const productCleanUp =() =>(dispatch) =>{
  dispatch({type:ActionTypes.PRODUCT_CLEAN_UP,payload : ""})
}