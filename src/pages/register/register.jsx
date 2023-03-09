import React from "react";
import FormTemplate from "../../components/form-template/form-template";
import {EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import NavCaption from "../../components/nav-caption/nav-caption";
import {register} from "../../services/actions/auth";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import useForm from "../../hooks/use-form";

export default function Register() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {values, handleChange} = useForm({
        email: '',
        name: '',
        password: ''
    });

    const { email, name, password } = values;

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(register(email, password, name))
        navigate('/');
    }

    return (
        <section>
            <FormTemplate header={"Регистрация"} buttonText={"Зарегистрироваться"} handleSubmit={handleSubmit}>
                <Input placeholder={"Имя"} value={name} onChange={e => handleChange(e)} name={"name"}/>
                <EmailInput value={email} onChange={e => handleChange(e)} name={"email"}/>
                <PasswordInput value={password} onChange={e => handleChange(e)} name={"password"}/>
            </FormTemplate>
            <NavCaption text={"Уже зарегистрированы?"} linkText={"Войти"} to={"/login"}/>
        </section>
    )
}