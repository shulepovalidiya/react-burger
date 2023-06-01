import { useState, ChangeEvent } from "react";

type TInputValues = {
    [key: string]: string;
};

const useForm = (inputValues: TInputValues) => {
    const [values, setValues] = useState(inputValues);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setValues({ ...values, [name]: value });
    };

    return { values, handleChange, setValues };
};

export default useForm;