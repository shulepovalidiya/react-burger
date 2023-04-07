import React, {FC, ReactNode} from "react";
import overlayStyles from './modal-overlay.module.css'

type TModalOverlayProps = {
    children: ReactNode;
}

const ModalOverlay: FC<TModalOverlayProps> = ({children}) => {

    return (
        <div className={`${overlayStyles.opened} modal-overlay`} >
            {children}
        </div>
    )
}

export default ModalOverlay;