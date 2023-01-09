import React from 'react'

import css from "../../styles/Success.module.css"

import Dashboard from '../../components/dashboard/Dashboard'
import { useRouter } from 'next/router'

function Success() {

    const router = useRouter()

    const toDashboard = () => router.push("/home")

    return (
        <>
            <p className={css.title_phone}>FazzPay</p>
            <div className={css.main_content}>
                {/* Content Left */}
                <Dashboard />

                {/* Content Right */}
                <div className={css.content_right}>
                    <div className={css.content_form}>
                        <i className={`fa-sharp fa-solid fa-circle-check ${css.title_bar_1}`}></i>
                        <h2 className={css.title_bar_2}>Your PIN Was Successfully Created</h2>
                        <p className={css.title_bar_3}>Your PIN was successfully created and you can now access all the features in FazzPay.</p>


                        {/* Action */}
                        <button className={css.go_dashboard} onClick={toDashboard}>Go To Dashboard</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Success