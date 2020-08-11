import React  from "react";
import dbAPI from "api/api";
import InputToggle from "Components/utils/InputToggle";

const NewTaskList = ({ setLists ,boardId}) => {
    const createList = async (title) => {
        dbAPI().createList({title},boardId);
        setLists(await dbAPI().getLists(boardId))
    };

    return (
        <div className="list list_create">
            <InputToggle
                handleSubmit={createList}
                placeholder="Заголовок списка"
                showButtonPlaceholder="Добавить Колонку"
            />
        </div>
    )
}

export default NewTaskList