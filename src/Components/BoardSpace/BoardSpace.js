import React, {useCallback, useEffect, useState} from "react";
import dbAPI from "api/api";
import NewTaskList from "./Tasks/NewTaskList";
import {List} from "antd";
import Tasks from "./Tasks/Tasks";

const BoardSpace = ({match}) => {
    const boardId = match.params.id;
    const [boardState, setBoard] = useState();
    const [listsState, setLists] = useState([]);
    const getLists = useCallback(async ()=>{
        setLists(await dbAPI().getLists(boardId) || [])
    },[boardId]);

    useEffect(() => {
        async function fetchData() {
            setBoard(await dbAPI().getBoardById(boardId));
            getLists()
        }

        fetchData()
            .catch(e => console.error(e));
    }, [boardId,getLists]);
    useEffect(() => {
        const title = document.title;
        if (boardState && boardState.title) document.title = boardState.title;
        return ()=> {document.title = title};
    }, [boardState]);
    return (
        <div className="board">
            <NewTaskList setLists={setLists} boardId={boardId}/>
            <List
                grid={{gutter: 8}}
                dataSource={listsState}
                renderItem={list => (
                    <List.Item>
                        <Tasks
                            list={list}
                            boardId={boardId}
                            getLists={getLists}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
};

export default BoardSpace