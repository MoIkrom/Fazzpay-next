import React, { useState } from "react";

import css from "../../../styles/ChangePhone.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Sidebar from "../../../components/sidebar/Sidebar";
import Drawers from "../../../components/drawer/Drawer";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function ChangePhoneNumber() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const id = Cookies.get("id");
  const token = Cookies.get("token");
  const router = useRouter();

  const valueNumber = (e) => {
    if (e.target.value.length === 0) setPhoneNumber("");
    if (/[0-9]{1,12}/g.test(e.target.value[e.target.value.length - 1])) setPhoneNumber(e.target.value);
  };

  const clickHandler = () => {
    if (!phoneNumber) return toast.error("Phone number can't empty")
    if (phoneNumber.charAt(0) !== "0") {
      setPhoneNumber(`0${phoneNumber}`);
    }
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/${id}`,
        {
          noTelp: phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) =>
        toast.success(res.data.msg),
        setTimeout(() => {
          return router.replace("/profile");
        }, 2000)
      )
      .catch((err) => toast.error(err.response.data.msg));
  };

  return (
    <>
      <Header />
      <div className={`container-fluid ${css.background_container}`}>
        <div className={`container d-flex gap-4 ${css.content_inti}`}>
          <section className="col-12 col-sm-12 col-md-3 d-none d-sm-none d-lg-block ">
            <Sidebar page="profile child" />
          </section>
          <div className={`col-lg-9 col-md-12 col-sm-12 ${css.content_right}`}>
            <section className={`d-flex flex-column`}>
              <div className={`${css.tittle}`}>Edit Phone Number</div>
              <div className={`${css.desc}`}>
                Add at least one phone number for the transfer ID so you can
                start transfering your money to another user.
              </div>
            </section>
            <section className={`${css.bottomContainer}`}>
              <div className={`${css.inputContainer}`}>
                <div className={`${css.input}`}>
                  <i class={`fa-sharp fa-solid fa-phone`}></i>
                  <span className={`${css.number62}`}>+62</span>
                  <span className={`${css.inputNumber}`}>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      fields={6}
                      maxLength={12}
                      pattern="[0-9]{12}"
                      onChange={valueNumber}
                      required
                    />
                  </span>
                </div>
              </div>
              <div className={`${css.btnContainer}`}>
                <div className={`${css.btn}`} onClick={clickHandler}>
                  Edit Phone Number
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

export default ChangePhoneNumber;
