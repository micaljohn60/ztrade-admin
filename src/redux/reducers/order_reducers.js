import { ActionTypes } from "../actions/types";

const staffInitialState = {
    error: false,
    errorMessage: [],
    count: [],
    isLoading: true,
    customerLoading: true,
    staff: [],
    order: [],
    customers: [],
    deninePermission: false,
    deninePermissionMessage: [],
    deninePermission: false,
    deninePermissionMessage: []
}

export const OrderReducer = (state = staffInitialState, { type, payload } = {}) => {

    switch (type) {
        case ActionTypes.FETCH_STAFFS:
            return {
                ...state,
                isLoading: false,
                staff: payload
            }
        case ActionTypes.FETCH_CUSTOMERS:
            return {
                ...state,
                customerLoading: false,
                customers: payload
            }
        case ActionTypes.FETCH_USER_COUNT:
            return {
                ...state,
                isLoading: false,
                count: payload
            }
        case ActionTypes.FETCH_ORDERS:
            return {
                ...state,
                isLoading: false,
                order: payload
            }
        default:
            return state;
    }
};
