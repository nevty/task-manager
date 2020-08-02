import React, {useEffect, useState} from "react";
import dbAPI from "api/api";
import NewListButton from "../TaskBoard/NewListButton";
import {List} from "antd";

const DeskBoard = ({ match }) => {
    const [boardState, setBoard] = useState();
    const [listsState, setLists] = useState([]);
    const boardId = match.params.id;
    useEffect(() => {
        async function fetchData(){
            setBoard(await dbAPI().getDeskById(boardId));
            setLists(await dbAPI().getLists(boardId) || [])
        }
        fetchData()
            .catch(e=>console.log(e));
    }, [boardId]);
    useEffect(() => {
        if (boardState && boardState.title) document.title = boardState.title
    }, [boardState]);
    return (
        <div className="board">
            <NewListButton setLists={setLists} boardId={boardId}/>
            <List
                grid={{gutter:8}}
                dataSource={listsState}
                renderItem={list => (
                    <List.Item>
                        {list.title}
                    </List.Item>
                )}
            />
        </div>
    )
};

export default DeskBoard