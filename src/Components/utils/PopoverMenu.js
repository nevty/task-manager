import React, {useState} from "react";
import {Divider, Menu, Popover, Typography} from "antd";
import {CloseOutlined, EllipsisOutlined} from "@ant-design/icons";
import './PopoverMenu.scss'

export const PopoverMenu = ({ menu, title, ...props }) => {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);
    return (
        <Popover
            visible={open}
            onVisibleChange={state => setOpen(state)}
            overlayClassName="popover-menu__overlay"
            content={<ContentMenu menu={menu} title={title} close={close}/>}
            trigger="click"
            placement="bottomLeft"
            {...props}
        >
            <EllipsisOutlined
                style={{ fontSize: "16px", cursor: "pointer", position: "absolute", top: "10xp", right: "10px" }}/>
        </Popover>
    )
}

const ContentMenu = ({ menu, title, close }) => (
    <div className="popover-menu__wrapper">
        <div className="popover-menu__title">
            <Typography.Text strong>{title}</Typography.Text>
            <CloseOutlined onClick={close} className="popover-menu__close" shape="circle"/>
        </div>
        <Divider className="popover-menu__divider"/>
        <Menu className="popover-menu__list" selectable={false}>
            {
                menu.map(
                    ({
                         text = "",
                         action = () => null
                     }, index) => (
                        <Menu.Item key={index} onClick={action}>
                            {text}
                        </Menu.Item>
                    ))
            }
        </Menu>
    </div>
)
