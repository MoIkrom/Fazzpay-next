import React from "react";
import "bootstrap/dist/css/bootstrap.css";
//import css
import styles from "./Header.module.css";

//import image
import Image from "next/image";

import { useDispatch, useSelector } from 'react-redux';


function Header() {
   const profile = useSelector((state) => state.auth.profile);


   return (
      <>
         <div className={`${styles["content-all"]} container-fluid`}>
            <div className={`${styles["content-left"]} container`}>
               <p className={styles["fazz"]}>FazzPay</p>
               <div className={styles["content-head-right"]}>
                  <div className={styles.content_profile}>
                     <Image
                        className={`${styles["icon_robert"]} rounded-3`}
                        src={
                           profile.image === "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/null"
                              ? `${process.env.CLOUDINARY_LINK}`
                              : profile.image
                        }
                        width={80}
                        height={80}
                        alt="icon_robert"
                     />
                     <div className={styles["content-robert"]}>
                        <p className={styles["text-hello"]}>Hello.</p>
                        <p className={styles["name-robert"]}>
                           {profile.firstname} {profile.lastname}
                        </p>
                        <p className={styles["phone-number"]}>
                           {profile.number === null
                              ? "Phone number empty"
                              : profile.number}
                        </p>
                     </div>
                  </div>
                  <div className={styles["icon_bell"]}>
                     {/* <Image
                        className={styles["icon_bell"]}
                        src={icon_bell}
                        alt="icon_bell"
                     /> */}
                     <i className="fa-regular fa-bell"></i>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default Header;
