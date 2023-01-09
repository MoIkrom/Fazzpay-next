import React, { useState } from 'react'


// import css
import css from "../../styles/Reset.module.css"

// import component
import Dashboard from '../../components/dashboard/Dashboard'
import Router, { useRouter } from 'next/router';
import axios from 'axios';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Reset() {

    const router = useRouter();

    const [type, setType] = useState("password");
    const [icon, setIcon] = useState("fa-solid fa-eye-slash");
    const [type_, setType_] = useState("password");
    const [icon_, setIcon_] = useState("fa-solid fa-eye-slash");
    const [password, setPassword] = useState()
    const [confirm, setConfirm] = useState()
    const [input, setInput] = useState(true)
    const [inputpending, setInputpending] = useState(true)



    // handleToggle1 => Show Password
    const handleToggle1 = () => {
        if (type === 'password') {
            setIcon("fa-regular fa-eye");
            setType('text');
        } else {
            setIcon("fa-solid fa-eye-slash");
            setType('password')
        }
    }

    // handleToggle2 => Show Password
    const handleToggle2 = () => {
        if (type_ === 'password') {
            setIcon_("fa-regular fa-eye");
            setType_('text');
        } else {
            setIcon_("fa-solid fa-eye-slash");
            setType_('password')
        }
    }

    const valuePassword = (e) => {
        setInputpending(false),
            setInput(true),
            setPassword(e.target.value)
    }

    const valueConfirm = (e) => {
        setInputpending(false),
            setInput(true),
            setConfirm(e.target.value);
    }

    const resetPassword = () => {
        if (!password || !confirm)
            return (
                setInput(false),
                setInputpending(false),
                toast.error("Data cannot be empty")
            )
        axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`, {
            keysChangePassword: parseInt(router.query.otp),
            newPassword: password,
            confirmPassword: confirm,
        })
            .then((res) => (
                toast.success(res.data.msg),
                setTimeout(() => (
                    Router.push("/login")
                ), 2000)
            ))
            .catch((err) => (
                setInput(false),
                setInputpending(false),
                toast.error(err.response.data.msg)
            ))
    }

    return (
        <>
            <p className={css.title_phone}>FazzPay</p>
            <div className={css.main_content}>
                {/* Content Left */}
                <Dashboard />

                {/* Content Right */}
                <div className={css.content_right}>
                    <div className={css.content_form}>
                        <h2 className={css.title_bar_1}>Did You Forgot Your Password? Don`t Worry, You Can Reset Your Password In a Minutes.</h2>
                        <p className={css.title_bar_2}>To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</p>
                        <div className={css.phone_view}>
                            <h2 className={css.title_bar_1_phone}>Reset Password</h2>
                            <p className={css.title_bar_2_phone}>Enter your FazzPay e-mail so we can send you a password reset link.</p>
                        </div>
                        <div className={css.password}>
                            <i className={`fa-solid fa-lock ${(inputpending) ? "text-secondary" : (input) ? "text-primary" : "text-danger"}`}></i>
                            <input
                                type={type}
                                name="newPassword"
                                id=""
                                onChange={valuePassword}
                                placeholder='Create new password' />
                            <i className={icon} onClick={handleToggle1}></i>
                        </div>
                        <div className={css.password}>
                            <i className={`fa-solid fa-lock ${(inputpending) ? "text-secondary" : (input) ? "text-primary" : "text-danger"}`}></i>
                            <input
                                type={type_}
                                name="confirmPassword"
                                id=""
                                onChange={valueConfirm}
                                placeholder='Confirm new password' />
                            <i className={icon_} onClick={handleToggle2}></i>
                        </div>
                        <button className={css.confirm} onClick={resetPassword}>Reset Password</button>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick={true}
                pauseOnHover={true}
                draggable={true}
                theme="light"
            />
        </>
    )
}

export default Reset