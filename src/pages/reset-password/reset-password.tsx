import React, {FC, FormEvent} from "react";
import FormTemplate from "../../components/form-template/form-template";
import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import NavCaption from "../../components/nav-caption/nav-caption";
import {useNavigate, Navigate} from "react-router-dom";
import useForm from "../../hooks/use-form";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {resetPassword} from "../../services/thunks/auth";


const ResetPassword: FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {isResetPasswordAvailable} = useAppSelector(state => state.auth)

    const {values, handleChange} = useForm({
        password: '',
        resetCode: '',
    })

    const {password, resetCode} = values;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(resetPassword(password, resetCode))
        navigate("/login");
    }

    return (
        isResetPasswordAvailable
            ? (<section>
                <FormTemplate header={"Восстановление пароля"} buttonText={"Сохранить"} handleSubmit={e => handleSubmit(e)}>
                    <PasswordInput placeholder={"Введите новый пароль"} value={password}
                                   onChange={(e) => handleChange(e)} name={"password"} required/>
                    <Input placeholder={"Введите код из письма"} value={resetCode}
                           onChange={(e) => handleChange(e)} name={"resetCode"} required/>
                </FormTemplate>
                <NavCaption text={"Вспомнили пароль?"} linkText={"Войти"} to={"/login"}/>
            </section>)
            : <Navigate to={"/forgot-password"}/>
    )
}

export default ResetPassword;