import React from "react";

//import css
import styles from "./Footer.module.css";

function Footer() {
   return (
      <>
         {/* <div className={`${styles["content-all"]} `}>
            <div className={`${styles["content-foot"]}`}>
               <p className={styles["reserved"]}>
                  2020 FazzPay. All right reserved.
               </p>
               <div className={styles["foot-right"]}>
                  <p className={styles["phone"]}>+62 5637 8882 9901</p>
                  <p className={styles["contact"]}>contact@fazzpay.com</p>
               </div>
            </div>
         </div> */}
         <div className={`container-fluid ${styles.background}`}>
            <div className={`container ${styles.content_footer}`}>
               <div className={styles.copyright}>
                  <p>2020 FazzPay. All right reserved.</p>
               </div>
               <div className={styles.data_company}>
                  <p className={styles.number}><span>Contact :</span> +62 5637 8882 9901</p>
                  <p className={styles.email}><span>Email :</span>contact@fazzpay.com</p>
               </div>
            </div>
         </div>
      </>
   );
}

export default Footer;
