import React from "react";

import css from "../../../styles/TransferFailed.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Sidebar from "../../../components/sidebar/Sidebar";
import failed from "../../../assets/transferFailed/failed.png";
import profile from "../../../assets/sitampan.png";
import Image from "next/image";
import Drawers from "../../../components/drawer/Drawer";

function TransferFailed() {
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
                  <Image src={failed} alt="checklist" width={50} height={50} />
                </div>
                <div className={`${css.trfFail}`}>Transfer Failed</div>
                <div className={`d-flex justify-content-center`}>
                  <div className={`${css.failDetail}`}>
                    We can`t transfer your money at the moment, we recommend you
                    to check your internet connection and try again.
                  </div>
                </div>
              </span>
            </section>
            <section className={`d-flex flex-column mt-5`}>
              <div className={`${css.box}`}>
                <span>
                  <div className={`${css.tittleBox}`}>Amount</div>
                  <div className={`${css.detailBox}`}>Rp100.000</div>
                </span>
              </div>
              <div className={`${css.box}`}>
                <span>
                  <div className={`${css.tittleBox}`}>Balance Left</div>
                  <div className={`${css.detailBox}`}>Rp20.000</div>
                </span>
              </div>
              <div className={`${css.box}`}>
                <span>
                  <div className={`${css.tittleBox}`}>Date & Time</div>
                  <div className={`${css.detailBox}`}>May 11, 2020 - 12.20</div>
                </span>
              </div>
              <div className={`${css.box}`}>
                <span>
                  <div className={`${css.tittleBox}`}>Notes</div>
                  <div className={`${css.detailBox}`}>
                    For buying some socks
                  </div>
                </span>
              </div>
            </section>
            <section className={`d-flex flex-column mt-5`}>
              <div className={`${css.transferTo}`}>Transfer to</div>
              <div className={`${css.box} ${css.container}`}>
                <span>
                  <Image src={profile} width={80} height={80} alt="profile" />
                </span>
                <span className={`${css.profilDetail}`}>
                  <div className={`${css.Name}`}>Samuel Suhi</div>
                  <div className={`${css.Phone}`}>+62 813-8492-9994</div>
                </span>
              </div>
            </section>
            <section className={`${css.containerBtn}`}>
              <span className={`${css.tryBtn}`}>Try again</span>
            </section>
          </div>
        </div>
      </div>
      <Footer />
      <Drawers pages="tranfer child" />
    </>
  );
}

export default TransferFailed;
