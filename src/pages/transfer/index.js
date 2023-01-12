import React, { useEffect, useState } from "react";
import Image from "next/image";

// import css
import css from "../../styles/Transfer.module.css";

// import components
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";

import CardProfileTransfer from "../../components/card_profile_transfer/ProfileTransfer";
import Drawers from "../../components/drawer/Drawer";
import axios from "axios";
import Cookies from "js-cookie";
import { debounce } from "../../utils/debounce/debounce";

import { useRouter } from "next/router";

function Transfer() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  // const updateChange = (e) => setSearch(e.target.value);
  const searchHandler = (e) => {
    setSearch(e.target.value);
    setPage(1);
    if (e.target.value !== null) {
      router.replace(`/transfer/?page=${page}&limit=${limit}&search=${e.target.value}`);
    }
  };
  const debounceOnChange = debounce(searchHandler, 1500);

  useEffect(() => {
    const getToken = Cookies.get("token");
    setLoading(true);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user?page=1&limit=4&search=${search}`,

        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.data);
        setLoading(false);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  return (
    <>
      <Header />
      <div className={`container-fluid ${css.background_container}`}>
        <div className={`container d-flex gap-4 ${css.content_inti}`}>
          <section className="col-12 col-sm-12 col-md-3 d-none d-sm-none d-lg-block ">
            <Sidebar page="transfer" />
          </section>
          <div className={`col-lg-9 col-md-12 col-sm-12 ${css.content_right}`}>
            <div className={""}>
              <p className={css.search_receiver}>Search Receiver</p>
              {/* search box */}
              <div className={css.search_box}>
                <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                <input type="text" name="" id="" placeholder="Search receiver here" onChange={debounceOnChange} />
              </div>
              {/* profile */}
              <div className={css.scroll_bar}>
                {loading ? (
                  <div className={`${css["lds-spinner"]}`}>
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
                  <div className={css.scroll}>
                    {data.map(
                      (user) => (
                        console.log(`${process.env.CLOUDINARY_LINK}`),
                        (
                          <CardProfileTransfer
                            key={user.id}
                            idUser={user.id}
                            images={user.image === null ? `${process.env.CLOUDINARY_LINK}` : `${process.env.CLOUD}${user.image}`}
                            name={user.firstName + " " + user.lastName}
                            noTelp={user.noTelp}
                          />
                        )
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Drawers pages="transfer" />
    </>
  );
}

export default Transfer;
