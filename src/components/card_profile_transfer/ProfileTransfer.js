import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import image_profile from "../../assets/profile_transfer/profile_image.png";
import css from "./ProfileTransfer.module.css";

function ProfileTransfer({ images, name, noTelp, idUser }) {
   const router = useRouter();
   return (
      <>
         <div
            className={css.profile_content}
            // Kasih id buat masuk ke transfer detailnya (onclick)
            onClick={() => {
               router.push(`/transfer/${idUser}`);
            }}
         >
            <div className="">
               <Image
                  className="rounded-3"
                  src={images}
                  alt="image"
                  width={70}
                  height={70}
               />
            </div>
            <div className={css.profile_data}>
               <p className={css.profile_name}>{name}</p>
               <p className={css.profile_number}>{noTelp}</p>
            </div>
         </div>
      </>
   );
}

export default ProfileTransfer;
