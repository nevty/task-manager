import {StyledList} from "styles/styled/Components";
import React, {useEffect, useState} from "react";
import dbAPI from "api/api";
import NewTask from "./NewTask";

const TaskList = ({list, boardId}) => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        async function fetchData() {
            setTasks(await dbAPI().getTasks(boardId,list.id) || [])
        }

        fetchData()
            .catch(e => console.log(e))
    }, [boardId])
    return (
        <StyledList
            itemLayout="vertical"
            bordered
            header={list.title}
            dataSource={tasks}
            renderItem={task=>(
                <StyledList.Item>
                    {task.title}
                </StyledList.Item>
            )}
        >
            <NewTask setTasks={setTasks} boardId={boardId} listId={list && list.id}/>
        </StyledList>
    )
}

export default TaskList