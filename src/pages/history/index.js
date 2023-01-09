import React, { useState, useEffect } from "react";
import Image from "next/image";
//import components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import CardTransaction from "../../components/CardTransaction/index";
import styles from "../../styles/History.module.css";
// import component 👇
import Drawers from "../../components/drawer/Drawer";
import Cookies from "js-cookie";
import axios from "axios";

function Index() {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("");
  const [totaldata, setTotaldata] = useState("")


  const sortHandler = (element) => {
    setSort(element.target.value)
  };

  useEffect(() => {
    console.log(sort)
    const getToken = Cookies.get("token");
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/history?page=1&limit=10${sort}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )
      .then((res) => {
        setData(res.data.data)
        setTotaldata(res.data.pagination.totalData)
      })
      .catch((err) => console.log(err));
  }, [sort]);

  const rupiah = (number) => {
    if (number) {
      return `IDR ${number
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`;
    }
  };



  return (
    <>
      <Header />
      <div className={`container-fluid ${styles.background_container}`}>
        <div className={`container d-flex gap-4 ${styles.content_inti}`}>
          <section className="col-sm-12 col-md-3 d-none d-sm-none d-lg-block ">
            <Sidebar page="home" />
          </section>
          <div
            className={`px-0 col-lg-9 col-md-12 col-sm-12 mx-auto ${styles.content_right}`}
          >
            <section className={`${styles.hitory__bar}`}>
              <div
                className={`${styles.title_bar} d-flex justify-content-between align-items-center`}
              >
                <h1 className={styles.title}>Transaction History</h1>
                <select
                  className={`${styles.select_filter}`}
                  aria-label="-- Select Filter --"
                  onChange={sortHandler}
                >
                  <option selected value="">-- Select Filter --</option>
                  <option value="&filter=WEEK">Weekly</option>
                  <option value="&filter=month">Monthly</option>
                  <option value="&filter=YEAR">Year</option>
                </select>
              </div>
              {/* modal history */}
              <div className={styles.history__modal}>
                {(totaldata <= 0)
                  ? (<h1>data not found</h1>)
                  : data.map((user) => (
                    <CardTransaction
                      key={user.id}
                      balance={rupiah(user.amount)}
                      fullName={user.fullName}
                      image={
                        user.image === null
                          ? `${process.env.CLOUDINARY_LINK}`
                          : `${process.env.CLOUD}${user.image}`
                      }
                      type={user.type}
                      status={user.status}
                    />))
                }
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
      <Drawers pages="home child" />
    </>
  );
}

export default Index;
