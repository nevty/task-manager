import React, { useState } from "react";
import dbAPI from "api/api";
import {Input, Space, Button} from "antd";

const NewListButton = ({ setLists ,boardId}) => {
    const [toggleState, toggle] = useState(false);
    const [inputV,changeV] = useState('');

    const handleCreateList = async () => {
        if (inputV && inputV.trim()) {
            dbAPI().createList({ title: inputV},boardId);
            setLists(await dbAPI().getLists(boardId))
        }
        changeV("");
        toggle(false)
    }

    const handleCancel = ()=>{
        changeV("");
        toggle(false)
    }

    return (
        <div className="list list_create">
            {
                (toggleState && <>
                    <Input placeholder="Заголовок списка" value={inputV} onChange={e=>changeV(e.target.value)}
                           onPressEnter={handleCreateList}/>
                    <Space>
                        <Button onClick={handleCancel}>
                            Отменить
                        </Button>
                        <Button onClick={handleCreateList}>
                            Создать
                        </Button>
                    </Space>
                </>)
                ||
                <>
                    <Button onClick={() => toggle(true)}>
                        Добавить Колонку
                    </Button>
                </>
            }
        </div>
    )
}

export default NewListButton