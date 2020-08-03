import React, {useState} from 'react';
import styled from "styled-components"

const ActionList = ({ actions, toggleIcon, mode="click", className, ...props }) => {
    const [expanded, toggle] = useState(false);

    const handleClick = () => toggle(!expanded);
    return (
        <Wrapper className={className} {...props}>
            <Toggle
                onClick={mode === "click" ? handleClick : null}
                onMouseEnter={mode === "hover" ? () => toggle(true) : null}
                onMouseLeave={mode === "hover" ? () => toggle(false) : null}
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
`

const Wrapper = styled.div`
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