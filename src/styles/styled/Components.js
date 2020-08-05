import styled from "styled-components";
import {Card as CardAntD, List} from "antd";

export const Card = styled(CardAntD)`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 270px;
    min-height: 120px;
    padding: 10px 12px;
    border: 1px solid black;
    border-radius: 5px;
    background: transparent;
    .ant-card-body {
        padding: 0;
    }
    
    .actions {
      position: absolute;
      right: 8%;
      top: 12%;
    }
`

export const StyledList = styled(List)`
    width: 280px;
    .ant-list-header {
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
`

export const Button = styled.button`
    display: inline-block;
    color: black;
    border: 2px solid black;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 5px;
`