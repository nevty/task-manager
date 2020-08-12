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
    
    @media (max-width: 576px) {
      width: 100%;
    }
`

export const TaskList = styled(List)`
    width: 280px;
    .ant-list-header {
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
`

export const TaskItem = styled(List.Item)`
    padding: 4px;
    margin: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    background: #ffffff;
    border-radius: 3px;
    position: relative;
    .actions {
      position: absolute;
      z-index: 1;
      right: 5px;
      top: 5px;
      ul {
        padding-left: 5px;
      }
      button {
        display: none;
        opacity: .6;
        background-clip: padding-box;
        background-origin: padding-box;
        border-radius: 3px;
        padding: 0 4px;
      }
    }
    &:hover {
      .actions button {
        display: block;
      }
      .actions:hover button {
        background-color: rgba(0,0,0,.1);
        opacity: .9;
      }
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