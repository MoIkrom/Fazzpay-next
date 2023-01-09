import React from 'react'
import Image from 'next/image'


import css from "./Dashboard.module.css"

// import image
import pic_phone from "../../assets/dashboard/picture_phone.png"

function Dashboard() {
    return (
        <>
            <div className={css.content_left}>
                <div className={`container ${css.detail_left}`}>
                    <p className={css.title_fazzpay}>FazzPay</p>
                    <Image
                        src={pic_phone}
                        alt="Phone_Picture"
                    // width={200}
                    // height={600}
                    />
                    <p className={css.title_app}>App that Covering Banking Needs.</p>
                    <p className={css.title_desc}>FazzPay is an application that focussing in banking needs for all users
                        in the world. Always updated and always following world trends.
                        5000+ users registered in FazzPay everyday with worldwide
                        users coverage.</p>
                </div>
            </div>
        </>
    )
}

export default Dashboard