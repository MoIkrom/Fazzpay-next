import React, { useState } from 'react'

// import css
import css from "../../styles/Resetpassword.module.css"

// import components
import Dashboard from '../../components/dashboard/Dashboard'
import Link from 'next/link'
import axios from 'axios'

// import toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Resetpassword() {

    const [email, setEmail] = useState("")
    const [input, setInput] = useState(true)
    const [inputpending, setInputpending] = useState(true)

    const changeHandler = (e) => (
        setInputpending(false),
        setInput(true),
        setEmail(e.target.value)
    )

    const resetpassword = () => {
        if (!email)
            return (
                setInput(false),
                setInputpending(false),
                toast.error("Data cannot be empty")
            )
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`, {
            email,
            linkDirect: "http://localhost:3000/resetpassword"
        })
            .then((res) =>
                toast.success(res.data.msg)
            )
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
                    <div className={css.content_form} onSubmit={resetpassword}>
                        <h2 className={css.title_bar_1}>Did You Forgot Your Password? Don`t Worry, You Can Reset Your Password In a Minutes.</h2>
                        <p className={css.title_bar_2}>To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</p>
                        <div className={css.phone_view}>
                            <h2 className={css.title_bar_1_phone}>Reset Password</h2>
                            <p className={css.title_bar_2_phone}>Enter your FazzPay e-mail so we can send you a password reset link.</p>
                        </div>
                        <div className={css.email}>
                            <i className={`fa-regular fa-envelope ${(inputpending) ? "text-secondary" : (input) ? "text-primary" : "text-danger"}`}></i>
                            <input type="email" name="" id="" onChange={changeHandler} placeholder='Enter your e-mail' />
                        </div>
                        <button className={css.confirm} onClick={resetpassword}>Confirm</button>
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

export default Resetpassword