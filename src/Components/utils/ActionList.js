import React, {useState} from 'react';
import styled from "styled-components"
import ClickAwayListener from "react-click-away-listener";

const ActionList = ({ actions, toggleIcon, mode = "click", className, ...props }) => {
    const [expanded, toggle] = useState(false);

    const handleClick = () => toggle(!expanded);
    const handleOpen = () => toggle(true);
    const handleClose = () => toggle(false);
    return (
        <Wrapper
            {...props}
            className={className}
            onClickAway={handleClose}
        >
            <Toggle
                onClick={mode === "click" ? handleClick : null}
                onMouseEnter={mode === "hover" ? handleOpen : null}
                onMouseLeave={mode === "hover" ? handleClose : null}
            >
                {toggleIcon}
            </Toggle>
            <List>
                {
                    actions.map((Element, index) => (
                        <ListItem
                            key={index}
                            expanded={expanded}
                        >
                            {Element}
                        </ListItem>
                    ))
                }
            </List>
        </Wrapper>
    )
}

const Toggle = styled.button`
    display: inline-block;
    color: inherit;
    border: none;
    margin: 0;
    padding: 0;
    background: transparent;
`

const ClickWrapper = ({ onClickAway, children, ...props }) => (
    <ClickAwayListener onClickAway={onClickAway} {...props}>
        {children}
    </ClickAwayListener>
)

const Wrapper = styled(ClickWrapper)`
    position: relative;
    width: 18px;
    height: 22px;
`

const List = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    position: absolute;
    top: 0;
    right: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: start;
    align-content: center;
`

const ListItem = styled.li`
    margin-right: 10px;
    cursor: pointer;
    ${({ expanded }) => expanded ?
    "transform: scale(1)"
    :
    "transform: scale(0)"}
`

export default ActionList