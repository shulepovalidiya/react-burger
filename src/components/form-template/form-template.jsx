import React from "react";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./form-template.module.css"

export default function FormTemplate({header, handleSubmit, buttonText, children}) {

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
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