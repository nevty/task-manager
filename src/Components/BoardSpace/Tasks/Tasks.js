import React, {useEffect, useState} from "react";
import {TaskItem, TaskList} from "styles/styled/Components";
import dbAPI from "api/api";
import NewTask from "./NewTask";
import {Typography} from "antd";
import {DeleteFilled, EditFilled, MoreOutlined} from "@ant-design/icons";
import ActionList from "../../utils/ActionList";

const Tasks = ({list, boardId}) => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        async function fetchData() {
            setTasks(await dbAPI().getTasks(boardId,list.id) || [])
        }

        fetchData()
            .catch(e => console.log(e))
    }, [boardId])
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
                        toggleIcon={<MoreOutlined style={{fontSize: "16px", cursor: "pointer"}}/>}
                        actions={[
                            <DeleteFilled  style={{fontSize: "16px", color: "#ff4d4f"}}/>,
                            <EditFilled  style={{fontSize: "16px"}}/>,
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