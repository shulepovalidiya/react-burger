import React from "react";
import {BurgerIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderStyles from './app-header.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return (
        <header className={`${AppHeaderStyles.header} p4`}>
            <nav className={AppHeaderStyles.navbar}>
                <ul className={AppHeaderStyles.menu}>
                    <li>
                        <button className={AppHeaderStyles.button}>
                            <BurgerIcon type="primary" className={AppHeaderStyles.icon}/>
                            <p className="text text_type_main-default">Конструктор</p>
                        </button>
                    </li>
                    <li>
                        <button className={AppHeaderStyles.button}>
                            <ListIcon type="secondary" className={AppHeaderStyles.icon}/>
                            <p className="text text_type_main-default text_color_inactive">Лента
                                заказов</p>
                        </button>
                    </li>
                </ul>
                <Logo/>
                <button className={`${AppHeaderStyles.button} ${AppHeaderStyles.button_profile}`}>
                    <ProfileIcon type="secondary" className={AppHeaderStyles.icon}/>
                    <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
                </button>
            </nav>
        </header>
    )
}

export default AppHeader;