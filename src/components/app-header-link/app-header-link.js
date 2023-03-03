import React from "react";

export default function AppHeaderLink({isActive, IconType, text}) {

    return (
        <>
            <IconType type={isActive ? "primary" : "secondary"} className={"mr-72"}></IconType>
            <p className={`text text_type_main-default ${isActive ? "text_color_primary" : "text_color_inactive"}`}>
                {text}
            </p>
        </>
    )

}