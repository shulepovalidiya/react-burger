import React, {FC} from "react";
import {NavLink, useNavigate, Outlet} from "react-router-dom";
import styles from "./profile.module.css"
import {useAppDispatch} from "../../services/hooks";
import {logout} from "../../services/thunks/auth";

const Profile: FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const setActive = ({isActive} : {isActive: boolean;}) =>
        `${styles.navLink} text text_type_main-medium ${isActive ? "text_color_primary" : "text_color_inactive"}`

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(logout());
        navigate("/");
    }

    return (
        <section className={styles.section}>
            <nav className={styles.navPanel}>
                <ul className={styles.navLinks}>
                    <li>
                        <NavLink to={"/profile"} className={setActive} end>Профиль</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/profile/orders"} className={setActive} end>История заказов</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/login"} className={setActive} onClick={e => handleLogout(e)}>Выход</NavLink>
                    </li>
                </ul>
                <span className={`text text_type_main-default text_color_inactive ${styles.caption}`}>В этом разделе вы можете изменить свои персональные данные</span>
            </nav>
            <Outlet />
        </section>
    )
}

export default Profile;