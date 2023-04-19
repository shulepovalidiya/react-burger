import React, {FC, FormEvent} from "react";
import FormTemplate from "../../components/form-template/form-template";
import {EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import NavCaption from "../../components/nav-caption/nav-caption";
import {useNavigate} from "react-router-dom";
import useForm from "../../hooks/use-form";
import {useAppDispatch} from "../../services/hooks";
import {register} from "../../services/thunks/auth";

const Register: FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {values, handleChange} = useForm({
        email: '',
        name: '',
        password: ''
    });

    const { email, name, password } = values;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(register(email, password, name) as any)
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

export default Register;