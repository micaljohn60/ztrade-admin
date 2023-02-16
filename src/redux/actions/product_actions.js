import { getCookie } from "src/cookies/cookie";
import ztrade_api from "../../api/ztrade_api";
import { ActionTypes } from "./types";


export const fetchProducts = () => async (dispatch) => {
  const response = await ztrade_api.get("api/product/list",tokenConfig(getCookie("token")))
  .then(res=>{
    dispatch({type:ActionTypes.FETCH_PRODUCTS_LENGTH,payload:res.data   })
  }).catch(err=>{
      if(err.response.status == 403){
        dispatch({type:ActionTypes.PRODUCT_PERMISSION_DENINE,payload:[]  })
      }
  });    
}

export const fetchProductsWithPagination = (pageNumber) => async (dispatch) => {
  const response = await ztrade_api.get("api/product/list/pg?page="+pageNumber,tokenConfig(getCookie("token")))
  .then(res=>{
    dispatch({type:ActionTypes.FETCH_PRODUCTS,payload:res.data   })
  }).catch(err=>{
      if(err.response.status == 403){
        dispatch({type:ActionTypes.PRODUCT_PERMISSION_DENINE,payload:[]  })
      }
  });    
}

export const searchProductsNameWithPagination = (productName,item_id,pageNumber) => async (dispatch) => {
  const response = await ztrade_api.get("api/product/list/pg/"+productName+"/"+item_id+"?page="+pageNumber,tokenConfig(getCookie("token")))
  .then(res=>{
    dispatch({type:ActionTypes.FETCH_PRODUCTS,payload:res.data   })
  }).catch(err=>{
      if(err.response.status == 403){
        dispatch({type:ActionTypes.PRODUCT_PERMISSION_DENINE,payload:[]  })
      }
  });    
}

export const searchProductsIdWithPagination = (productName,item_id,pageNumber) => async (dispatch) => {
  const response = await ztrade_api.get("api/product/list/pg/"+productName+"/"+item_id+"?page="+pageNumber,tokenConfig(getCookie("token")))
  .then(res=>{
    dispatch({type:ActionTypes.FETCH_PRODUCTS,payload:res.data   })
  }).catch(err=>{
      if(err.response.status == 403){
        dispatch({type:ActionTypes.PRODUCT_PERMISSION_DENINE,payload:[]  })
      }
  });    
}

export const addProduct = (data) => async (dispatch) =>{

  
    const response = await ztrade_api.post("api/product/create",data,tokenConfig(getCookie("token"))).then(
      res=>{
     
        if(res.status === 201){

          dispatch({type:ActionTypes.SUCCESS_MESSAGE,payload: "Successfully Created"})
          process.env.REACT_APP_STATUS === "development"  ? 
          window.location.href = "http://localhost:3000/dashboard/products" 
          : 
          window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/products`
          
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

  
  const response = await ztrade_api.delete(`api/product/delete/${data}`,tokenConfig(getCookie("token"))).then(
    res=>{
   
      if(res.status === 201){

        dispatch({type:ActionTypes.SUCCESS_MESSAGE,payload: "Successfully Deleted"})
        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/products" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/products`
        
      }
      else{
        dispatch({type:ActionTypes.PRODUCT_MESSAGE,payload: res.error})
      }
    }
  ).catch(err=>{
    dispatch({type:ActionTypes.PRODUCT_MESSAGE,payload: err.response.data})
  }) 

}

export const deleteProductImage = (data) => async (dispatch) =>{

  
  const response = await ztrade_api.delete(`api/product/imagedelete/${data}`,tokenConfig(getCookie("token"))).then(
    res=>{
   
      if(res.status === 200){

        dispatch({type:ActionTypes.SUCCESS_MESSAGE})
        
      }
      else{
        dispatch({type:ActionTypes.PRODUCT_MESSAGE,payload: res.error})
      }
    }
  ).catch(err=>{
    dispatch({type:ActionTypes.PRODUCT_MESSAGE,payload: err.response.data})
  }) 

}

export const updateProduct = (id,data) => async (dispatch) =>{

  
  const response = await ztrade_api.post(`api/product/update/${id}`,data,tokenConfig(getCookie("token"))).then(
    res=>{
   
      if(res.status === 200){

        dispatch({type:ActionTypes.SUCCESS_MESSAGE,payload : "Successfully Updated"})
        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/products" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/products`
        
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
  const response = await ztrade_api.get(`api/product/show/${id}`,tokenConfig(getCookie("token")))
  .then(res=>{
    dispatch({type:ActionTypes.FETCH_SINGLE_PRODUCT,payload:res.data   })
  }).catch(err=>{
    dispatch({type:ActionTypes.FETCH_SINGLE_PRODUCT,payload:[]  })
  });    
}

export const productCleanUp =() =>(dispatch) =>{
  dispatch({type:ActionTypes.PRODUCT_CLEAN_UP,payload : ""})
}

export const singleProductCleanUp =() =>(dispatch) =>{
  dispatch({type:ActionTypes.SINGLE_PRODUCT_CLEAN_UP,payload : ""})
}

export const tokenConfig =(token) =>{
 
  const userToken = JSON.parse(token)
  const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept" : "application/json"
      },
    };
  if(userToken) {
    
      config.headers['Authorization'] = `Bearer ${userToken}`;
  }

  return config;
}