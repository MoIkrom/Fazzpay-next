import axios from 'axios';
import Cookies from 'js-cookie';


// const getId = Cookies.get("id");

export const register = (body) => {
    return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, body)
}

export const login = (body) => {
    return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, body)
}

export const getUserId = (token, getId) => {
    return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/${getId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
}

export const logout = (token) => {
    return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
}

export const transactions = (body, token) => {
    return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/transfer`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
}