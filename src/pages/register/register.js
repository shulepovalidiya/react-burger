import React, {useEffect, useState} from "react";
import FormTemplate from "../../components/form-template/form-template";
import {EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import NavCaption from "../../components/nav-caption/nav-caption";
import {register} from "../../services/actions/auth";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(register(email, password, name))
        navigate('/');
    }

    return (
        <section>
            <FormTemplate header={"Регистрация"} buttonText={"Зарегистрироваться"} handleSubmit={handleSubmit}>
                <Input placeholder={"Имя"} value={name} onChange={e => setName(e.target.value)}/>
                <EmailInput value={email} onChange={e => setEmail(e.target.value)} />
                <PasswordInput value={password} onChange={e => setPassword(e.target.value)}/>
            </FormTemplate>
            <NavCaption text={"Уже зарегистрированы?"} linkText={"Войти"} to={"/login"}/>
        </section>

    )
}