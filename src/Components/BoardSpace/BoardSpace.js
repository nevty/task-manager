import React, {useEffect, useState} from "react";
import dbAPI from "api/api";
import NewTaskList from "./TaskList/NewTaskList";
import {List} from "antd";
import TaskList from "./TaskList/TaskList";

const BoardSpace = ({match}) => {
    const [boardState, setBoard] = useState();
    const [listsState, setLists] = useState([]);
    const boardId = match.params.id;
    useEffect(() => {
        async function fetchData() {
            setBoard(await dbAPI().getBoardById(boardId));
            setLists(await dbAPI().getLists(boardId) || [])
        }

        fetchData()
            .catch(e => console.log(e));
    }, [boardId]);
    useEffect(() => {
        if (boardState && boardState.title) document.title = boardState.title
    }, [boardState]);
    return (
        <div className="board">
            <NewTaskList setLists={setLists} boardId={boardId}/>
            <List
                grid={{gutter: 8}}
                dataSource={listsState}
                renderItem={list => (
                    <List.Item>
                        <TaskList list={list}/>
                    </List.Item>
                )}
            />
        </div>
    )
};

export default BoardSpace