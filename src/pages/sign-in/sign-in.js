import React, {useState} from "react";
import FormTemplate from "../../components/form-template/form-template";
import {EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import NavCaption from "../../components/nav-caption/nav-caption";
import {useDispatch} from "react-redux";
import {authorize} from "../../services/actions/auth";
import {useNavigate} from "react-router-dom";


export default function SignIn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authorize(email, password));
        navigate('/');
    }

    return (
        <section>
            <FormTemplate header="Вход" buttonText="Войти" handleSubmit={handleSubmit}>
                <EmailInput value={email} onChange={(e) => setEmail(e.target.value)}/>
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
            </FormTemplate>
            <NavCaption text={"Вы — новый пользователь? "} linkText={"Зарегистрироваться"} to={"/register"}/>
            <NavCaption text={"Забыли пароль? "} linkText={"Восстановить пароль"} to={"/forgot-password"}/>
        </section>

    )
}