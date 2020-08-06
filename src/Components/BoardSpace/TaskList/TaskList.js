import {StyledList} from "styles/styled/Components";
import {Button, Input, Space} from "antd";
import {PlusCircleTwoTone} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import dbAPI from "api/api";

const TaskList = ({list, boardId}) => {
    const [tasksState, setTasksState] = useState([]);
    useEffect(() => {
        async function fetchData() {
            setTasksState(await dbAPI().getTasks(boardId) || [])
        }

        fetchData()
            .catch(e => console.log(e))
    }, [boardId])
    return (
        <StyledList
            itemLayout="vertical"
            bordered
            header={list.title}
        >
            <NewTask/>
        </StyledList>
    )
}

const NewTask = () => {
    const [toggleState, toggle] = useState(false);
    const [inputV, changeV] = useState('');
    const handleCancel = ()=>{
        toggle(false)
    }
    return (

        <>
            {
                (toggleState && <Space>
                    <Input/>
                    <Button onClick={handleCancel}>X</Button>
                </Space>)
                ||
                <Button onClick={()=>toggle(!toggleState)} block size="large" type="text">
                    Add task <PlusCircleTwoTone/>
                </Button>
            }
        </>
    )
}

export default TaskList