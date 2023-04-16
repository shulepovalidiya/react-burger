import React, {FC, useEffect, ReactNode} from 'react';
import modalStyles from "./modal.module.css";
import {createPortal} from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {TOrder} from "../../services/reducers/ws-reducer";

type TModalProps = {
    children: ReactNode;
    header?: string;
    onClose: () => void;
    isOrder?: boolean;
    isOwn?: boolean;
}

const Modal: FC<TModalProps> = ({children, header, onClose, isOrder, isOwn}) => {

    const closeByEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();

    const {id} = useParams()!;

    const {orders, ownOrders}: { orders: TOrder[], ownOrders: TOrder[] } = useSelector((state: RootState) => state.orders)

    const order = isOwn
        ? ownOrders && ownOrders.find(order => order._id === id)
        : orders && orders.find(order => order._id === id)

    const closeByOverlayClick = (e: Event) => (e.target as Element).classList.contains("modal-overlay") && onClose();

    useEffect(() => {
        document.addEventListener('keydown', closeByEsc)
        document.addEventListener('click', closeByOverlayClick)

        return () => {
            document.removeEventListener('keydown', closeByEsc)
            document.removeEventListener('click', closeByOverlayClick)
        }
    }, [])

    const modalRoot = document.getElementById('modals');

    return createPortal(
        <ModalOverlay>
            <div className={`${modalStyles.opened}`}>
                <div className={`${modalStyles.header} mt-10 mr-10 ml-10`}>
                    {isOrder && order
                        ? <h2 className="text text_type_digits-default">#0{order!.number}</h2>
                        : <h2 className="text text_type_main-large">{header}</h2>
                    }
                    <CloseIcon onClick={onClose} type={"primary"}/>
                </div>
                {children}
            </div>
        </ModalOverlay>, modalRoot as Element)

}

export default Modal;