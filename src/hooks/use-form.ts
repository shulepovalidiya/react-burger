import {useState, ChangeEvent} from "react";

type TInputValues = {
    [key: string]: string;
};

const useForm: (inputValues: TInputValues) => { handleChange: (e: ChangeEvent) => void; setValues: (value: (((prevState: TInputValues) => TInputValues) | TInputValues)) => void; values: TInputValues } = (inputValues: TInputValues ) => {

    const [values, setValues] = useState(inputValues);

    const handleChange = (e: ChangeEvent) => {
        const { value, name } : {
            value: string;
            name: string;
        } = (e.target as HTMLInputElement);
        setValues({ ...values, [name]: value });
    };

    return { values, handleChange, setValues }

}

export default useForm;