import React from "react";
import {Link} from "react-router-dom";
import styles from "./nav-caption.module.css";

export default function NavCaption({text, linkText, to}) {
    return (
        <span className={`text text_type_main-default text_color_inactive ${styles.span}`}>{text}
            <Link to={to} className={styles.link}>{linkText}</Link>
        </span>
    )
}