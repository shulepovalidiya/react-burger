import React from "react";
import ElementStyles from "./burger-ingredients-element.module.css";
import PropTypes from "prop-types";

function BurgerIngredientsElement({img, price, name}) {
    return (
        <figure className={`${ElementStyles.card}`}>
            <div className={`${ElementStyles.counterIcon} text text_type_main-default`}>1</div>
            <img src={img} className="mt-0 mr-4 ml-4 mb-1"/>
            <figcaption className="text text_type_main-default">
                <div className={`${ElementStyles.price} mb-1`}>
                    <span>{price}</span>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.38488 1.65561C9.58175 1.18895 9.03973 0.758987 8.63011 1.05689L0.411836 7.03382C0.153092 7.222 8.63274e-06 7.52262 8.63274e-06 7.84256V12.4828C8.63274e-06 12.6932 0.131707 12.8811 0.32948 12.9529L3.15637 13.9785C3.65685 14.1601 4.21185 13.9177 4.41879 13.4271L9.38488 1.65561Z" fill="#F2F2F3"/>
                        <path d="M0.62116 14.9076C0.322174 14.7916 5.37847e-06 15.0122 2.35835e-06 15.3329V15.3329C8.89497e-07 15.4889 0.0796849 15.634 0.211271 15.7178L9.23069 21.4574C9.33259 21.5223 9.44078 21.3844 9.35355 21.3008L4.22556 16.3879C4.13043 16.2968 4.01823 16.2254 3.89541 16.1777L0.62116 14.9076Z" fill="#F2F2F3"/>
                        <path d="M12.6465 21.3008C12.5592 21.3844 12.6674 21.5223 12.7693 21.4574L21.7887 15.7178C21.9203 15.634 22 15.4889 22 15.3329V15.3329C22 15.0122 21.6778 14.7916 21.3788 14.9076L18.1046 16.1777C17.9818 16.2254 17.8696 16.2968 17.7745 16.3879L12.6465 21.3008Z" fill="#F2F2F3"/>
                        <path d="M21.6705 12.9529C21.8683 12.8811 22 12.6932 22 12.4828V7.84256C22 7.52262 21.8469 7.222 21.5882 7.03382L13.3699 1.05689C12.9603 0.758988 12.4183 1.18895 12.6151 1.65561L17.5812 13.4271C17.7882 13.9177 18.3432 14.1601 18.8436 13.9785L21.6705 12.9529Z" fill="#F2F2F3"/>
                        <path d="M11.7142 19.9615C11.3221 20.3616 10.6779 20.3616 10.2858 19.9615L6.10635 15.6968C5.83068 15.4155 5.7458 14.9986 5.88954 14.6319L10.069 3.97004C10.4009 3.12332 11.5991 3.12333 11.931 3.97004L16.1105 14.6319C16.2542 14.9986 16.1693 15.4155 15.8937 15.6968L11.7142 19.9615Z" fill="#F2F2F3"/>
                    </svg>
                </div>
                <p className={ElementStyles.name}>{name}</p>
            </figcaption>
        </figure>
    )
}

BurgerIngredientsElement.propTypes = {
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}

export default BurgerIngredientsElement;