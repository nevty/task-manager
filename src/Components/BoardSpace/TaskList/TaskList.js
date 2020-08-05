import {StyledList} from "../../../styles/styled/Components";
import {Button} from "antd";
import {PlusCircleTwoTone} from "@ant-design/icons";
import React from "react";

const TaskList = ({list}) => (
    <StyledList
        itemLayout="vertical"
        bordered
        header={list.title}
    >
        <Button block size="large" type="text">
            Add task <PlusCircleTwoTone/>
        </Button>
    </StyledList>
)

export default TaskList