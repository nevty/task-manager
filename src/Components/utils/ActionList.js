import React, {useState} from 'react';
import styled from "styled-components"
import ClickAwayListener from "react-click-away-listener";

const ActionList = (
    {
        actions, toggleIcon, mode = "click", direction = "left",
        className,
        ...props
    }) => {
    const [toggled, toggle] = useState(false);

    const handleClick = () => toggle(!toggled);
    const handleOpen = () => toggle(true);
    const handleClose = () => toggle(false);
    return (
        <Wrapper
            {...props}
            className={className}
            onClickAway={handleClose}
            onMouseEnter={mode === "hover" ? handleOpen : null}
            onMouseLeave={mode === "hover" ? handleClose : null}
        >
            <Toggle
                onClick={mode === "click" ? handleClick : null}
            >
                {toggleIcon}
            </Toggle>
            <List toggled={toggled} direction={direction}>
                {
                    actions.map((Element, index) => <li key={index}>{Element}</li>)
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
`

const List = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    position: absolute;
    top: 0;
    ${props => props.direction === "right" ? "left" : "right"}: 100%;
    ${props => !props.toggled && "width: 0"};
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: start;
    align-content: center;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      user-select: none;
      margin-${props => props.direction === "right" ? "left" : "right"}: 10px;
      ${props => props.toggled ? "transform: scale(1)" : "transform: scale(0)"}
    }
`

export default ActionList
