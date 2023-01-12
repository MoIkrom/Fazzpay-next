/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Image from "next/image";
//import components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import CardTransaction from "../../components/CardTransaction/index";
import styles from "../../styles/History.module.css";

// import component
import Drawers from "../../components/drawer/Drawer";
import Cookies from "js-cookie";
import axios from "axios";
// import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";

import { useRouter, withRouter } from "next/router";

function Index() {
  const router = useRouter();

  const query = router.query;

  const [data, setData] = useState([]);
  const [rens, setRens] = useState();
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totaldata, setTotaldata] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [loading, setLoading] = useState(false);
  // const [searchParams, setSearchParams] = URLSearchParams();

  const sortHandler = (element) => {
    setSort(element.target.value);
  };

  useEffect(() => {
    // console.log(data);
    setLoading(true);
    const getToken = Cookies.get("token");
    router.replace(`/history?page=${page === 0 ? 1 : page}&limit=5${sort}`);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/history?page=${page === 0 ? 1 : page}&limit=5&sort${sort}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setRens(res.data);
        setTotalPage(res.data.pagination.totalPage);
        setTotaldata(res.data.pagination.totalData);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [sort, page, totalPage]);

  const rupiah = (number) => {
    if (number) {
      return `IDR ${number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`;
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
          <div className={`px-0 col-lg-9 col-md-12 col-sm-12 mx-auto ${styles.content_right}`}>
            <section className={`${styles.hitory__bar}`}>
              <div className={`${styles.title_bar} d-flex justify-content-between align-items-center`}>
                <h1 className={styles.title}>Transaction History</h1>
                <select className={`${styles.select_filter}`} aria-label="-- Select Filter --" onChange={sortHandler}>
                  <option selected value="">
                    -- Select Filter --
                  </option>
                  <option value="&filter=week">Weekly</option>
                  <option value="&filter=month">Monthly</option>
                  <option value="&filter=Year">Year</option>
                </select>
              </div>
              {/* modal history */}
              <div className={styles.history__modal}>
                {loading ? (
                  <div className={`${styles["lds-spinner"]}`}>
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
                ) : totaldata <= 0 ? (
                  <h1>data not found</h1>
                ) : (
                  data.map((user) => (
                    <CardTransaction
                      key={user.id}
                      balance={rupiah(user.amount)}
                      fullName={user.fullName}
                      image={user.image === null ? `${process.env.CLOUDINARY_LINK}` : `${process.env.CLOUD}${user.image}`}
                      type={user.type}
                      status={user.status}
                    />
                  ))
                )}
              </div>
              <div className={`${styles.pagination}`}>
                <button
                  onClick={() => {
                    setPage(page > 1 ? page - 1 : 1);
                    // console.log(rens);
                  }}
                  className={page === 1 ? `${styles.buttonss}` : `${styles.buttons}`}
                >
                  Prev
                </button>
                <p>
                  {" "}
                  Page {page > totalPage ? totalPage : page} of {totalPage}
                </p>
                <button
                  onClick={() => {
                    // setPage(page + 1);
                    setPage(page > totalPage ? page : page + 1);
                    console.log(rens);
                    // setSearchParams({ page: `${page}` });
                  }}
                  className={page === totalPage ? `${styles.buttonss}` : `${styles.buttons}`}
                >
                  Next
                </button>
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
