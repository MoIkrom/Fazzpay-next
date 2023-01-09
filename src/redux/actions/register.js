import { ActionType } from "redux-promise-middleware";
import { register } from "../../utils/axios";
import { ACTION_STRING } from "./actionStrings";

const { Pending, Rejected, Fulfilled } = ActionType;

const registerPending = () => ({
    type: ACTION_STRING.register.concat("_", Pending),
});
const registerRejected = (error) => ({
    type: ACTION_STRING.register.concat("_", Rejected),
    payload: { error },
});
const registerFulfilled = (data) => ({
    type: ACTION_STRING.register.concat("_", Fulfilled),
    payload: { data },
});


const registerThunk = (body, router, cbError) => {
    return async (dispacth) => {
        try {
            dispacth(registerPending());
            const result = await register(body);
            dispacth(registerFulfilled(result.data));
            if (typeof router === "function") router();
        } catch (error) {
            dispacth(registerRejected(error));
            if (typeof router === "function") cbError();
        }
    };
};

const registerActions = { registerThunk };

export default registerActions;