import React, {useEffect, useState, FC, FormEvent} from "react";
import styles from "../../pages/profile/profile.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {getUserInfo, updateUserInfo} from "../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import useForm from "../../hooks/use-form";
import {RootState} from "../../index";

const UserInfo: FC = () => {

    const dispatch = useDispatch();

    const {currentName, currentLogin} : {
        currentName: string;
        currentLogin: string;
    } = useSelector((state: RootState) => state.auth);

    const {values, handleChange, setValues} = useForm({
        name: currentName,
        email: currentLogin,
        password: '',
    })

    const {name, email, password} = values;

    useEffect(() => {
        dispatch(getUserInfo() as any)
        setValues({...values,
            name: currentName,
            email: currentLogin,
        })
    }, [currentName, currentLogin]);

    const [isDisabled, setDisabled] = useState<{[index: string]: boolean}>({
        name: true,
        email: true,
        password: true,
    })

    const [isInputEdited, setIsInputEdited] = useState(false);

    const handleInputChange = () => {
        setIsInputEdited(true)
    }

    const handleIconClick = (inputName: string) => {
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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(updateUserInfo(name, email, password) as any);
        setIsInputEdited(false);
        setDisabled({
            name: true,
            email: true,
            password: true,
        })
    }


    return (
        <form onChange={handleInputChange} onReset={handleReset} onSubmit={e => handleSubmit(e)}>
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

export default UserInfo;