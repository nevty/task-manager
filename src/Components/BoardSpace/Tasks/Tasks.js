import React, {useEffect, useState} from "react";
import {Checkbox, Typography} from "antd";
import {TaskItem, TaskList} from "styles/styled/Components";
import ActionList from "Components/utils/ActionList";
import NewTask from "./NewTask";
import dbAPI from "api/api";
import {DeleteFilled, MoreOutlined} from "@ant-design/icons";

const Tasks = ({list, boardId}) => {
    const [tasks, setTasks] = useState([]);
    async function fetchTasks(boardId,listId) {
        setTasks(await dbAPI().getTasks(boardId,listId) || [])
    }
    useEffect(() => {
        fetchTasks(boardId,list.id)
            .catch(e => console.log(e))
    }, [boardId,list.id]);

    const toggleTask = async (boolean, taskId) => {
        dbAPI().toggleTask(!boolean, taskId, list.id, boardId);
        fetchTasks(boardId, list.id)
            .catch(e => console.log(e))
    }
    const deleteTask = async (taskId) => {
        dbAPI().deleteTask(taskId, list.id, boardId);
        fetchTasks(boardId, list.id)
            .catch(e => console.log(e))
    }
    return (
        <TaskList
            itemLayout="vertical"
            bordered
            header={list.title}
            dataSource={tasks}
            renderItem={task=>(
                <TaskItem>
                    <Typography.Text delete={task.done}>
                        {task.title}
                    </Typography.Text>
                    <ActionList
                        className="actions"
                        direction="right"
                        mode="hover"
                        toggleIcon={<MoreOutlined style={{cursor: "pointer"}}/>}
                        actions={[
                            <DeleteFilled onClick={()=>deleteTask(task.id)} style={{fontSize: "18px", color: "#ff4d4f"}}/>,
                            <Checkbox checked={task.done} onClick={()=>toggleTask(task.done,task.id)}/>,
                        ]}
                    />
                </TaskItem>
            )}
        >
            <NewTask setTasks={setTasks} boardId={boardId} listId={list && list.id}/>
        </TaskList>
    )
}

export default Tasks