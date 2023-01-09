import { ActionType } from "redux-promise-middleware";
import { login, logout, getUserId, transactions } from "../../utils/axios";
import { ACTION_STRING } from "./actionStrings";

const { Pending, Rejected, Fulfilled } = ActionType;

// Login
const loginPending = () => ({
  type: ACTION_STRING.authLogin.concat("_", Pending),
});
const loginRejected = (error) => ({
  type: ACTION_STRING.authLogin.concat("_", Rejected),
  payload: { error },
});
const loginFulfilled = (data) => ({
  type: ACTION_STRING.authLogin.concat("_", Fulfilled),
  payload: { data },
});

// logout
const logoutPending = () => ({
  type: ACTION_STRING.authLogout.concat("_", Pending),
});
const logoutRejected = (error) => ({
  type: ACTION_STRING.authLogout.concat("_", Rejected),
  payload: { error },
});
const logoutFulfilled = (data) => ({
  type: ACTION_STRING.authLogout.concat("_", Fulfilled),
  payload: { data },
});

// Get id user
const profilePending = () => ({
  type: ACTION_STRING.profile.concat("_", Pending),
});
const profileRejected = (error) => ({
  type: ACTION_STRING.profile.concat("_", Rejected),
  payload: { error },
});
const profileFulfilled = (data) => ({
  type: ACTION_STRING.profile.concat("_", Fulfilled),
  payload: { data },
});

// Get data transaksi
const transactionsFulfilled = (body) => ({
  type: ACTION_STRING.transactions.concat("_", Fulfilled),
  payload: { body },
});

const loginThunk = (body, router, cbError) => {
  return async (dispacth) => {
    try {
      dispacth(loginPending());
      const result = await login(body);
      dispacth(loginFulfilled(result.data));
      if (typeof router === "function") router();
    } catch (error) {
      dispacth(loginRejected(error));
      if (typeof navigate === "function") cbError();
    }
  };
};

const logoutThunk = (token) => {
  return async (dispacth) => {
    try {
      dispacth(logoutPending());
      const result = await logout(token);
      dispacth(logoutFulfilled(result.data));
      if (typeof router === "function") router();
    } catch (error) {
      dispacth(logoutRejected(error));
    }
  };
};

const userThunk = (token, getId) => {
  return async (dispacth) => {
    try {
      dispacth(profilePending());
      const result = await getUserId(token, getId);
      dispacth(profileFulfilled(result.data));
      if (typeof router === "function") router();
    } catch (error) {
      dispacth(profileRejected(error));
    }
  };
};

const transactionsThunk = (body, router) => {
  return async (dispacth) => {
    try {
      dispacth(transactionsFulfilled(body));
      if (typeof router === "function") router();
    } catch {
      (error) => {
        console.log(error);
      };
    }
  };
};

const transactionSubmitPending = () => ({
  type: ACTION_STRING.submitTf.concat("_", Pending),
});
const trasactionSubmitRejected = (error) => ({
  type: ACTION_STRING.submitTf.concat("_", Rejected),
  payload: { error },
});
const trasactionSubmitFulfilled = (data) => ({
  type: ACTION_STRING.submitTf.concat("_", Fulfilled),
  payload: { data },
});

const transactionsSubmitThunk = (body, token, router, cbError) => {
  return async (dispacth) => {
    try {
      dispacth(transactionSubmitPending());
      const result = await transactions(body, token);
      dispacth(trasactionSubmitFulfilled(result.data));
      if (typeof router === "function") router();
    } catch (error) {
      dispacth(trasactionSubmitRejected(error));
      if (typeof router === "function") cbError();
    }
  };
};

const transactionDeletePending = () => ({
  type: ACTION_STRING.deleteTf.concat("_", Pending),
});
const trasactionDeleteRejected = (error) => ({
  type: ACTION_STRING.deleteTf.concat("_", Rejected),
  payload: { error },
});
const trasactionDeleteFulfilled = () => ({
  type: ACTION_STRING.deleteTf.concat("_", Fulfilled),
});

const transactionsDeleteThunk = () => {
  return async (dispacth) => {
    try {
      dispacth(trasactionDeleteFulfilled());
    } catch {
      (error) => {
        console.log(error);
      };
    }
  };
};

const loginActions = {
  loginThunk,
  logoutThunk,
  userThunk,
  transactionsThunk,
  transactionsSubmitThunk,
  transactionsDeleteThunk,
};

export default loginActions;
