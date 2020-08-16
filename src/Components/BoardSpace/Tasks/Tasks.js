import React, {useCallback, useEffect, useState} from "react";
import {Checkbox, Divider, Modal, Typography} from "antd";
import {TaskItem, TaskList} from "styles/styled/Components";
import ActionList from "Components/utils/ActionList";
import {PopoverMenu} from "Components/utils/PopoverMenu";
import NewTask from "./NewTask";
import dbAPI from "api/api";
import {DeleteFilled, EditFilled} from "@ant-design/icons";

const Tasks = ({ list, boardId ,getLists }) => {
    const [tasks, setTasks] = useState([]);

    const getTasks = useCallback(async ()=>{
        setTasks(await dbAPI().getTasks(boardId, list.id) || [])
    },[boardId, list.id]);

    useEffect(() => {
        getTasks()
    }, [getTasks]);

    const toggleTask = async (boolean, taskId) => {
        await dbAPI().toggleTask(!boolean, taskId, list.id, boardId);
        getTasks()
    }
    const deleteTask = async (taskId) => {
        await dbAPI().deleteTask(taskId, list.id, boardId);
        getTasks()
    }
    const showDeleteConfirm = () => Modal.confirm({
        title: 'Are you sure delete this list?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        zIndex: 1500,
        async onOk() {
            await dbAPI().deleteList(boardId, list.id);
            getLists()
        },
        onCancel() {
        },
    });
    return (
        <TaskList
            itemLayout="vertical"
            bordered
            header={
                <>
                    <Typography.Text strong>{list.title}</Typography.Text>
                    <PopoverMenu
                        title="Lists Actions"
                        menu={[
                            { text: "Delete list", action: showDeleteConfirm },
                        ]}
                    />
                </>
            }
            dataSource={tasks}
            renderItem={task => (
                <TaskItem>
                    <Typography.Text delete={task.done}>
                        {task.title}
                    </Typography.Text>
                    <ActionList
                        className="task__actions"
                        direction="right"
                        mode="hover"
                        toggleIcon={<EditFilled/>}
                        actions={[
                            <DeleteFilled onClick={() => deleteTask(task.id)}
                                          style={{ fontSize: "18px", color: "#ff4d4f" }}/>,
                            <Checkbox checked={task.done} onClick={() => toggleTask(task.done, task.id)}/>,
                        ]}
                    />
                </TaskItem>
            )}
        >
            <NewTask getTasks={getTasks} boardId={boardId} listId={list && list.id}/>
        </TaskList>
    )
}

export default Tasks