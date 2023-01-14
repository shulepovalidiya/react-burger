import React from "react";
import overlayStyles from './modal-overlay.module.css'
import PropTypes from "prop-types";

function ModalOverlay({isOpened, children}) {

    return (
        <div className={`${isOpened ? overlayStyles.opened : overlayStyles.closed} modal-overlay`} >
            {children}
        </div>
    )
}

ModalOverlay.PropTypes = {
    isOpened: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
}

export default ModalOverlay;