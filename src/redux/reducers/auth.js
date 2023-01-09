import { ActionType } from "redux-promise-middleware";
import { ACTION_STRING } from "../actions/actionStrings";

const initialState = {
  isError: false,
  isLoading: false,
  isFulfilled: false,
  error: null,
  profile: {
    image: "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/null",
    number: null,
    firstname: null,
    lastname: null,
    email: null,
    balance: 0,
    amount: 0,
  },
  transactions: {
    receiverId: null,
    amount: 0,
    notes: null,
  },
};

const authReducer = (prevState = initialState, { type, payload }) => {
  const { Pending, Rejected, Fulfilled } = ActionType;
  const { authLogin, authLogout, profile, transactions, submitTf , deleteTf} =
    ACTION_STRING;

  switch (type) {
    // login
    case authLogin.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
        error: null,
      };
    case authLogin.concat("_", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        error: payload.error.response.data.msg,
      };
    case authLogin.concat("_", Fulfilled):
      return {
        ...prevState,
        isError: false,
        isFulfilled: true,
        isLoading: false,
        error: null,
      };

    // logout
    case authLogout.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };
    case authLogout.concat("_", Rejected):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        error: payload.error.response.data.msg,
      };
    case authLogout.concat("_", Fulfilled):
      return initialState;

    // profile
    case profile.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
        error: null,
      };
    case profile.concat("_", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        error: payload.error.response.data.msg,
      };
    case profile.concat("_", Fulfilled):
      return {
        ...prevState,
        isError: false,
        isFulfilled: true,
        isLoading: false,
        error: null,
        profile: {
          image: `${process.env.CLOUD}${payload.data.data.image}`,
          number: payload.data.data.noTelp,
          firstname: payload.data.data.firstName,
          lastname: payload.data.data.lastName,
          email: payload.data.data.email,
          balance: payload.data.data.balance,
          amount: payload.data.data.amount,
        },
      };

    // transactions
    case transactions.concat("_", Fulfilled):
      return {
        ...prevState,
        transactions: {
          receiverId: payload.body.receiverId,
          amount: payload.body.amount,
          notes: payload.body.notes,
        },
      };

    case submitTf.concat("_", Pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
        error: null,
      };
    case submitTf.concat("_", Rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        error: payload.error.response.data.msg,
      };
    case submitTf.concat("_", Fulfilled):
      return {
        ...prevState,
        isError: false,
        isFulfilled: true,
        isLoading: false,
        error: null,
      //   transactions: { receiverId: null, amount: 0, notes: null },
      };

      case deleteTf.concat("_", Fulfilled):
      return {
        ...prevState,
        transactions: {
          receiverId: null,
          amount: 0,
          notes: null,
        },
      };

    default:
      return prevState;
  }
};

export default authReducer;
