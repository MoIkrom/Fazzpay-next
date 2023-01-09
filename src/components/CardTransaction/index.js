import React, { useState } from "react";
import Image from "next/image";
import styles from "./CardTransaction.module.css";
function Index(props) {

  return (
    <>
      <section className={`${styles.card}`}>
        <div className="d-flex align-items-center">
          <Image width={56} height={56} src={props.image} alt={"user_image"} className="rounded-3" />
          <span className="d-flex justify-content-between flex-column">
            <h4 className={styles.name}>{props.fullName}</h4>
            <p className={styles.status}>{props.type}</p>
          </span>
        </div>
        {/* kondisi color */}
        {props.type === "topup" || props.type === "accept" ? (
          <span className={`${styles.transfer} text-success`}>
            {`+ ${props.balance}`}
          </span>
        ) : (
          <span className={`${styles.transfer} text-danger`}>
            {`- ${props.balance}`}
          </span>
        )}
      </section>
    </>
  );
}

export default Index;
