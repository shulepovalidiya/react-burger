import React, {useState, FC, FormEvent, ChangeEvent} from "react";
import FormTemplate from "../../components/form-template/form-template";
import {EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import NavCaption from "../../components/nav-caption/nav-caption";
import {useDispatch, useSelector} from "react-redux";
import {sendPasswordRecoveryCode} from "../../services/actions/auth";
import {useNavigate} from "react-router-dom";
import {RootState} from "../../index";


const ForgotPassword: FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');

    const {isResetPasswordAvailable} :
        {isResetPasswordAvailable: boolean} = useSelector((state: RootState) => state.auth)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(sendPasswordRecoveryCode(email) as any);
        isResetPasswordAvailable && navigate("/reset-password");
    }

    const handleChange = (e: ChangeEvent) => {
        setEmail((e.target as HTMLInputElement).value)
    }

    return (
        <>
            <FormTemplate header="Восстановление пароля" buttonText="Восстановить" handleSubmit={e => handleSubmit(e)}>
                <EmailInput value={email} onChange={e => handleChange(e)} required/>
            </FormTemplate>
            <NavCaption text={"Вспомнили пароль?"} linkText={"Войти"} to={"/login"}/>
        </>

    )
}

export default ForgotPassword;