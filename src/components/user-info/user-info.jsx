import React, {useEffect, useState} from "react";
import styles from "../../pages/profile/profile.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {getUserInfo, updateUserInfo} from "../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import useForm from "../../hooks/use-form";

export default function UserInfo() {

    const dispatch = useDispatch();

    const {currentName, currentLogin} = useSelector(state => state.auth);

    const {values, handleChange, setValues} = useForm({
        name: currentName,
        email: currentLogin,
        password: '',
    })

    const {name, email, password} = values;

    useEffect(() => {
        dispatch(getUserInfo())
        setValues({...values,
            name: currentName,
            email: currentLogin,
        })
    }, [currentName, currentLogin]);

    const [isDisabled, setDisabled] = useState({
        name: true,
        email: true,
        password: true,
    })

    const [isInputEdited, setIsInputEdited] = useState(false);

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
        setValues({...values,
            name: currentName,
            email: currentLogin,
        })
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


    return (
        <form onChange={handleInputChange} onReset={handleReset} onSubmit={handleSubmit}>
            <fieldset className={styles.fieldset}>
                <Input value={name} type={"text"} placeholder={"Имя"} name={"name"}
                       icon={isDisabled.name ? "EditIcon" : "CloseIcon"}
                       disabled={isDisabled.name}
                       onChange={(e) => handleChange(e)}
                       onIconClick={() => handleIconClick("name")}
                />
                <Input value={email} type={"email"} placeholder={"Логин"} name={"email"}
                       icon={isDisabled.email ? "EditIcon" : "CloseIcon"}
                       disabled={isDisabled.email}
                       onChange={(e) => handleChange(e)}
                       onIconClick={() => handleIconClick("email")}/>
                <Input value={password || ""} type={"password"} placeholder={"Пароль"} name={"password"}
                       icon={isDisabled.password ? "EditIcon" : "CloseIcon"}
                       disabled={isDisabled.password}
                       onChange={(e) => handleChange(e)}
                       onIconClick={() => handleIconClick("password")}/>
                {
                    isInputEdited &&
                    <div style={{alignSelf: "end"}}>
                        <Button htmlType={"submit"}>Сохранить</Button>
                        <Button htmlType={"reset"} type={"secondary"}>Отмена</Button>
                    </div>
                }
            </fieldset>
        </form>
    )
}