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

function TransferID() {
  // add router.push to pin when click continue
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const ErrorMessage = useSelector((state) => state.auth.error);

  const [changecolor, setChangecolor] = useState(true);
  const [data, setData] = useState({});
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const getToken = Cookies.get("token");
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/${router.query.iduser}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const valuePrice = (e) => {
    if (e.target.value.length === 0) setPrice("");
    if (/[0-9]{1,12}/g.test(e.target.value[e.target.value.length - 1]))
      setPrice(e.target.value);
  };

  const valueDesc = (e) => (setChangecolor(false), setNote(e.target.value));

  const costing = (price) => {
    return (
      "IDR " +
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
        () => (
          toast.success("Confirmation Payment"),
          router.push("/transfer/confirmation")
        ),
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
              <CardProfileTransfer
                key={data.id}
                idUser={data.id}
                images={
                  data.image === null
                    ? `${process.env.CLOUDINARY_LINK}`
                    : `${process.env.CLOUD}${data.image}`
                }
                name={data.firstName}
                noTelp={
                  data.noTelp === null ? "Phone number empty" : data.number
                }
              />

              <p className={css.type_amount}>
                Type the amount you want to transfer and then press continue to
                the next steps.
              </p>
              {/* Input Data */}
              <div className={css.content_input_data}>
                <div className={css.data_nominal}>
                  <input
                    type="tel"
                    value={price}
                    placeholder="0.00"
                    onChange={valuePrice}
                  />
                </div>
                <div className={css.data_available}>
                  <p>
                    {profile.balance <= 0
                      ? "IDR. 0"
                      : costing(`${profile.balance}`) + ` Available`}
                  </p>
                </div>
                <div
                  className={changecolor ? css.data_note_grey : css.data_note}
                >
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

export default TransferID;
