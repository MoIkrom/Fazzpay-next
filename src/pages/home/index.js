import React, { useEffect, useState } from "react";

//import css
import styles from "../../styles/Rumah.module.css";

//import components
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import CardTransaction from "../../components/CardTransaction/index";

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

  const seeAllHandler = () => {
    router.push("/history");
  };
  const transferHandler = () => {
    router.push("/transfer");
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
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/history?page=1&limit=4&`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // update income expense
  const [chart, setChart] = useState([]);

  useEffect(() => {
    const getToken = Cookies.get("token");
    const getId = Cookies.get(`id`);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/${getId}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => setChart(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  // topup
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const valuePrice = (e) => {
    if (e.target.value.length === 0) setPrice("");
    if (/[0-9]{1,12}/g.test(e.target.value[e.target.value.length - 1])) setPrice(e.target.value);
  };
  const handleTopup = () => {
    const getToken = Cookies.get("token");
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/top-up`,
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
      .catch((err) => console.log(err));
  };

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
                <div className={styles["content-balance"]}>
                  <p className={styles["text-balance"]}>Balance</p>
                  <p className={styles["text-price"]}>{profile.balance ? rupiah(profile.balance) : "IDR. 0"}</p>
                  <p className={styles["text-phone"]}>{profile.number ? profile.number : "Please manage your phone number"}</p>
                </div>
                <div className={styles["content-tf"]}>
                  <div className={styles["border-tf"]} onClick={transferHandler}>
                    <Image src={icon_arrow_blue} alt="icon_arrow_blue" />
                    <p className={styles["text-transfer"]}>Transfer</p>
                  </div>
                  <div className={styles["border-tf"]} onClick={handleclickshow}>
                    <Image src={icon_arrow_blue} alt="icon_arrow_blue" />
                    <p className={styles["text-transfer"]} onClick={() => setShow(true)}>
                      Top Up
                    </p>
                  </div>
                </div>
              </div>

              {!show ? null : (
                <section className={`${styles.box}`}>
                  <section className={styles.content_box}>
                    <span className="d-flex justify-content-between" onClick={() => setShow(false)}>
                      <h3 className={styles.title_modal}>Topup</h3>
                      <div className={styles.cursor} onClick={handleShow}>
                        <i className="fa-solid fa-xmark fs-2"></i>
                      </div>
                    </span>
                    <p className={styles.desc_modal}>
                      Enter the amount of money, and click <br /> submit
                    </p>
                    <span className={styles.input_}>
                      <input type="number" className={styles.arrow} value={price} onChange={valuePrice} />
                    </span>
                    <br />
                    {link === "" ? null : (
                      <Link href={link} target="_blank">
                        Topup Payment Click Here
                      </Link>
                    )}
                    <span className="d-flex justify-content-end align-items-center">
                      <button className={styles.btn_submit} onClick={handleTopup}>
                        Submit
                      </button>
                    </span>
                  </section>
                </section>
              )}

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
      <Footer />
      <Drawers pages="home child" />
    </>
  );
}

export default Index;
