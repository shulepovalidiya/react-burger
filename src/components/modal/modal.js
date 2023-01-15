import React, {useEffect, useState} from 'react';
import modalStyles from "./modal.module.css";
import {createPortal} from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

function Modal({children, header, onClose}) {

    const closeByEsc = (e) => {
        if (e.key === "Escape") {
            onClose();
        }
    }

    const closeByOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    }

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
        <ModalOverlay onClose={onClose}>
            <div className={`${modalStyles.opened}`}>
                <div className={`${modalStyles.header} mt-10 mr-10 ml-10`}>
                    <h2 className="text text_type_main-large">{header}</h2>
                    <CloseIcon onClick={onClose} type={"primary"} />
                </div>
                {children}
            </div>
        </ModalOverlay>, modalRoot)

}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired,
}

export default Modal;