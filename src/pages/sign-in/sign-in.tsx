import React, {FC, FormEvent} from "react";
import FormTemplate from "../../components/form-template/form-template";
import {EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import NavCaption from "../../components/nav-caption/nav-caption";
import {useNavigate} from "react-router-dom";
import useForm from "../../hooks/use-form";
import {useAppDispatch} from "../../services/hooks";
import {authorize} from "../../services/thunks/auth";

const SignIn: FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {values, handleChange} = useForm({email: '', password: ''})

    const {email, password} = values;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(authorize(email, password) as any);
        navigate('/');
    }

    return (
        <section>
            <FormTemplate header="Вход" buttonText="Войти" handleSubmit={handleSubmit}>
                <EmailInput value={email} onChange={e => handleChange(e)} name={"email"}/>
                <PasswordInput value={password} onChange={e => handleChange(e)} name={"password"}/>
            </FormTemplate>
            <NavCaption text={"Вы — новый пользователь? "} linkText={"Зарегистрироваться"} to={"/register"}/>
            <NavCaption text={"Забыли пароль? "} linkText={"Восстановить пароль"} to={"/forgot-password"}/>
        </section>
    )
}

export default SignIn;