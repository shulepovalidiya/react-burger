import React, {useEffect, useState} from 'react';
import modalStyles from "./modal.module.css";
import {createPortal} from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

function Modal({children, header, shouldOpen }) {

    const [isOpened, setIsOpened] = useState(false);

    const handleClose = () => setIsOpened(false);

    const closeByEsc = (e) => {
        if (isOpened && e.key === "Escape") {
            handleClose();
        }
    }

    const closeByOverlayClick = (e) => {
        if (isOpened && e.target.classList.contains("modal-overlay")) {
            handleClose();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', closeByEsc)
        document.addEventListener('click', closeByOverlayClick)
        return () => {
            document.removeEventListener('keydown', closeByEsc)
            document.addEventListener('click', closeByOverlayClick)
        }
    }, [isOpened])

    useEffect(() => {
        shouldOpen && setIsOpened(true);
    }, [shouldOpen])

    const modalRoot = document.getElementById('modals');

    return createPortal(
        <ModalOverlay isOpened={isOpened} >
            <div className={`${isOpened ? modalStyles.opened : modalStyles.closed}`}>
                <div className={`${modalStyles.header} mt-10 mr-10 ml-10`}>
                    <h2 className="text text_type_main-large">{header}</h2>
                    <CloseIcon onClick={handleClose} type={"primary"} />
                </div>
                {children}
            </div>
        </ModalOverlay>, modalRoot)

}

Modal.PropTypes = {
    children: PropTypes.element.isRequired,
    header: PropTypes.string,
    shouldOpen: PropTypes.bool.isRequired,
}

export default Modal;