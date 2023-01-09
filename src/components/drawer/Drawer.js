import React, { useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import Drawers from "react-modern-drawer"
import styles from "./Drawer.module.css"

function Drawer({ pages }) {

    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <>
            <button
                className={`${styles.floating_apps} d-none d-sm-none d-md-block d-lg-none`}
                onClick={toggleDrawer}
            >
                <span className="me-2">
                    <i className="fa-solid fa-store text-white"></i>
                </span>
            </button>
            <Drawers
                open={isOpen}
                onClose={toggleDrawer}
                direction="left"
                className=""
                overlayColor={"blue"}
                size={250}
                enableOverlay={true}
            >
                <div className="h-100 w-100 ">
                    <Sidebar page={pages} />

                </div>
            </Drawers>
        </>
    )
}

export default Drawer