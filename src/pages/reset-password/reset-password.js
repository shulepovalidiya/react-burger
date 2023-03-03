import React, {useState} from "react";
import FormTemplate from "../../components/form-template/form-template";
import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import NavCaption from "../../components/nav-caption/nav-caption";
import {useDispatch} from "react-redux";
import {resetPassword} from "../../services/actions/auth";
import {useNavigate} from "react-router-dom";

export default function ResetPassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [resetCode, setResetCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(password, resetCode))
        navigate("/login");
    }

    return (
        <section>
            <FormTemplate header={"Восстановление пароля"} buttonText={"Сохранить"} handleSubmit={handleSubmit}>
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
                <Input value={resetCode} onChange={(e) => setResetCode(e.target.value)}/>
            </FormTemplate>
            <NavCaption text={"Вспомнили пароль?"} linkText={"Войти"} to={"/login"}/>
        </section>
    )
}