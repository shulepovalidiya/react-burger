import React, {FC, FormEvent} from "react";
import FormTemplate from "../../components/form-template/form-template";
import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import NavCaption from "../../components/nav-caption/nav-caption";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword} from "../../services/actions/auth";
import {useNavigate, Navigate} from "react-router-dom";
import useForm from "../../hooks/use-form";
import {RootState} from "../../index";


const ResetPassword: FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isResetPasswordAvailable} = useSelector((state: RootState) => state.auth)

    const {values, handleChange} = useForm({
        password: '',
        resetCode: '',
    })

    const {password, resetCode} = values;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(resetPassword(password, resetCode) as any)
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