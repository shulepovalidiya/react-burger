import React, {FC} from "react";
import styles from "./ingredient-icon.module.css"

type TIngredientIconProps = {
    src: string;
    ingredientName: string;
}

const IngredientIcon: FC<TIngredientIconProps> = ({src, ingredientName}) => {

    return (
        <div>
            <div className={styles.div}>
                <img src={src} alt={ingredientName} className={styles.img} width="112" height="56"/>
            </div>
        </div>

    )
}

export default IngredientIcon;