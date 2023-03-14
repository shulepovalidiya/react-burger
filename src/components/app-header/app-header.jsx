import React from "react";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css';
import {NavLink, Link} from "react-router-dom";
import AppHeaderLink from "../app-header-link/app-header-link";

function AppHeader() {

    return (
        <header className={`${styles.header} p4`}>
            <nav className={styles.navbar}>
                <ul className={styles.menu}>
                    <li>
                        <NavLink className={styles.button} to={"/"}>
                            {
                                ({isActive}) => <AppHeaderLink
                                    isActive={isActive}
                                    IconType={BurgerIcon}
                                    text={"Конструктор"}/>
                            }
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={styles.button} to={"/orders"}>
                            {
                                ({isActive}) => <AppHeaderLink
                                    isActive={isActive}
                                    IconType={ListIcon}
                                    text={"Лента заказов"}/>
                            }
                        </NavLink>
                    </li>
                </ul>
                <Link to={"/"}><Logo/></Link>
                <NavLink className={`${styles.button} ${styles.button_profile}`} to={"/profile"}>
                    {
                        ({isActive}) => <AppHeaderLink
                            isActive={isActive}
                            IconType={ProfileIcon}
                            text={"Личный кабинет"}/>
                    }
                </NavLink>
            </nav>
        </header>
    )
}

export default AppHeader;