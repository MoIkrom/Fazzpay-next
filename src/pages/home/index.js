import React, { useEffect, useState } from "react";

//import css
import styles from "../../styles/Rumah.module.css";

//import components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import CardTransaction from "../../components/CardTransaction/index";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//import image
import Image from "next/image";
import icon_grid from "../../assets/dashboard/icon_grid.png";
import icon_adobe from "../../assets/dashboard/icon_adobe.png";
import icon_arrow_up from "../../assets/dashboard/icon_arrow_up.png";
import icon_log_out from "../../assets/dashboard/icon_log_out.png";
import icon_user from "../../assets/dashboard/icon_user.png";
import icon_plus from "../../assets/dashboard/icon_plus.png";
import icon_netflix from "../../assets/dashboard/icon_netflix.png";
import icon_samuel from "../../assets/dashboard/icon_samuel.png";
import icon_christine from "../../assets/dashboard/icon_christine.png";
import icon_arrow_blue from "../../assets/dashboard/icon_arrow_blue.png";
import icon_plus_blue from "../../assets/dashboard/icon_plus_blue.png";
import icon_arrow_green from "../../assets/dashboard/icon_arrow_green.png";
import icon_arrow_red from "../../assets/dashboard/icon_arrow_red.png";
import { useRouter } from "next/router";
import authActions from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Drawers from "../../components/drawer/Drawer";
import axios from "axios";
import Link from "next/link";
// import Link from "next/link";
function Index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showmodal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [url, setUrl] = useState("");
  const [tab, setTab] = useState("");
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const seeAllHandler = () => {
    router.push("/history");
  };
  const transferHandler = () => {
    router.push("/transfer");
  };

  const inputNumber = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const [show, setShow] = useState(false);

  const handleShow = () => {
    console.log(show), setShow(false);
  };

  const handleclickshow = () => {
    console.log(show), setShow(true);
  };

  useEffect(() => {
    // if(getToken)
    const getToken = Cookies.get("token");
    const getId = Cookies.get(`id`);
    dispatch(authActions.userThunk(getToken, getId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getToken = Cookies.get("token");
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/history?page=1&limit=4&`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleSubmit = () => {
    setLoading(true);
    const getToken = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken}`;
    axios
      .post(`https://fazzpay-rose.vercel.app/transaction/top-up`, {
        amount,
        url,
        headers: {
          Authorization: `Bearer${getToken}`,
        },
      })
      .then((response) => {
        setLoading(false);
        openInNewTab(response.data.data.redirectUrl);
        setShowModal(false);
        // console.log(response.data.data.redirectUrl);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const valuePrice = (e) => {
    if (e.target.value.length === 0) setPrice("");
    if (/[0-9]{1,12}/g.test(e.target.value[e.target.value.length - 1])) setPrice(e.target.value);
    console.log(e.target.value);
  };
  const handleTopup = () => {
    const getToken = Cookies.get("token");
    // valuePrice();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/top-up`,
        {
          amount,
          url,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )
      .then((res) => {
        // setLink(res.data.data.redirectUrl),
        setTab(res.data.data.redirectUrl);
        window.open(tab, "_blank", "noopener,noreferrer");
        // window.open(`https://app.sandbox.midtrans.com/snap/v3/redirection/a969594f-daff-434b-a696-c9bde9f33b08`, "_blank", "noopener,noreferrer");
        setTimeout(() => {
          setShow(false);
        }, 3000);
        // router.reload(window.location.pathname);
        // console.log(price);
      })
      .catch((err) => console.log(err));
  };

  // update income expense
  const [chart, setChart] = useState([]);

  useEffect(() => {
    const getToken = Cookies.get("token");
    const getId = Cookies.get(`id`);
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/${getId}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        setChart(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  // topup
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");

  const rupiah = (number) => {
    if (number) {
      return `IDR ${number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`;
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className={styles["section-one"]}>
          <div className={`${styles["content-all"]} container`}>
            <section className="col-12 col-sm-12 col-md-3 d-none d-sm-none d-lg-block ">
              <Sidebar page="home" />
            </section>
            <div className={`${styles["content-right"]} h-100`}>
              <div className={styles["content-one"]}>
                {loading ? (
                  <div className={styles["content-balance"]}>
                    <p className={styles["text-balance"]}>Balance</p>
                    <p className={styles["text-price"]}> </p>
                    <p className={styles["text-phone"]}> </p>
                  </div>
                ) : (
                  <div className={styles["content-balance"]}>
                    <p className={styles["text-balance"]}>Balance</p>
                    <p className={styles["text-price"]}>{profile.balance ? rupiah(profile.balance) : "IDR. 0"}</p>
                    <p className={styles["text-phone"]}>{profile.number ? profile.number : "Please manage your phone number"}</p>
                  </div>
                )}

                <div className={styles["content-tf"]}>
                  <div className={styles["border-tf"]} onClick={transferHandler}>
                    <Image src={icon_arrow_blue} alt="icon_arrow_blue" />
                    <p className={styles["text-transfer"]}>Transfer</p>
                  </div>
                  <div
                    className={styles["border-tf"]}
                    onClick={() => {
                      handleShowModal();
                      console.log("uda diclick");
                    }}
                  >
                    <Image src={icon_arrow_blue} alt="icon_arrow_blue" />
                    <p className={styles["text-transfer"]}>Top Up</p>
                  </div>
                </div>
              </div>

              {/* {!show ? null : (
                <section className={`${styles.box}`}>
                  <section className={styles.content_box}>
                    <span className="d-flex justify-content-between" onClick={() => setShow(false)}>
                      <h3 className={styles.title_modal}>Topup</h3>
                      <div className={styles.cursor} onClick={handleShow}>
                        <i className="fa-solid fa-xmark fs-2"></i>
                      </div>
                    </span>
                    <p className={styles.desc_modal}>Enter the amount of money, and click submit</p>
                    <span className={styles.input_}>
                      <input
                        type="number"
                        className={styles.arrow}
                        value={amount}
                        onKeyPress={inputNumber}
                        onChange={
                          handleAmount
                          // console.log(amount);
                        }
                      />
                    </span>
                    <br />
                    {link === "" ? null : (
                      <Link href={link} target="_blank">
                        Topup Payment Click Here
                      </Link>
                    )}
                    <span className="d-flex justify-content-end align-items-center">
                      <button className={styles.btn_submit} onClick={handleTopup}>
                        <button className={styles.btn_submit} onClick={handleTopup}>
                        Submit
                      </button>
                    </span>
                  </section>
                </section>
              )} */}

              <div className={styles["content-grap"]}>
                <div className={styles["content-grap-left"]}>
                  <div className={styles["grap-row"]}>
                    <div className={styles["grap-column"]}>
                      <Image src={icon_arrow_green} alt="icon_arrow_green" />
                      <p className={styles["income"]}>Income</p>
                      <p className={styles["income-price"]}>{chart.totalIncome === 0 ? "RP. 0" : rupiah(chart.totalIncome)}</p>
                    </div>
                    <div className={styles["grap-column"]}>
                      <Image src={icon_arrow_red} alt="icon_arrow_red" />
                      <p className={styles["income"]}>Expense</p>
                      <p className={styles["income-price"]}>{chart.totalExpense === 0 ? "RP. 0" : rupiah(chart.totalExpense)}</p>
                    </div>
                  </div>
                  <div className={`${styles["content-grafik"]} container`}>
                    <div className={styles["grap-one"]}>
                      <div className={styles["border-grap"]}></div>
                      <p className={styles["day"]}>Sat</p>
                    </div>
                    <div className={styles["grap-one"]}>
                      <div className={styles["border-grap-sec"]}></div>
                      <p className={styles["day-sun"]}>Sun</p>
                    </div>
                    <div className={styles["grap-one"]}>
                      <div className={styles["border-grap-tree"]}></div>
                      <p className={styles["day-mon"]}>Mon</p>
                    </div>
                    <div className={styles["grap-one"]}>
                      <div className={styles["border-grap-four"]}></div>
                      <p className={styles["day-tue"]}>Tue</p>
                    </div>
                    <div className={styles["grap-one"]}>
                      <div className={styles["border-grap-five"]}></div>
                      <p className={styles["day-wed"]}>Wed</p>
                    </div>
                    <div className={styles["grap-one"]}>
                      <div className={styles["border-grap-six"]}></div>
                      <p className={styles["day-thu"]}>Thu</p>
                    </div>
                    <div className={styles["grap-one"]}>
                      <div className={styles["border-grap-seven"]}></div>
                      <p className={styles["day-fri"]}>Fri</p>
                    </div>
                  </div>
                </div>
                <div className={styles["content-grap-right"]}>
                  <div className={styles["content-transaksi"]}>
                    <p className={styles["text-trans"]}>Transaction History</p>
                    <p className={styles["see-all"]} onClick={seeAllHandler}>
                      See all
                    </p>
                  </div>
                  {data.map((user) => (
                    <CardTransaction
                      key={user.id}
                      balance={rupiah(user.amount)}
                      fullName={user.fullName}
                      image={user.image === null ? `${process.env.CLOUDINARY_LINK}` : `${process.env.CLOUD}${user.image}`}
                      type={user.type}
                      status={user.status}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Modal show={showmodal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Topup</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles["title-topUp"]}>Enter the amount of money, and click submit</Modal.Body>

        <input type="text" className={`${styles["inputs"]} form-control form-control-sm validate ml-0`} onKeyPress={inputNumber} onChange={handleAmount} />
        {loading ? (
          <div className={styles["loadings"]}>
            <p>Please Wait Your Payment on Process . . . </p>
          </div>
        ) : (
          ""
        )}

        <Modal.Footer>
          <Button variant="primary" className={` fw-bold text-white border-0 ${styles["submits"]} `} onClick={handleSubmit}>
            {loading ? (
              <div className={`${styles["lds-ring"]}`}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              "submit"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
      <Drawers pages="home child" />
    </>
  );
}

export default Index;
