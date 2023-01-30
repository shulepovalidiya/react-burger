import React, {useRef} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {CUT_INGREDIENT, DELETE_INGREDIENT, REORDER_INGREDIENTS} from "../../services/actions/burger-ingredients";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import styles from './burger-constructor-draggable-element.module.css'

export default function BurgerConstructorDraggableElement({ingredient, index, id}) {

    const {name, image, price} = ingredient;


    const dispatch = useDispatch();
    const handleDelete = (index) => {
        dispatch({
            type: DELETE_INGREDIENT,
            index,
        })
    };

    const ref=useRef();

    const [{ handlerId }, drop] = useDrop({
        accept: ["constructorElement"],
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            // Индекс перемещаемого элемента
            const dragIndex = item.index;
            // Индекс текущего элемента (над которым находится курсор при dnd)
            const hoverIndex = index;
            // Выходим, если индексы сопадают
            if (dragIndex === hoverIndex) {
                return;
            }

            // Получаем положение текущего элемента относительно экрана
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Получаем центр текущего элемента по вертикали
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Получаем положение курсора
            const clientOffset = monitor.getClientOffset();
            // Получаем положение курсора относительно текущего элемента
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            // Выходим, если перемещаемый элемент ниже, чем 50% от высоты текущего
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Выходим, если перемещаемый элемент выше, чем 50% от высоты текущего
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            dispatch({
                type: CUT_INGREDIENT,
                from: dragIndex,
            })

            dispatch({
                type: REORDER_INGREDIENTS,
                to: hoverIndex,

            })


            // Сразу меняем индекс перемещаемого элемента
            item.index = hoverIndex;
        }
    });
    const [{ isDragging }, drag] = useDrag({
        type: "constructorElement",
        item: () => {
            // Определяем элемент
            return { index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <li ref={ref} data-handler-id={handlerId} style={{ opacity }} className={styles.element}>
            <DragIcon type={"primary"} />
            <ConstructorElement
                text={name}
                thumbnail={image}
                price={price}
                isLocked={false}
                handleClose={() => handleDelete(index)}
            />
        </li>
    )
}