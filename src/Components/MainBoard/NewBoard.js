import React, {useState} from "react";
import dbAPI from "api/api";
import {Card} from "styles/styled/Components";
import {Button, Col, Input, Row} from "antd";
import InputToggle from "../utils/InputToggle";


const NewBoard = ({setBoards}) => {
    const createBoard = async (title) => {
        dbAPI().createBoard({title});
        setBoards(await dbAPI().getBoards())
    };

    return (
        <Card>
            <InputToggle
                handleSubmit={createBoard}
                placeholder="Название доски"
                showButtonPlaceholder="Создать доску"
            />
        </Card>
    )
}

export default NewBoard