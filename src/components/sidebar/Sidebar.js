import React, { useState } from "react";

//import css
import styles from "../../components/sidebar/sidebar.module.css";

//import image
import Image from "next/image";
import icon_grid from "../../assets/dashboard/icon_grid.png";
import icon_arrow_up from "../../assets/dashboard/icon_arrow_up.png";
import icon_log_out from "../../assets/dashboard/icon_log_out.png";
import icon_user from "../../assets/dashboard/icon_user.png";
import icon_plus from "../../assets/dashboard/icon_plus.png";

// import redux
import authActions from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Link from "next/link";
function Sidebar({ page }) {
   const router = useRouter();
   const dispatch = useDispatch();

   const [show, setShow] = useState(false);
   const [showmodal, setShowmodal] = useState(false);

   const handleShow = () => {
      console.log(show), setShow(false);
   };

   const handleclickshow = () => {
      console.log(show), setShow(true);
   };

   const homeClickHandler = () => {
      router.push("/home");
   };

   const profleClickHandler = () => {
      router.push("/profile");
   };
   const transferClickHandler = () => {
      router.push("/transfer");
   };

   const handleClosemodal = () => setShowmodal(false);
   const handleShowmodal = () => setShowmodal(true);

   const handleLogout = () => {
      const getToken = Cookies.get("token");
      dispatch(authActions.logoutThunk(getToken)),
         Cookies.remove("id"),
         Cookies.remove("token");
      toast.success("Logout Success");
      setTimeout(() => {
         router.push("/");
      }, 2000);
   };
   // Topup
   const [price, setPrice] = useState("");
   const [link, setLink] = useState("");

   const valuePrice = (e) => {
      if (e.target.value.length === 0) setPrice("");
      if (/[0-9]{1,12}/g.test(e.target.value[e.target.value.length - 1]))
         setPrice(e.target.value);
   };

   const handleTopup = () => {
      const getToken = Cookies.get("token");
      axios
         .post(
            `https://fazzpay-rose.vercel.app/transaction/top-up`,
            {
               amount: price,
            },
            {
               headers: {
                  Authorization: `Bearer ${getToken}`,
               },
            }
         )
         .then(
            (res) => setLink(res.data.data.redirectUrl),
            setTimeout(() => {
               setShow(false);
            }, 7000)
         )
         .catch((err) => toast.error(err.response.data.msg));
   };

   if (page === "home")
      return (
         <>
            <div className={`${styles["content-left"]} w-100`}>
               <div className={styles["content-bar"]}>
                  <div
                     className={`${styles["content-board"]} ${styles[`border-left`]
                        }`}
                  >
                     <i className="bi bi-grid-fill fs-4 text-primary"></i>
                     <p className={`${styles["dashboard"]} `}>Dashboard</p>
                  </div>
                  <div
                     className={styles["content-board"]}
                     onClick={transferClickHandler}
                  >
                     <i className="bi bi-wallet2 fs-4"></i>
                     <p className={styles["transfer"]}>Transfer</p>
                  </div>
                  <div
                     className={styles["content-board"]}
                     onClick={handleclickshow}
                  >
                     <i className="bi bi-plus-circle fs-4"></i>
                     <p className={styles["topup"]}>Top Up</p>
                  </div>
                  <div
                     className={styles["content-board"]}
                     onClick={profleClickHandler}
                  >
                     <i className="bi bi-person-plus-fill fs-4"></i>
                     <p className={styles["profile"]}>Profile</p>
                  </div>
               </div>
               <div className={styles["content-logout"]}>
                  <Image src={icon_log_out} alt="icon_log_out" />
                  <p className={styles["logout"]} onClick={handleShowmodal}>
                     Logout
                  </p>
               </div>
            </div>

            {!show ? null : (
               <section className={`${styles.box}`}>
                  <section className={styles.content_box}>
                     <span
                        className="d-flex justify-content-between"
                        onClick={() => setShow(false)}
                     >
                        <h3 className={styles.title_modal}>Topup</h3>
                        <div className={styles.cursor} onClick={handleShow}>
                           <i className="fa-solid fa-xmark fs-2"></i>
                        </div>
                     </span>
                     <p className={styles.desc_modal}>
                        Enter the amount of money, and click <br /> submit
                     </p>
                     <span className={styles.input_}>
                        <input
                           type="tel"
                           className={styles.arrow}
                           value={price}
                           onChange={valuePrice}
                        />
                     </span>
                     <br />
                     {link === "" ? null : (
                        <Link href={link} target="_blank">
                           Topup Payment Click Here
                        </Link>
                     )}
                     <span className="d-flex justify-content-end align-items-center">
                        <button
                           onClick={handleTopup}
                           className={styles.btn_submit}
                        >
                           Submit
                        </button>
                     </span>
                  </section>
               </section>
            )}

            <ToastContainer
               position="top-center"
               autoClose={2000}
               hideProgressBar={false}
               closeOnClick={true}
               pauseOnHover={true}
               draggable={true}
               theme="light"
            />
            <Modal
               show={showmodal}
               onHide={handleClosemodal}
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
                     onClick={handleClosemodal}
                  >
                     No
                  </Button>
               </Modal.Footer>
            </Modal>
         </>
      );

   if (page === "home child")
      return (
         <>
            <div className={`${styles["content-left"]} w-100`}>
               <div className={styles["content-bar"]}>
                  <div
                     className={`${styles["content-board"]} ${styles[`border-left`]
                        }`}
                     onClick={homeClickHandler}
                  >
                     <i className="bi bi-grid-fill fs-4 text-primary"></i>
                     <p className={`${styles["dashboard"]} `}>Dashboard</p>
                  </div>
                  <div
                     className={styles["content-board"]}
                     onClick={transferClickHandler}
                  >
                     <i className="bi bi-wallet2 fs-4"></i>
                     <p className={styles["transfer"]}>Transfer</p>
                  </div>
                  <div
                     className={styles["content-board"]}
                     onClick={() => setShow(true)}
                  >
                     <i className="bi bi-plus-circle fs-4"></i>
                     <p className={styles["topup"]}>Top Up</p>
                  </div>
                  <div
                     className={styles["content-board"]}
                     onClick={profleClickHandler}
                  >
                     <i className="bi bi-person-plus-fill fs-4"></i>
                     <p className={styles["profile"]}>Profile</p>
                  </div>
               </div>
               <div className={styles["content-logout"]}>
                  <Image src={icon_log_out} alt="icon_log_out" />
                  <p className={styles["logout"]} onClick={handleShowmodal}>
                     Logout
                  </p>
               </div>
            </div>

            {!show ? null : (
               <section className={`${styles.box}`}>
                  <section className={styles.content_box}>
                     <span
                        className="d-flex justify-content-between"
                        onClick={() => setShow(false)}
                     >
                        <h3 className={styles.title_modal}>Topup</h3>
                        <div className={styles.cursor} onClick={handleShow}>
                           <i className="fa-solid fa-xmark fs-2"></i>
                        </div>
                     </span>
                     <p className={styles.desc_modal}>
                        Enter the amount of money, and click <br /> submit
                     </p>
                     <span className={styles.input_}>
                        <input
                           type="tel"
                           className={styles.arrow}
                           value={price}
                           onChange={valuePrice}
                        />
                     </span>
                     <br />
                     {link === "" ? null : (
                        <Link href={link} target="_blank">
                           Topup Payment Click Here
                        </Link>
                     )}
                     <span className="d-flex justify-content-end align-items-center">
                        <button
                           onClick={handleTopup}
                           className={styles.btn_submit}
                        >
                           Submit
                        </button>
                     </span>
                  </section>
               </section>
            )}
            <ToastContainer
               position="top-center"
               autoClose={2000}
               hideProgressBar={false}
               closeOnClick={true}
               pauseOnHover={true}
               draggable={true}
               theme="light"
            />
            <Modal
               show={showmodal}
               onHide={handleClosemodal}
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
                     onClick={handleClosemodal}
                  >
                     No
                  </Button>
               </Modal.Footer>
            </Modal>
         </>
      );

   if (page === "profile") {
      return (
         <>
            <div className={`${styles["content-left"]} w-100`}>
               <div className={styles["content-bar"]}>
                  <div
                     className={`${styles["content-board"]}`}
                     onClick={homeClickHandler}
                  >
                     <i className="bi bi-grid-fill fs-4"></i>
                     <p className={`${styles["dashboard"]} `}>Dashboard</p>
                  </div>
                  <div
                     className={styles["content-board"]}
                     onClick={transferClickHandler}
                  >
                     <i className="bi bi-wallet2 fs-4"></i>
                     <p className={styles["transfer"]}>Transfer</p>
                  </div>
                  <div
                     className={styles["content-board"]}
                     onClick={() => setShow(true)}
                  >
                     <i className="bi bi-plus-circle fs-4"></i>
                     <p className={styles["topup"]}>Top Up</p>
                  </div>
                  <div
                     className={`${styles["content-board"]} ${styles[`border-left`]
                        }`}
                  >
                     <i className="bi bi-person-plus-fill fs-4 text-primary"></i>
                     <p className={`${styles["profile"]} `}>Profile</p>
                  </div>
               </div>
               <div className={styles["content-logout"]}>
                  <Image src={icon_log_out} alt="icon_log_out" />
                  <p className={styles["logout"]} onClick={handleShowmodal}>
                     Logout
                  </p>
               </div>
            </div>

            {!show ? null : (
               <section className={`${styles.box}`}>
                  <section className={styles.content_box}>
                     <span
                        className="d-flex justify-content-between"
                        onClick={() => setShow(false)}
                     >
                        <h3 className={styles.title_modal}>Topup</h3>
                        <div className={styles.cursor} onClick={handleShow}>
                           <i className="fa-solid fa-xmark fs-2"></i>
                        </div>
                     </span>
                     <p className={styles.desc_modal}>
                        Enter the amount of money, and click <br /> submit
                     </p>
                     <span className={styles.input_}>
                        <input
                           type="tel"
                           className={styles.arrow}
                           value={price}
                           onChange={valuePrice}
                        />
                     </span>
                     <br />
                     {link === "" ? null : (
                        <Link href={link} target="_blank">
                           Topup Payment Click Here
                        </Link>
                     )}
                     <span className="d-flex justify-content-end align-items-center">
                        <button
                           onClick={handleTopup}
                           className={styles.btn_submit}
                        >
                           Submit
                        </button>
                     </span>
                  </section>
               </section>
            )}
            <ToastContainer
               position="top-center"
               autoClose={2000}
               hideProgressBar={false}
               closeOnClick={true}
               pauseOnHover={true}
               draggable={true}
               theme="light"
            />
            <Modal
               show={showmodal}
               onHide={handleClosemodal}
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
                     onClick={handleClosemodal}
                  >
                     No
                  </Button>
               </Modal.Footer>
            </Modal>
         </>
      );
   }

   if (page === "profile child")
      return (
         <>
            <div className={`${styles["content-left"]} w-100`}>
               <div className={styles["content-bar"]}>
                  <div
                     className={`${styles["content-board"]}`}
                     onClick={homeClickHandler}
                  >
                     <i className="bi bi-grid-fill fs-4"></i>
                     <p className={`${styles["dashboard"]} `}>Dashboard</p>
                  </div>
                  <div
                     className={styles["content-board"]}
                     onClick={transferClickHandler}
                  >
                     <i className="bi bi-wallet2 fs-4"></i>
                     <p className={styles["transfer"]}>Transfer</p>
                  </div>
                  <div
                     className={styles["content-board"]}
                     onClick={() => setShow(true)}
                  >
                     <i className="bi bi-plus-circle fs-4"></i>
                     <p className={styles["topup"]}>Top Up</p>
                  </div>
                  <div
                     className={`${styles["content-board"]} ${styles[`border-left`]
                        }`}
                     onClick={profleClickHandler}
                  >
                     <i className="bi bi-person-plus-fill fs-4 text-primary"></i>
                     <p className={`${styles["profile"]} `}>Profile</p>
                  </div>
               </div>
               <div className={styles["content-logout"]}>
                  <Image src={icon_log_out} alt="icon_log_out" />
                  <p className={styles["logout"]} onClick={handleShowmodal}>
                     Logout
                  </p>
               </div>
            </div>

            {!show ? null : (
               <section className={`${styles.box}`}>
                  <section className={styles.content_box}>
                     <span
                        className="d-flex justify-content-between"
                        onClick={() => setShow(false)}
                     >
                        <h3 className={styles.title_modal}>Topup</h3>
                        <div className={styles.cursor} onClick={handleShow}>
                           <i className="fa-solid fa-xmark fs-2"></i>
                        </div>
                     </span>
                     <p className={styles.desc_modal}>
                        Enter the amount of money, and click <br /> submit
                     </p>
                     <span className={styles.input_}>
                        <input
                           type="tel"
                           className={styles.arrow}
                           value={price}
                           onChange={valuePrice}
                        />
                     </span>
                     <br />
                     {link === "" ? null : (
                        <Link href={link} target="_blank">
                           Topup Payment Click Here
                        </Link>
                     )}
                     <span className="d-flex justify-content-end align-items-center">
                        <button
                           onClick={handleTopup}
                           className={styles.btn_submit}
                        >
                           Submit
                        </button>
                     </span>
                  </section>
               </section>
            )}
            <ToastContainer
               position="top-center"
               autoClose={2000}
               hideProgressBar={false}
               closeOnClick={true}
               pauseOnHover={true}
               draggable={true}
               theme="light"
            />
            <Modal
               show={showmodal}
               onHide={handleClosemodal}
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
                     onClick={handleClosemodal}
                  >
                     No
                  </Button>
               </Modal.Footer>
            </Modal>
         </>
      );

   if (page === "transfer")
      return (
         <>
            <div className={`${styles["content-left"]} w-100`}>
               <div className={styles["content-bar"]}>
                  <div
                     className={`${styles["content-board"]}`}
                     onClick={homeClickHandler}
                  >
                     <i className="bi bi-grid-fill fs-4"></i>
                     <p className={`${styles["dashboard"]} `}>Dashboard</p>
                  </div>
                  <div
                     className={`${styles["content-board"]} ${styles[`border-left`]
                        }`}
                  >
                     <i className="bi bi-wallet2 fs-4 text-primary"></i>
                     <p className={styles["transfer"]}>Transfer</p>
                  </div>
                  <div
                     className={styles["content-board"]}
                     onClick={() => setShow(true)}
                  >
                     <i className="bi bi-plus-circle fs-4"></i>
                     <p className={styles["topup"]}>Top Up</p>
                  </div>
                  <div
                     className={`${styles["content-board"]} `}
                     onClick={profleClickHandler}
                  >
                     <i className="bi bi-person-plus-fill fs-4 "></i>
                     <p className={`${styles["profile"]}`}>Profile</p>
                  </div>
               </div>
               <div className={styles["content-logout"]}>
                  <Image src={icon_log_out} alt="icon_log_out" />
                  <p className={styles["logout"]} onClick={handleShowmodal}>
                     Logout
                  </p>
               </div>
            </div>

            {!show ? null : (
               <section className={`${styles.box}`}>
                  <section className={styles.content_box}>
                     <span
                        className="d-flex justify-content-between"
                        onClick={() => setShow(false)}
                     >
                        <h3 className={styles.title_modal}>Topup</h3>
                        <div className={styles.cursor} onClick={handleShow}>
                           <i className="fa-solid fa-xmark fs-2"></i>
                        </div>
                     </span>
                     <p className={styles.desc_modal}>
                        Enter the amount of money, and click <br /> submit
                     </p>
                     <span className={styles.input_}>
                        <input
                           type="tel"
                           className={styles.arrow}
                           value={price}
                           onChange={valuePrice}
                        />
                     </span>
                     <br />
                     {link === "" ? null : (
                        <Link href={link} target="_blank">
                           Topup Payment Click Here
                        </Link>
                     )}
                     <span className="d-flex justify-content-end align-items-center">
                        <button
                           onClick={handleTopup}
                           className={styles.btn_submit}
                        >
                           Submit
                        </button>
                     </span>
                  </section>
               </section>
            )}
            <ToastContainer
               position="top-center"
               autoClose={2000}
               hideProgressBar={false}
               closeOnClick={true}
               pauseOnHover={true}
               draggable={true}
               theme="light"
            />
            <Modal
               show={showmodal}
               onHide={handleClosemodal}
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
                     onClick={handleClosemodal}
                  >
                     No
                  </Button>
               </Modal.Footer>
            </Modal>
         </>
      );

   if (page === "transfer child")
      return (
         <>
            <div className={`${styles["content-left"]} w-100`}>
               <div className={styles["content-bar"]}>
                  <div
                     className={`${styles["content-board"]}`}
                     onClick={homeClickHandler}
                  >
                     <i className="bi bi-grid-fill fs-4"></i>
                     <p className={`${styles["dashboard"]} `}>Dashboard</p>
                  </div>
                  <div
                     className={`${styles["content-board"]} ${styles[`border-left`]
                        }`}
                     onClick={transferClickHandler}
                  >
                     <i className="bi bi-wallet2 fs-4 text-primary"></i>
                     <p className={styles["transfer"]}>Transfer</p>
                  </div>
                  <div
                     className={styles["content-board"]}
                     onClick={() => setShow(true)}
                  >
                     <i className="bi bi-plus-circle fs-4"></i>
                     <p className={styles["topup"]}>Top Up</p>
                  </div>
                  <div
                     className={`${styles["content-board"]} `}
                     onClick={profleClickHandler}
                  >
                     <i className="bi bi-person-plus-fill fs-4 "></i>
                     <p className={`${styles["profile"]}`}>Profile</p>
                  </div>
               </div>
               <div className={styles["content-logout"]}>
                  <Image src={icon_log_out} alt="icon_log_out" />
                  <p className={styles["logout"]} onClick={handleLogout}>
                     Logout
                  </p>
               </div>
            </div>
            {!show ? null : (
               <section className={`${styles.box}`}>
                  <section className={styles.content_box}>
                     <span
                        className="d-flex justify-content-between"
                        onClick={() => setShow(false)}
                     >
                        <h3 className={styles.title_modal}>Topup</h3>
                        <div className={styles.cursor} onClick={handleShow}>
                           <i className="fa-solid fa-xmark fs-2"></i>
                        </div>
                     </span>
                     <p className={styles.desc_modal}>
                        Enter the amount of money, and click <br /> submit
                     </p>
                     <span className={styles.input_}>
                        <input
                           type="tel"
                           className={styles.arrow}
                           value={price}
                           onChange={valuePrice}
                        />
                     </span>
                     <br />
                     {link === "" ? null : (
                        <Link href={link} target="_blank">
                           Topup Payment Click Here
                        </Link>
                     )}
                     <span className="d-flex justify-content-end align-items-center">
                        <button
                           className={styles.btn_submit}
                           onClick={handleTopup}
                        >
                           Submit
                        </button>
                     </span>
                  </section>
               </section>
            )}
            <ToastContainer
               position="top-center"
               autoClose={2000}
               hideProgressBar={false}
               closeOnClick={true}
               pauseOnHover={true}
               draggable={true}
               theme="light"
            />
            <Modal
               show={showmodal}
               onHide={handleClosemodal}
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
                     onClick={handleClosemodal}
                  >
                     No
                  </Button>
               </Modal.Footer>
            </Modal>
         </>
      );
}

export default Sidebar;
