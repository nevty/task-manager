import dbAPI from "api/api";
import InputToggle from "Components/utils/InputToggle";
import {PlusCircleTwoTone} from "@ant-design/icons";
import React from "react";

const NewTask = ({getTasks,boardId,listId}) => {
    const createTask = async (title)=>{
        dbAPI().createTask({title},boardId,listId);
        getTasks();
    }

    return (
        <InputToggle
            handleSubmit={createTask}
            placeholder="Task name"
            showButtonPlaceholder="Add task"
            showButtonProps={{
                block: true,
                size: "large",
                type: "text"
            }}
            showButtonAppend={<PlusCircleTwoTone/>}
        />
    )
}

export default NewTask;