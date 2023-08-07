import React, {FC, useEffect, ReactNode} from 'react';
import modalStyles from "./modal.module.css";
import {createPortal} from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

type TModalProps = {
    children: ReactNode;
    header?: string;
    onClose: () => void;
}

const Modal: FC<TModalProps> = ({children, header, onClose}) => {

    const closeByEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();

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
                <div className={`${modalStyles.header} mt-10 mr-10 ml-10`} id="modal-header">
                    <h2 className="text text_type_main-large">{header}</h2>
                    <CloseIcon onClick={onClose} type={"primary"}/>
                </div>
                {children}
            </div>
        </ModalOverlay>, modalRoot as Element)

}

export default Modal;