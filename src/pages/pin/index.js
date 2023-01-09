import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import dynamic from "next/dynamic";
const ReactCodeInput = dynamic(import("react-code-input"));
// import css
import css from "../../styles/Pin.module.css";

// import components
import Dashboard from "../../components/dashboard/Dashboard";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Pin() {
   const router = useRouter();
   const [getpin, setGetpin] = useState("");
   const [input, setInput] = useState(true);
   const [inputpending, setInputpending] = useState(true);

   const valuePin = (e) => (
      setInputpending(false), setInput(true), setGetpin(`${e}`)
   );

   const click = () => {
      const id = Cookies.get("id");
      const token = Cookies.get("token");
      if (getpin.length < 6 || !getpin)
         return (
            setInput(false),
            setInputpending(false),
            toast.error("Please input pin correctly")
         );
      axios
         .patch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/pin/${id}`,
            { pin: getpin },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         )
         .then(
            (res) => (
               toast.success(res.data.msg),
               setTimeout(() => {
                  router.push("/pin/success");
               }, 2000)
            )
         )
         .catch(
            (err) => (
               setInput(false),
               setInputpending(false),
               toast.error(err.response.data.msg)
            )
         );
   };

   const props = {
      className: css.reactCodeInput,
      inputStyle: {
         fontFamily: "Nunito Sans",
         marginTop: "60px",
         marginLeft: "7.5px",
         marginRight: "7.5px",
         MozAppearance: "textfield",
         width: "15%",
         borderRadius: "3px",
         fontSize: "30px",
         height: "50px",
         paddingLeft: "7px",
         backgroundColor: "white",
         color: "#3A3D42",
         borderBottom: "2px solid #6379F4",
         textAlign: "center",
      },
   };

   return (
      <>
         <p className={css.title_phone}>FazzPay</p>
         <div className={css.main_content}>
            {/* Content Left */}
            <Dashboard />

            {/* Content Right */}
            <div className={css.content_right}>
               <div className={css.content_form}>
                  <div className={css.phone_view}>
                     <h2 className={css.title_bar_1_phone}>
                        Create Security PIN
                     </h2>
                     <p className={css.title_bar_2_phone}>
                        Create a PIN that`s contain 6 digits number for security
                        purpose in FazzPay.
                     </p>
                  </div>
                  <h2 className={css.title_bar_1}>
                     Secure Your Account, Your Wallet, and Your Data With 6
                     Digits PIN That You Created Yourself.
                  </h2>
                  <p className={css.title_bar_2}>
                     Create 6 digits pin to secure all your money and your data
                     in FazzPay app. Keep it secret and don`t tell anyone about
                     your FazzPay account password and the PIN.
                  </p>

                  <div className={css.pin}>
                     <ReactCodeInput
                        type="number"
                        fields={6}
                        pattern="/^-?\d+\.?\d*$/"
                        onChange={valuePin}
                        {...props}
                     />
                  </div>
                  {/* Action */}
                  <button className={css.confirm} onClick={click}>
                     Confirm
                  </button>
               </div>
            </div>
         </div>
         <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            theme="light"
         />
      </>
   );
}

export default Pin;
