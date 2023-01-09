import React, { useState } from "react";

import css from "../../../styles/Changepassword.module.css";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Sidebar from "../../../components/sidebar/Sidebar";
import Drawers from "../../../components/drawer/Drawer";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function Changepassword() {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("fa-solid fa-eye-slash");
  const [type_, setType_] = useState("password");
  const [icon_, setIcon_] = useState("fa-solid fa-eye-slash");
  const [type__, setType__] = useState("password");
  const [icon__, setIcon__] = useState("fa-solid fa-eye-slash");
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [repeat, setRepeat] = useState();
  const [input, setInput] = useState(true);
  const [inputpending, setInputpending] = useState(true);
  const [input_, setInput_] = useState(true);
  const [inputpending_, setInputpending_] = useState(true);
  const [input__, setInput__] = useState(true);
  const [inputpending__, setInputpending__] = useState(true);

  // handleToggle1 => Show Password
  const handleToggle1 = () => {
    if (type === "password") {
      setIcon("fa-regular fa-eye");
      setType("text");
    } else {
      setIcon("fa-solid fa-eye-slash");
      setType("password");
    }
  };
  // handleToggle2 => Show Password
  const handleToggle2 = () => {
    if (type_ === "password") {
      setIcon_("fa-regular fa-eye");
      setType_("text");
    } else {
      setIcon_("fa-solid fa-eye-slash");
      setType_("password");
    }
  };
  const handleToggle3 = () => {
    if (type__ === "password") {
      setIcon__("fa-regular fa-eye");
      setType__("text");
    } else {
      setIcon__("fa-solid fa-eye-slash");
      setType__("password");
    }
  };

  const valuePassword = (e) => {
    setInputpending(false),
      setInput(true),
      setIcon("fa-solid fa-eye-slash"),
      setType("password"),
      setPassword(e.target.value);
  };

  const valueConfirm = (e) => {
    setInputpending_(false),
      setInput_(true),
      setIcon_("fa-solid fa-eye-slash"),
      setType_("password"),
      setConfirm(e.target.value);
  };

  const valueRepeat = (e) => {
    setInputpending__(false),
      setInput__(true),
      setIcon__("fa-solid fa-eye-slash"),
      setType__("password"),
      setRepeat(e.target.value);
  };

  const router = useRouter();

  const id = Cookies.get("id");
  const token = Cookies.get("token");
  const clickHandler = () => {
    if (!password || !confirm || !repeat)
      return (
        setInput(false),
        setInputpending(false),
        setInput_(false),
        setInputpending_(false),
        setInput__(false),
        setInputpending__(false),
        toast.error("Input must be field")
      )
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/password/${id}`,
        {
          oldPassword: password,
          newPassword: confirm,
          confirmPassword: repeat,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(
        (res) => (
          setInputpending(false),
          setInput(true),
          setInputpending_(false),
          setInput_(true),
          setInputpending__(false),
          setInput__(true),
          toast.success(res.data.msg),
          setTimeout(() => { return router.replace("/profile") }, 2000)
        )
      )
      .catch(
        (err) => (
          setInput(false),
          setInputpending(false),
          setInput_(false),
          setInputpending_(false),
          setInput__(false),
          setInputpending__(false),
          toast.error(err.response.data.msg)
        )
      );
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
            <div className="d-flex flex-column">
              <p className={css.title_password}>Change Password</p>
              <p className={css.title_desc}>
                You must enter your current password and then type your new
                password twice.
              </p>
              <div className={css.content_password}>
                <div
                  className={`${inputpending
                    ? css.password
                    : input
                      ? css.password_blue
                      : css.password_red
                    }`}
                >
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type={type}
                    name="newPassword"
                    id=""
                    onChange={valuePassword}
                    placeholder="Current password"
                  />
                  <i className={icon} onClick={handleToggle1}></i>
                </div>
                <div
                  className={`${inputpending_
                    ? css.password
                    : input_
                      ? css.password_blue
                      : css.password_red
                    }`}
                >
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type={type_}
                    name="confirmPassword"
                    id=""
                    onChange={valueConfirm}
                    placeholder="New password"
                  />
                  <i className={icon_} onClick={handleToggle2}></i>
                </div>
                <div
                  className={`${inputpending__
                    ? css.password
                    : input__
                      ? css.password_blue
                      : css.password_red
                    }`}
                >
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type={type__}
                    name="repeatPassword"
                    id=""
                    onChange={valueRepeat}
                    placeholder="New password"
                  />
                  <i className={icon__} onClick={handleToggle3}></i>
                </div>
              </div>
              <div className={css.button_change_password}>
                <button onClick={clickHandler}>Change Password</button>
              </div>
            </div>
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

export default Changepassword;
