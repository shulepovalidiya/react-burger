import React, {FC} from "react";

type TIconTypes = 'secondary' | 'primary' | 'error' | 'success';

type TIconProps = { type: TIconTypes; onClick?: () => void; className: string; };

type TAppHeaderLinkProps = {
    isActive: boolean;
    IconType: React.FC<TIconProps>;
    text: string;
}

const AppHeaderLink: FC<TAppHeaderLinkProps> = ({isActive, IconType, text}) => {

    return (
        <>
            <IconType type={isActive ? "primary" : "secondary"} className={"mr-72"}></IconType>
            <p className={`text text_type_main-default ${isActive ? "text_color_primary" : "text_color_inactive"}`}>
                {text}
            </p>
        </>
    )

}

export default AppHeaderLink;