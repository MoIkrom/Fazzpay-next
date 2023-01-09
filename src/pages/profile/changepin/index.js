import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const ReactCodeInput = dynamic(import("react-code-input"));

import css from "../../../styles/ChangePin.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Sidebar from "../../../components/sidebar/Sidebar";
import Drawers from "../../../components/drawer/Drawer";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
function ChangePin() {
   const [getpin, setGetpin] = useState("");
   const [input, setInput] = useState(true);
   const [inputpending, setInputpending] = useState(true);

   const valuePin = (e) => (
      setInputpending(false), setInput(true), setGetpin(`${e}`)
   );
   const router = useRouter();
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

   const handleContinue = () => {
      const getId = Cookies.get("id");
      const getToken = Cookies.get("token");
      axios
         .get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/pin/${getpin}`,

            {
               headers: {
                  Authorization: `Bearer ${getToken}`,
               },
            }
         )
         .then((res) => {
            console.log(res.data);
            toast.success(res.data.msg);
            setTimeout(() => {
               router.replace("/profile/changenewpin");
            }, 2000);
         })
         .catch((err) => {
            toast.error(err.response.data.msg);
            // console.log(err);
         });
   };

   return (
      <>
         <Header />
         <div className={`container-fluid ${css.background_container}`}>
            <div className={`container d-flex gap-4 ${css.content_inti}`}>
               <section className="col-12 col-sm-12 col-md-3 d-none d-sm-none d-lg-block ">
                  <Sidebar page="profile child" />
               </section>
               <div
                  className={`col-lg-9 col-md-12 col-sm-12 ${css.content_right}`}
               >
                  <section className={`d-flex flex-column`}>
                     <div className={`${css.tittle}`}>Change PIN</div>
                     <div className={`${css.desc}`}>
                        Enter your current 6 digits Fazzpay PIN below to
                        continue to the next steps.
                     </div>
                  </section>
                  <section className={`${css.bottomContainer}`}>
                     <div className={`${css.inputContainer}`}>
                        <div className={`${css.inputPin}`}>
                           <div className={css.pin}>
                              <ReactCodeInput
                                 type="number"
                                 fields={6}
                                 pattern="/^-?\d+\.?\d*$/"
                                 onChange={valuePin}
                                 {...props}
                              />
                           </div>
                        </div>
                     </div>
                     <div className={`${css.btnContainer}`}>
                        <div className={`${css.btn}`} onClick={handleContinue}>
                           Countinue
                        </div>
                     </div>
                  </section>
               </div>
            </div>
         </div>
         <Footer />
         <Drawers pages="profile child" />
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

export default ChangePin;
