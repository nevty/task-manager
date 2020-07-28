import React, {useRef, useState} from "react";
import {storageAPI} from "../../api/api";
import {Button, Card} from "../../styled/Components";

const NewListButton = ({ setLists ,boardId}) => {
    const newTaskInput = useRef(null);
    const [toggleState, toggle] = useState(false);

    const handleCreateList = () => {
        let value = newTaskInput.current.value;
        if (value && value.trim()) {
            storageAPI.createList({ title: value},boardId);
            setLists(storageAPI.getLists(boardId))
        }
        newTaskInput.current.value = "";
    }

    return (
        <Card className="list list_create">
            {
                !toggleState && <>

                    <Button onClick={() => toggle(true)}>
                        Добавить Колонку
                    </Button>
                </>
            }
            {
                toggleState && <>
                    <input placeholder="Заголовок списка" ref={newTaskInput}
                           onKeyDown={(event => event.key === "Enter" ? handleCreateList() : null)}/>
                    <Button onClick={handleCreateList}>
                        Создать
                    </Button>
                    <Button onClick={() => toggle(false)}>
                        Отменить
                    </Button>
                </>
            }
        </Card>
    )
}

export default NewListButton