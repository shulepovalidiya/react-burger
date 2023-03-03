import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo, logout, updateUserInfo} from "../../services/actions/auth";

export default function Profile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {currentName, currentLogin} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getUserInfo())
        setName(currentName);
        setEmail(currentLogin);
    }, [currentName, currentLogin]);

    const [name, setName] = useState(currentName);
    const [email, setEmail] = useState(currentLogin);
    const [password, setPassword] = useState('');

    const [isDisabled, setDisabled] = useState({
        name: true,
        email: true,
        password: true,
    })
    const [isInputEdited, setIsInputEdited] = useState(false);

    const setActive = ({isActive}) => isActive
        ? `text text_type_main-medium text_color_primary ${styles.navLink}`
        : `text text_type_main-medium text_color_inactive ${styles.navLink}`

    const handleInputChange = () => {
        setIsInputEdited(true)
    }

    const handleIconClick = (inputName) => {
        setDisabled({
            ...isDisabled,
            [inputName]: !isDisabled[inputName]
        })
    }

    const handleReset = () => {
        setIsInputEdited(false)
        setName(currentName)
        setEmail(currentLogin)
        setDisabled({
            name: true,
            email: true,
            password: true,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserInfo(name, email, password));
        setIsInputEdited(false);
        setDisabled({
            name: true,
            email: true,
            password: true,
        })
    }

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
                        <NavLink to={"/profile"} className={setActive}>Профиль</NavLink>
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
            <form onChange={handleInputChange} onReset={handleReset} onSubmit={handleSubmit}>
                <fieldset className={styles.fieldset}>
                    <Input value={name} type={"text"} placeholder={"Имя"} name={"name"}
                           icon={isDisabled.name ? "EditIcon" : "CloseIcon"}
                           disabled={isDisabled.name}
                           onChange={(e) => setName(e.target.value)}
                           onIconClick={() => handleIconClick("name")}/>
                    <Input value={email} type={"email"} placeholder={"Логин"}
                           icon={isDisabled.email ? "EditIcon" : "CloseIcon"}
                           disabled={isDisabled.email}
                           onChange={(e) => setEmail(e.target.value)}
                           onIconClick={() => handleIconClick("email")}/>
                    <Input value={password || ""} type={"password"} placeholder={"Пароль"}
                           icon={isDisabled.password ? "EditIcon" : "CloseIcon"}
                           disabled={isDisabled.password}
                           onChange={(e) => setPassword(e.target.value)}
                           onIconClick={() => handleIconClick("password")}/>
                    {isInputEdited
                        ? <div style={{alignSelf: "end"}}>
                            <Button htmlType={"submit"}>Сохранить</Button>
                            <Button htmlType={"reset"} type={"secondary"}>Отмена</Button>
                        </div>
                        : ''}
                </fieldset>
            </form>
        </section>
    )
}