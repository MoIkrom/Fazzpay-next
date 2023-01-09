import React, { useEffect, useState } from "react";

import css from "../../../styles/Personalinfo.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useRouter } from "next/router";
import Drawers from "../../../components/drawer/Drawer";
import { useSelector, useDispatch } from "react-redux";
import router from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import authActions from "../../../redux/actions/auth";

function PersonalInformation() {
   const router = useRouter();
   const dispatch = useDispatch();
   const toManagePhone = () => router.push("/profile/changephonenumber");
   const Profiles = useSelector((state) => state.auth.profile);
   //  console.log(Profiles);
   const [email, setEmail] = useState(Profiles.email);
   const [noTelp, setNoTelp] = useState(Profiles.number);
   const [firstName, setFirstName] = useState(Profiles.firstname);
   const [lastName, setLastName] = useState(Profiles.lastname);
   const [edit, setEdit] = useState(true);
   const data = Profiles;
   //  console.log(data);
   const handleFirstname = (e) => {
      setFirstName(e.target.value);
   };
   const handleLastname = (e) => {
      setLastName(e.target.value);
   };

   const handleSave = () => {
      const getId = Cookies.get("id");
      const getToken = Cookies.get("token");
      axios
         .patch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/${getId}`,
            { firstName, lastName },
            {
               headers: {
                  Authorization: `Bearer ${getToken}`,
               },
            }
         )
         .then((res) => {
            // console.log(res.data);
            toast.success(res.data.msg);
            dispatch(authActions.userThunk(getToken, getId));
         })
         .catch((err) => console.log(err));
   };
   useEffect(() => {
      const getToken = Cookies.get("token");
      const getId = Cookies.get(`id`)
      dispatch(authActions.userThunk(getToken, getId));
   }, [dispatch]);
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
                  <div className={""}>
                     <div className={css.content_edit}>
                        <div>
                           <p className={css.personal}>Personal Information</p>
                           <p className={css.personal_desc}>
                              We got your personal information from the sign up
                              proccess. If you want to make changes on your
                              information, contact our support.
                           </p>
                        </div>
                        <div
                           className={`${css.buttonedit} `}
                           onClick={() => {
                              setEdit(!edit);
                              console.log("click");
                           }}
                        >
                           <button className="text-center">Edit</button>
                        </div>
                     </div>
                     <div className={css.box_input}>
                        <p>First Name</p>
                        <input
                           type="text"
                           placeholder="Input firstname"
                           value={firstName}
                           onChange={handleFirstname}
                           disabled={edit}
                        />
                     </div>
                     <div className={css.box_input}>
                        <p>Last Name</p>
                        <input
                           type="text"
                           placeholder="Input lastname"
                           value={lastName}
                           onChange={(e) => {
                              handleLastname(e);
                           }}
                           disabled={edit}
                        />
                     </div>
                     <div className={css.box_input}>
                        <p>Verified E-mail</p>
                        <input
                           type="email"
                           name=""
                           placeholder="Input email"
                           value={email}
                           disabled
                           className="text-muted"
                        />
                     </div>
                     <div className={css.box_input_number}>
                        <div className={css.phone_number}>
                           <p>Phone Number</p>
                           <input
                              type="number"
                              name=""
                              id=""
                              placeholder="Input phone number"
                              disabled
                              value={noTelp}
                           />
                        </div>
                        <div className={css.manage} onClick={toManagePhone}>
                           <p>Manage</p>
                        </div>
                     </div>
                     {!edit ? (
                        <div className="d-flex justify-content-center align-items-center pt-4 my-3">
                           <button
                              className="btn  btn-outline-success me-3 px-5"
                              onClick={() => {
                                 handleSave();
                              }}
                           >
                              <span className={css.buttonsave}>
                                 <i className="fa-solid fa-file-pen" />
                                 Save
                              </span>
                           </button>
                        </div>
                     ) : null}
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

export default PersonalInformation;
