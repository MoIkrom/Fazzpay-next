import Image from "next/image";
import React, { useEffect, useState } from "react";

import css from "../../styles/Profile.module.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import image_profile from "../../assets/profile_transfer/profile_image.png";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authActions from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Drawers from "../../components/drawer/Drawer";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const [image, setImage] = useState("");
  const [display, setDisplay] = useState(profile.image);
  const [btnsave, setBtnsave] = useState(false);
  const [show, setShow] = useState(false);

  const toPersonalinfo = () => router.push("/profile/personalinfo");
  const toChangepassword = () => router.push("/profile/changepassword");
  const toChangepin = () => router.push("/profile/changepin");

  const handleSaveShow = () => {
    setBtnsave(true);
  };

  // Get user by id
  const Editimage = () => {
    const getId = Cookies.get("id");
    const getToken = Cookies.get("token");
    const formData = new FormData();
    if (image) formData.append("image", image);
    axios
      .patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/image/${getId}`, formData, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then(
        (res) => (
          console.log(res),
          toast.success(res.data.msg),
          dispatch(authActions.userThunk(getToken, getId))
        )
      )
      .catch((err) => toast.error(err.response.data.msg));
  };

  // inputImage => preview image
  const inputImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDisplay(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  useEffect(() => {
    const getToken = Cookies.get("token");
    const getId = Cookies.get(`id`)
    dispatch(authActions.userThunk(getToken, getId));
  }, [dispatch]);

  // handleClose, handleShow => Show Modals
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    const getToken = Cookies.get("token");
    dispatch(authActions.logoutThunk(getToken)),
      Cookies.remove("id"),
      Cookies.remove("token");
    toast.success("Logout Success"),
      setTimeout(() => {
        router.push("/");
      }, 2000);
  };
  const handleCancel = () => {
    setDisplay(profile.image), setBtnsave(false);
  };
  return (
    <>
      <Header />
      <div className={`container-fluid ${css.background_container}`}>
        <div className={`container d-flex gap-4 ${css.content_inti}`}>
          <section className="col-12 col-sm-12 col-md-3 d-none d-sm-none d-lg-block ">
            <Sidebar page="profile" />
          </section>
          <div className={`col-lg-9 col-md-12 col-sm-12 ${css.content_right}`}>
            <div className={css.content_profile}>
              <Image
                className="rounded-3"
                src={
                  display ===
                    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/null"
                    ? `${process.env.CLOUDINARY_LINK}`
                    : display
                }
                alt="image"
                width={90}
                height={90}
              />

              <div
                className={btnsave ? "d-none" : `${css.profile_edit}`}
                onClick={handleSaveShow}
              >
                {/* <i className="fa-solid fa-pencil"></i> */}
                <label htmlFor="file">Edit</label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={inputImage}
                  className="d-none"
                />
              </div>
              <div className={btnsave ? `${css.profile_button}` : "d-none"}>
                <button
                  className={css.btn_save_profile}
                  onClick={() => (Editimage(), setBtnsave(false))}
                >
                  Save Profile
                </button>
                <button
                  className={css.btn_cancel_profile}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>

              <p className={css.name}>
                {profile.firstname} {profile.lastname}
              </p>
              <p className={css.phone}>
                {profile.number === null
                  ? "'Please Manage phone number'"
                  : profile.number}
              </p>
              <div className={`${css.profile_link}`} onClick={toPersonalinfo}>
                <p>Personal Information</p>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
              <div className={`${css.profile_link}`} onClick={toChangepassword}>
                <p>Change Password</p>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
              <div className={`${css.profile_link}`} onClick={toChangepin}>
                <p>Change PIN</p>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
              <div className={`${css.notifikasi}`}>
                <p>Notification</p>
                <label className={css.switch}>
                  <input type="checkbox" />
                  <span className={`${css.slider} ${css.round}`}></span>
                </label>
              </div>
              <div className={`${css.profile_link}`} onClick={handleShow}>
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            className="fw-bold text-bg-success text-white"
            onClick={handleLogout}
          >
            Yes
          </Button>
          <Button
            variant="danger"
            className="fw-bold text-bg-danger text-white"
            onClick={handleClose}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="light"
      />
      <Drawers pages="profile" />
    </>
  );
}

export default Profile;
