import React, { useEffect, useState } from "react";

import css from "../../../styles/TransferSuccess.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Sidebar from "../../../components/sidebar/Sidebar";

import checklist from "../../../assets/transferSuccess/success.png";
import profile from "../../../assets/sitampan.png";
import Image from "next/image";

import Drawers from "../../../components/drawer/Drawer";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../../redux/actions/auth";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";

function TransferSuccess() {
  const transactions = useSelector((state) => state.auth.transactions);
  const profile = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();
  const router = useRouter();

  const [data, setData] = useState({});

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
        setData(res.data.data);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const DeleteTfRedux = () => {
    return dispatch(authActions.transactionsDeleteThunk());
  };

  return (
    <>
      <Header />
      <div className={`container-fluid ${css.background_container}`}>
        <div className={`container d-flex gap-4 ${css.content_inti}`}>
          <section className="col-12 col-sm-12 col-md-3 d-none d-sm-none d-lg-block ">
            <Sidebar page="transfer child" />
          </section>
          <div className={`col-lg-9 col-md-8 col-sm-12 ${css.content_right}`}>
            <section className={`d-flex justify-content-center mt-5`}>
              <span>
                <div className={`d-flex justify-content-center`}>
                  <Image
                    src={checklist}
                    alt="checklist"
                    width={50}
                    height={50}
                  />
                </div>
                <div className={`${css.trfSuccess}`}>Transfer Success</div>
              </span>
            </section>
            <section className={`d-flex flex-column mt-5`}>
              <div className={`${css.box}`}>
                <span>
                  <div className={`${css.tittleBox}`}>Amount</div>
                  <div className={`${css.detailBox}`}>
                    {costing(transactions.amount)}
                  </div>
                </span>
              </div>
              <div className={`${css.box}`}>
                <span>
                  <div className={`${css.tittleBox}`}>Balance Left</div>
                  <div className={`${css.detailBox}`}>
                    {costing(profile.balance - transactions.amount)}
                  </div>
                </span>
              </div>
              <div className={`${css.box}`}>
                <span>
                  <div className={`${css.tittleBox}`}>Date & Time</div>
                  <div className={`${css.detailBox}`}>{transactionDate()}</div>
                </span>
              </div>
              <div className={`${css.box}`}>
                <span>
                  <div className={`${css.tittleBox}`}>Notes</div>
                  <div className={`${css.detailBox}`}>{transactions.notes}</div>
                </span>
              </div>
            </section>
            <section className={`d-flex flex-column mt-5`}>
              <div className={`${css.transferTo}`}>Transfer to</div>
              <div className={`${css.box} ${css.container}`}>
                <span>
                  <Image
                    src={
                      data.image === null
                        ? `${process.env.CLOUDINARY_LINK}`
                        : `${process.env.CLOUD}${data.image}`
                    }
                    width={80}
                    height={80}
                    alt="profile"
                  />
                </span>
                <span className={`${css.profilDetail}`}>
                  <div className={`${css.Name}`}>
                    {data.firstName} {data.lastName}
                  </div>
                  <div className={`${css.Phone}`}>
                    {data.noTelp === null
                      ? "this user dont input number phone"
                      : data.noTelp}
                  </div>
                </span>
              </div>
            </section>
            <section className={`${css.containerBtn}`}>
              <span className={`${css.downloadBtn}`}>
                <i className="fa-sharp fa-solid fa-download"></i>
                <span className={`ms-3`}>Download</span>
              </span>
              <span
                className={`${css.backBtn}`}
                onClick={() => {
                  DeleteTfRedux(), router.push("/home");
                }}
              >
                Back to Home
              </span>
            </section>
          </div>
        </div>
      </div>
      <Footer />
      <Drawers pages="transfer child" />
    </>
  );
}

export default TransferSuccess;
