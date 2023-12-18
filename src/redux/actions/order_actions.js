import { getCookie } from "src/cookies/cookie";
import ztrade_api from "../../api/ztrade_api";
import { ActionTypes } from "./types";

export const fetchCustomers = (data) => async (dispatch) => {
    const response = await ztrade_api.get("api/customers", tokenConfig(getCookie("token"))).then(
        res => {
            if (res.status === 200) {
                dispatch({
                    type: ActionTypes.FETCH_CUSTOMERS,
                    payload: res.data
                })
            }
        }
    ).catch(err => {
        console.log(err)

        // dispatch(returnErrors(err.response.data,err.response.status));
    })
}

export const fetchStaffs = (data) => async (dispatch) => {
    const response = await ztrade_api.get("api/staffs", data).then(
        res => {
            if (res.status === 200) {
                dispatch({
                    type: ActionTypes.FETCH_STAFFS,
                    payload: res.data
                })
            }
        }
    ).catch(err => {
        console.log(err)

        // dispatch(returnErrors(err.response.data,err.response.status));
    })
}

export const fetchOrders = (data) => async (dispatch) => {
    const response = await ztrade_api.get("api/orders", tokenConfig(getCookie("token"))).then(
        res => {
            if (res.status === 200) {
                dispatch({
                    type: ActionTypes.FETCH_ORDERS,
                    payload: res.data
                })
            }
        }
    ).catch(err => {
        console.log(err)

        // dispatch(returnErrors(err.response.data,err.response.status));
    })
}

export const tokenConfig = (token) => {

    const userToken = JSON.parse(token)
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json"
        },
    };
    if (userToken) {

        config.headers['Authorization'] = `Bearer ${userToken}`;
    }

    return config;
}
