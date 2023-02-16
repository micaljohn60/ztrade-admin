import { getCookie } from "src/cookies/cookie";
import ztrade_api from "../../api/ztrade_api";
import { ActionTypes } from "./types";

// export const fetchRoleAndPermissions = () => async (dispatch) => {
//     const response = await ztrade_api.get("api/category/list")
//     .then(res=>{
//       dispatch({type:ActionTypes.FETCH_CATEGORIES,payload:res.data   })
//     }).catch(err=>{
//       dispatch({type:ActionTypes.FETCH_CATEGORIES,payload:[]  })
//     });    
// }


export const deleteRole = (id) => async (dispatch) =>{
  const response = await ztrade_api.delete(`api/role/delete/${id}`,tokenConfig(getCookie("token"))).then(
    res=>{
   
      if(res.status === 200){
        alert("Deleted SuccessFully")
        process.env.REACT_APP_STATUS === "development"  ? 
        window.location.href = "http://localhost:3000/dashboard/rolesandpermisions" 
        : 
        window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/rolesandpermisions`
        
      }
    }
  ).catch(err=>{
    alert(err)
  })
}

export const fetchRolesAndPermissions = () => async (dispatch) => {
    const response = await ztrade_api.get("api/permission/lists",tokenConfig(getCookie("token")))
    .then(res=>{
      dispatch({type:ActionTypes.FETCH_PERMISSION,payload:res.data   })
    }).catch(err=>{
      if(err.response.status === 403){
        dispatch({type:ActionTypes.FETCH_PERMISSION,payload:[]  })
      }
      
    });    
}

export const addRoleAndPermissionAction = (data) => async (dispatch) => {
  const response = await ztrade_api.post("api/addroleandpermision",data,tokenConfig(getCookie("token")))
  .then(res=>{
    
    if(res.status === 201){

      process.env.REACT_APP_STATUS === "development"  ? 
      window.location.href = "http://localhost:3000/dashboard/rolesandpermisions" 
      : 
      window.location.href = `${process.env.REACT_APP_WEB_ADMIN_PRODUCTION_PORT}dashboard/rolesandpermisions`
    
    }
  }).catch(err=>{
    
      alert("You cannot add roles by following reason\n 1: Roles Name cannot be the same \n 2: A Role need at least one permission \n ")
    
    // dispatch({type:ActionTypes.FETCH_PERMISSION,payload:[]  })
  });    
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