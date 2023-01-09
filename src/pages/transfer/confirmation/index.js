import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactCodeInput = dynamic(import("react-code-input"));
//importstyles
import styles from "../../../styles/Confirmation.module.css";

//import components
import Image from "next/image";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Sidebar from "../../../components/sidebar/Sidebar";

//import image
import icon_samuel from "../../../assets/dashboard/icon_samuel.png";

import Drawers from "../../../components/drawer/Drawer";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import authActions from "../../../redux/actions/auth";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

function Confirmation() {
  const transactions = useSelector((state) => state.auth.transactions);
  const profile = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [getpin, setGetpin] = useState("");
  const [image, setImage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const getToken = Cookies.get("token");
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/${transactions.receiverId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )
      .then((res) => {
        setImage(`${process.env.CLOUD}${res.data.data.image}`);
        setFirstname(res.data.data.firstName);
        setLastname(res.data.data.lastName);
        setPhone(res.data.data.noTelp);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const valuePin = (e) => setGetpin(`${e}`);

  const valuePinHandler = () => {
    const getToken = Cookies.get("token");
    axios
      .get(`https://fazzpay-rose.vercel.app/user/pin/${getpin}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then(() => {
        return dispatch(
          authActions.transactionsSubmitThunk(
            {
              receiverId: transactions.receiverId,
              amount: transactions.amount,
              notes: transactions.notes,
            },
            getToken,
            () => {
              //   toast.success("transfer success"),
              router.replace("/transfer/confirmation/success");
            },
            () => {
              // toast.error("transfer failed"),
              router.replace("/transfer/confirmation/failed");
            }
          )
        );
      })
      .catch((err) => {
        return toast.error(err.response.data.msg);
      });
  };

  const props = {
    className: styles.reactCodeInput,
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

  const transactionDate = () => {
    const arrbulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const date = new Date();
    const millisecond = date.getMilliseconds();
    const detik = date.getSeconds();
    const menit = date.getMinutes();
    const jam = date.getHours();
    const hari = date.getDay();
    const tanggal = date.getDate();
    const bulan = date.getMonth();
    const tahun = date.getFullYear();
    return `${arrbulan[bulan]} ${tanggal} , ${tahun} - ${jam}:${menit} `;
  };

  const costing = (price) => {
    return (
      "IDR " +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
  };

  return (
    <>
      <Header />
      <div className={`container-fluid ${styles.background_container}`}>
        <div className={`container d-flex gap-4  ${styles.content_inti}`}>
          <section className="col-12 col-sm-12 col-md-3 d-none d-sm-none d-lg-block ">
            <Sidebar page="transfer child" />
          </section>
          <div
            className={`col-lg-9 col-md-12 col-sm-12 ${styles.content_right}`}
          >
            <p className={styles["title"]}>Transfer To</p>
            <div className={styles["content-user"]}>
              <div className={styles["bor-samuel"]}>
                <Image
                  src={
                    image ===
                      "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/null"
                      ? `${process.env.CLOUDINARY_LINK}`
                      : image
                  }
                  alt="Image_User"
                  width={80}
                  height={80}
                  className="rounded-3"
                />
                <div className={styles["samuel"]}>
                  <p className={styles["text-samuel"]}>
                    {firstname} {lastname}
                  </p>
                  <p className={styles["phone-samuel"]}>{phone}</p>
                </div>
              </div>
            </div>
            <p className={styles["detail"]}>Details</p>
            <div className={styles["content-user"]}>
              <div className={styles["bor-samuel"]}>
                <div className={styles["samuel"]}>
                  <p className={styles["text-amount"]}>Amount</p>
                  <p className={styles["price"]}>
                    {costing(transactions.amount)}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles["content-user"]}>
              <div className={styles["bor-samuel"]}>
                <div className={styles["samuel"]}>
                  <p className={styles["text-amount"]}>Balance Left</p>
                  <p className={styles["price"]}>{costing(profile.balance)}</p>
                </div>
              </div>
            </div>
            <div className={styles["content-user"]}>
              <div className={styles["bor-samuel"]}>
                <div className={styles["samuel"]}>
                  <p className={styles["text-amount"]}>Date & Time</p>
                  <p className={styles["price"]}>{transactionDate()}</p>
                </div>
              </div>
            </div>
            <div className={styles["content-user"]}>
              <div className={styles["bor-samuel"]}>
                <div className={styles["samuel"]}>
                  <p className={styles["text-amount"]}>Notes</p>
                  <p className={styles["price"]}>{transactions.notes}</p>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button
                className={styles["button"]}
                type="button"
                onClick={() => setShowModal(true)}
              >
                Continue
              </button>
              {showModal ? (
                <div className={styles["content-all"]}>
                  <div className={styles["modal"]}>
                    <div className={styles["content-text-pin"]}>
                      <p className={styles["text-pin"]}>
                        Enter PIN to Transfer
                      </p>
                      <a
                        className={styles["text-x"]}
                        onClick={() => setShowModal(false)}
                      >
                        <i className="fa-sharp fa-solid fa-circle-xmark fs-4 text-danger"></i>
                      </a>
                    </div>
                    <p className={styles["confirmation"]}>
                      Enter your 6 digits PIN for confirmation to continue
                      transferring money.
                    </p>
                    <div className={styles.pin}>
                      <ReactCodeInput
                        type="number"
                        fields={6}
                        pattern="/^-?\d+\.?\d*$/"
                        onChange={valuePin}
                        {...props}
                      />
                    </div>
                    <button
                      className={styles["button-sec"]}
                      onClick={valuePinHandler}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Drawers pages="transfer child" />
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

export default Confirmation;
