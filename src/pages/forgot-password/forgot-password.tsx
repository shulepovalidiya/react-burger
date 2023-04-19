import React, {useState, FC, FormEvent, ChangeEvent} from "react";
import FormTemplate from "../../components/form-template/form-template";
import {EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import NavCaption from "../../components/nav-caption/nav-caption";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {sendPasswordRecoveryCode} from "../../services/thunks/auth";


const ForgotPassword: FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');

    const {isResetPasswordAvailable} :
        {isResetPasswordAvailable: boolean} = useAppSelector(state => state.auth)

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