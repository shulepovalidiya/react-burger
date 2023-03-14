import React from "react";
import overlayStyles from './modal-overlay.module.css'
import PropTypes from "prop-types";

function ModalOverlay({children}) {

    return (
        <div className={`${overlayStyles.opened} modal-overlay`} >
            {children}
        </div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
}

export default ModalOverlay;