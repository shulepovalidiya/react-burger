import React, {useMemo} from "react";
import constructorStyles from "./burger-constructor.module.css";
import {
    ConstructorElement,
    Button,
    CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {ingredientTypes} from "../../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import BurgerConstructorDraggableElement
    from "../burger-constructor-draggable-element/burger-constructor-draggable-element";
import {
    BUN_DROP,
    CLOSE_ORDER_MODAL,
    INGREDIENT_DROP,
    getOrderNumber,
} from "../../services/actions/burger-ingredients";
import {useDrop} from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import {useNavigate, Outlet} from "react-router-dom";

function BurgerConstructor() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {bun} = ingredientTypes;
    const {
        ingredients,
        draggedIngredients,
        currentBun,
        orderNumber,
    } = useSelector(state => state.ingredients)

    const {loggedIn} = useSelector(state => state.auth)

    const getIngredientsID = () => {
        let ingredientsID = [];
        ingredientsID.push(currentBun._id);
        draggedIngredients.forEach(item => ingredientsID.push(item._id))
        ingredientsID.push(currentBun._id);
        return ingredientsID;
    }

    const handleSubmitBtnClick = () => {
        loggedIn
            ? dispatch(getOrderNumber(getIngredientsID()))
            : navigate("/login")
    };

    const handleClose = () => dispatch({type: CLOSE_ORDER_MODAL});

    const getTotalPrice = () => {
        let totalPrice = 0;
        if (currentBun) {
            totalPrice += currentBun.price * 2;
        }
        totalPrice += draggedIngredients.reduce((sum, current) => sum + current.price, 0)
        return totalPrice;
    }

    const memoizedTotalPrice = useMemo(getTotalPrice, [draggedIngredients, currentBun])

    const getIngredientTypeById = (id) => {
        const ingredientData = ingredients.find(ingredient => ingredient._id === id)
        return ingredientData.type;
    }

    const [{}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            getIngredientTypeById(itemId.id) === bun
                ? dispatch({
                    type: BUN_DROP,
                    data: ingredients.find(ingredient => ingredient._id === itemId.id),
                })
                : dispatch({
                    type: INGREDIENT_DROP,
                    data: {
                        ...ingredients.find(ingredient => ingredient._id === itemId.id),
                        uuid: uuidv4(),
                    },
                })
        },

    });

    return (
        <section className={`${constructorStyles.constructor} pt-25 pr-4 pl-4`}>
            <div className={constructorStyles.constructorList} ref={dropTarget}>
                {!currentBun
                    ? (<div className={`${constructorStyles.top} ${constructorStyles.default}`}>
                        <p className="text text_type_main-default text_color_inactive">Выберите булку</p>
                    </div>)
                    : (<ConstructorElement
                        text={`${currentBun.name} (верх)`}
                        thumbnail={currentBun.image}
                        price={currentBun.price}
                        type={"top"}
                        isLocked={true}
                        extraClass={"ml-6"}/>)
                }
                <ul className={constructorStyles.constructorList}>
                    {draggedIngredients.length !== 0
                        ? draggedIngredients.map((ingredient, index) =>
                            <BurgerConstructorDraggableElement
                                ingredient={ingredient}
                                index={index}
                                key={ingredient.uuid}/>)
                        : (<div className={constructorStyles.default}>
                            <p className="text text_type_main-default text_color_inactive">Выберите начинку</p>
                        </div>)
                    }
                </ul>

                {!currentBun
                    ? (<div className={`${constructorStyles.bottom} ${constructorStyles.default}`}>
                        <p className="text text_type_main-default text_color_inactive">Выберите булку</p>
                    </div>)
                    : (<ConstructorElement
                        text={`${currentBun.name} (низ)`}
                        thumbnail={currentBun.image}
                        price={currentBun.price}
                        type={"bottom"}
                        isLocked={true}
                        extraClass={"ml-6"}
                    />)}
            </div>
            <div className={`${constructorStyles.orderSection} mt-10`}>
                <span className="text text_type_digits-medium mr-2">{memoizedTotalPrice}</span>
                <CurrencyIcon type="primary"/>
                <Button htmlType="button" type="primary" size="medium" onClick={handleSubmitBtnClick}
                        disabled={!currentBun}>
                    Оформить заказ
                </Button>
            </div>
            {
                orderNumber && (
                    <Modal onClose={handleClose}>
                        <OrderDetails orderNumber={orderNumber}/>
                    </Modal>
                )
            }
        </section>
    )
}


export default BurgerConstructor;