import React from "react";
import {NavLink, Route, useNavigate, Routes, Outlet} from "react-router-dom";
import styles from "./profile.module.css"
import {useDispatch} from "react-redux";
import {logout} from "../../services/actions/auth";
import UserInfo from "../../components/user-info/user-info";
import ProtectedRouteElement from "../../components/protected-route-element/protected-route-element";
import Orders from "../orders/orders";

export default function Profile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setActive = ({isActive}) => isActive
        ? `text text_type_main-medium text_color_primary ${styles.navLink}`
        : `text text_type_main-medium text_color_inactive ${styles.navLink}`

    const handleLogout = (e) => {
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
                        <NavLink to={"/login"} className={setActive} onClick={handleLogout}>Выход</NavLink>
                    </li>
                </ul>
                <span className={`text text_type_main-default text_color_inactive ${styles.caption}`}>В этом разделе вы можете изменить свои персональные данные</span>
            </nav>

            <Outlet />

        </section>
    )
}