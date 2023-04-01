import React, {ReactNode, FC, FormEvent} from "react";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./form-template.module.css"

type TFormTemplateProps = {
    header: string;
    handleSubmit: (e: FormEvent) => void;
    buttonText: string;
    children: ReactNode;
}

const FormTemplate: FC<TFormTemplateProps> = ({header, handleSubmit, buttonText, children}) => {

    return (
        <form className={styles.form} onSubmit={e => handleSubmit(e)}>
            <h1 className="text text_type_main-medium mb-6">{header}</h1>
            <fieldset className={styles.fieldset}>
                {children}
            </fieldset>
            <Button htmlType={"submit"} type={"primary"} size={"medium"}  extraClass={"mb-20 mt-6"}>
                {buttonText}
            </Button>
        </form>
    )
}

export default FormTemplate;