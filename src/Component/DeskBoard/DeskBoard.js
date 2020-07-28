import React, {useEffect, useState} from "react";
import {storageAPI} from "../../api/api";
import NewListButton from "../TaskBoard/NewListButton";

const DeskBoard = ({ match }) => {
    const [boardState, setBoard] = useState();
    const [listsState, setLists] = useState([]);
    const boardId = match.params.id;
    useEffect(() => {
        setBoard(storageAPI.getDeskById(boardId));
        setLists(storageAPI.getLists(boardId) || [])
    }, [boardId]);
    useEffect(() => {
        if (boardState && boardState.title) {
            document.title = boardState.title
        } else document.title = ""
    }, [boardState]);
    return (
        <>
            {listsState.map((list, index) => {
                return (
                    <div key={index}>
                        {list.title}
                    </div>
                )
            })}
            <NewListButton setLists={setLists} boardId={boardId}/>
        </>
    )
};

export default DeskBoard