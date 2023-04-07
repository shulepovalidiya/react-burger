import React, {FC} from "react";
import {Link} from "react-router-dom";
import styles from "./nav-caption.module.css";

type TNavCaptionProps = {
    text: string;
    linkText: string;
    to: string;
}

const NavCaption: FC<TNavCaptionProps> = ({text, linkText, to}) => {
    return (
        <span className={`text text_type_main-default text_color_inactive ${styles.span}`}>{text}
            <Link to={to} className={styles.link}>{linkText}</Link>
        </span>
    )
}

export default NavCaption;