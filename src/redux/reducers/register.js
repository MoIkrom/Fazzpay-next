import { ActionType } from "redux-promise-middleware";
import { ACTION_STRING } from "../actions/actionStrings";

const initialState = {
    error: null,
    isError: false,
    isLoading: false,
    isFulfilled: false,
    isfield: null,
};

const registerReducer = (prevState = initialState, { type, payload }) => {
    const { Pending, Rejected, Fulfilled } = ActionType;
    const { register } = ACTION_STRING;
    switch (type) {
        case register.concat("_", Pending):
            return {
                ...prevState,
                isLoading: true,
                isError: false,
                isFulfilled: false,
                isfield: null,
            };
        case register.concat("_", Rejected):
            return {
                ...prevState,
                isLoading: false,
                isError: true,
                isFulfilled: false,
                isfield: true,
                error: payload.error.response.data.msg,
            };
        case register.concat("_", Fulfilled):
            return {
                ...prevState,
                isLoading: false,
                isError: false,
                isFulfilled: true,
                isfield: false,
                error: null,
            };
        default:
            return prevState;
    }
};

export default registerReducer;