import React from "react";
import constructorStyles from "./burger-constructor.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function BurgerConstructor({data}) {

    function getTotalPrice() {
        let totalPrice = 0;
        data.forEach(item => {
            totalPrice += item.price
        })
        return totalPrice;
    };

    return (
        <section className={`${constructorStyles.constructor} pt-25 pr-4 pl-4`}>
            <ConstructorElement
                text={data[0].name}
                thumbnail={data[0].image}
                price={data[0].price}
                extraClass="mr-4 mb-4 ml-8"
                type="top"
                isLocked={true}
            />
            <ul className={constructorStyles.constructorList}>
                {
                    data.map((item) =>
                        (
                            <li key={item._id} className={constructorStyles.constructorItem}>
                                <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.5 2.15375C4.5 3.34325 3.60455 4.3075 2.5 4.3075C1.39545 4.3075 0.5 3.34325 0.5 2.15375C0.5 0.96427 1.39545 0 2.5 0C3.60455 0 4.5 0.96427 4.5 2.15375ZM2.5 11.3075C3.60455 11.3075 4.5 10.3433 4.5 9.15375C4.5 7.96425 3.60455 7 2.5 7C1.39545 7 0.5 7.96425 0.5 9.15375C0.5 10.3433 1.39545 11.3075 2.5 11.3075ZM2.5 18.3075C3.60455 18.3075 4.5 17.3433 4.5 16.1537C4.5 14.9642 3.60455 14 2.5 14C1.39545 14 0.5 14.9642 0.5 16.1537C0.5 17.3433 1.39545 18.3075 2.5 18.3075Z" fill="#F2F2F3"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.5 2.15375C13.5 3.34325 12.6045 4.3075 11.5 4.3075C10.3954 4.3075 9.5 3.34325 9.5 2.15375C9.5 0.96427 10.3954 0 11.5 0C12.6045 0 13.5 0.96427 13.5 2.15375ZM11.5 11.3075C12.6045 11.3075 13.5 10.3433 13.5 9.15375C13.5 7.96425 12.6045 7 11.5 7C10.3954 7 9.5 7.96425 9.5 9.15375C9.5 10.3433 10.3954 11.3075 11.5 11.3075ZM11.5 18.3075C12.6045 18.3075 13.5 17.3433 13.5 16.1537C13.5 14.9642 12.6045 14 11.5 14C10.3954 14 9.5 14.9642 9.5 16.1537C9.5 17.3433 10.3954 18.3075 11.5 18.3075Z" fill="#F2F2F3"/>
                                </svg>
                                <ConstructorElement
                                    text={item.name}
                                    thumbnail={item.image}
                                    price={item.price}
                                    extraClass={`mr-4`}
                                />
                            </li>
                            )
                    )
                }
            </ul>
            <ConstructorElement
                text={data[0].name}
                thumbnail={data[0].image}
                price={data[0].price}
                extraClass="mb-10 mr-4 mt-4 ml-8"
                type="bottom"
                isLocked={true}
            />
            <div className={`${constructorStyles.orderSection} mt-10`}>
                <span className="text text_type_digits-medium mr-2">{getTotalPrice()}</span>
                <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-10">
                    <path d="M14.9265 1.15561C15.1234 0.688944 14.5814 0.258987 14.1718 0.556891L0.911841 10.2005C0.653097 10.3887 0.500013 10.6893 0.500013 11.0092V18.3995C0.500013 18.6099 0.631712 18.7978 0.829485 18.8695L5.68112 20.6298C6.1816 20.8113 6.73659 20.5689 6.94354 20.0784L14.9265 1.15561Z" fill="#F2F2F3"/>
                    <path d="M1.18083 21.7641C0.853125 21.637 0.500009 21.8787 0.500006 22.2302L0.500003 22.6005C0.500001 22.7715 0.587339 22.9306 0.731565 23.0224L14.7724 31.9574C14.8743 32.0223 14.9824 31.8844 14.8952 31.8008L6.76629 24.0129C6.67116 23.9217 6.55896 23.8503 6.43614 23.8027L1.18083 21.7641Z" fill="#F2F2F3"/>
                    <path d="M19.1048 31.8008C19.0176 31.8844 19.1257 32.0223 19.2277 31.9574L33.2684 23.0224C33.4127 22.9306 33.5 22.7715 33.5 22.6005V22.2303C33.5 21.8788 33.1469 21.637 32.8192 21.7641L27.5639 23.8027C27.4411 23.8503 27.3289 23.9217 27.2337 24.0129L19.1048 31.8008Z" fill="#F2F2F3"/>
                    <path d="M33.1705 18.8695C33.3683 18.7978 33.5 18.6099 33.5 18.3995V11.0092C33.5 10.6893 33.3469 10.3887 33.0882 10.2005L19.8282 0.556892C19.4186 0.258988 18.8766 0.688947 19.0735 1.15561L27.0565 20.0784C27.2634 20.5689 27.8184 20.8113 28.3189 20.6298L33.1705 18.8695Z" fill="#F2F2F3"/>
                    <path d="M17.7142 29.8067C17.3221 30.2068 16.6779 30.2068 16.2858 29.8067L9.43301 22.814C9.15734 22.5327 9.07246 22.1158 9.2162 21.7491L16.069 4.26753C16.4009 3.42082 17.5991 3.42082 17.931 4.26753L24.7838 21.7491C24.9276 22.1158 24.8427 22.5327 24.567 22.814L17.7142 29.8067Z" fill="#F2F2F3"/>
                </svg>
                <Button htmlType="button" type="primary" size="medium">Оформить заказ</Button>
            </div>

        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default BurgerConstructor;