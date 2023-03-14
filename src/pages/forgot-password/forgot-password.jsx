import React, {useState} from "react";
import FormTemplate from "../../components/form-template/form-template";
import {EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import NavCaption from "../../components/nav-caption/nav-caption";
import {useDispatch, useSelector} from "react-redux";
import {sendPasswordRecoveryCode} from "../../services/actions/auth";
import {useNavigate} from "react-router-dom";

export default function ForgotPassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const {isResetPasswordAvailable} = useSelector(state => state.auth)


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendPasswordRecoveryCode(email));
        isResetPasswordAvailable && navigate("/reset-password");
    }

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    return (
        <>
            <FormTemplate header="Восстановление пароля" buttonText="Восстановить" handleSubmit={handleSubmit}>
                <EmailInput value={email} onChange={e => handleChange(e)} required/>
            </FormTemplate>
            <NavCaption text={"Вспомнили пароль?"} linkText={"Войти"} to={"/login"}/>
        </>

    )
}