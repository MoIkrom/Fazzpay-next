import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// import css
import css from "../../styles/TransferDetail.module.css";

// import components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";

import CardProfileTransfer from "../../components/card_profile_transfer/ProfileTransfer";
import Drawers from "../../components/drawer/Drawer";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import authActions from "../../redux/actions/auth";
import { debounce } from "../../utils/debounce/debounce";

function TransferID() {
  // add router.push to pin when click continue
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const ErrorMessage = useSelector((state) => state.auth.error);

  const [changecolor, setChangecolor] = useState(true);
  const [data, setData] = useState({});
  const [price, setPrice] = useState("");
  // const [price, setPrice] = useState("Rp 0");
  const [note, setNote] = useState("");
  const [width, setWidth] = useState(10);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getToken = Cookies.get("token");
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/${router.query.iduser}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const valuePrice = (e) => {
    if (e.target.value.length === 0) setPrice("");
    if (/[0-9]{1,12}/g.test(e.target.value[e.target.value.length - 1])) setPrice(e.target.value);
  };

  // const searchHandler = (e) => setSearch(e.target.value);
  const debounceOnChange = debounce(valuePrice, 1500);
  const valuePrice2 = (e) => {
    const letters = /^[A-Za-z]+$/;
    if (e.target.value.match(letters)) {
      return (e.target.value = "");
    }
    let v = e.target.value.replace(/[^\dA-Z]/g, "");
    e.target.value = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.").replace(/[^0-9]+$/, "");
    if (!e.target.value) setWidth(10);
    if (e.target.value !== ".") setWidth(e.target.value.length);
    if (e.target.value.includes(".")) {
      const data = e.target.value.split(".").join("");
      return setAmount(data);
    }
    setAmount(e.target.value);
  };

  const valueDesc = (e) => (setChangecolor(false), setNote(e.target.value));

  const costing = (price) => {
    return (
      "Rp " +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
  };

  const clickHandler = () => {
    if (profile.balance < price) {
      return toast.error("overlimit");
    }
    return dispatch(
      authActions.transactionsThunk(
        {
          receiverId: router.query.iduser,
          amount: price,
          notes: note,
        },
        () => (toast.success("Confirmation Payment"), router.push("/transfer/confirmation")),
        () => toast.error(ErrorMessage)
      )
    );
  };

  return (
    <>
      <Header />

      <div className={`container-fluid ${css.background_container}`}>
        <div className={`container d-flex gap-4 ${css.content_inti}`}>
          <section className="col-12 col-sm-12 col-md-3 d-none d-sm-none d-lg-block ">
            <Sidebar page="transfer child" />
          </section>
          <div className={`col-lg-9 col-md-12 col-sm-12 ${css.content_right}`}>
            <div className={""}>
              <p className={css.search_receiver}>Transfer Money</p>
              {/* profile */}

              {loading ? (
                ""
              ) : (
                <CardProfileTransfer
                  key={data.id}
                  idUser={data.id}
                  images={data.image === null ? `${process.env.CLOUDINARY_LINK}` : `${process.env.CLOUD}${data.image}`}
                  name={data.firstName + " " + data.lastName}
                  noTelp={data.noTelp === null ? "Phone number empty" : data.noTelp}
                />
              )}

              <p className={css.type_amount}>Type the amount you want to transfer and then press continue to the next steps.</p>
              {/* Input Data */}
              <div className={css.content_input_data}>
                <div className={css.data_nominal}>
                  {/* <input type="tel" value={price} placeholder="Rp 0" onChange={debounceOnChange} /> */}
                  <input type="tel" value={price} placeholder="Rp 0" onChange={valuePrice} />
                </div>
                <div className={css.data_available}>
                  <p>{profile.balance <= 0 ? "Rp 0" : costing(`${profile.balance}`) + ` Available`}</p>
                </div>
                <div className={changecolor ? css.data_note_grey : css.data_note}>
                  <i className="fa-solid fa-pencil"></i>
                  <input type="text" onChange={valueDesc} />
                </div>
              </div>
              <div className={css.continue}>
                <button onClick={clickHandler}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Drawers pages="transfer child" />
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} closeOnClick={true} pauseOnHover={true} draggable={true} theme="light" />
    </>
  );
}

export default TransferID;
