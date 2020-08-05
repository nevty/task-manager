import React, {useEffect, useState} from "react";
import NewBoard from "./NewBoard";
import BoardCard from "./BoardCard";
import {List} from "antd";
import dbAPI from "api/api"

const MainBoard = () => {
    const [boardsState, setBoards] = useState([]);
    useEffect(() => {
        async function fetchData() {
            setBoards(await dbAPI().getDesks() || [])
        }

        fetchData()
            .catch(e => console.log(e));
    }, []);
    const deleteBoard = async (id) => {
        await dbAPI().deleteDesk(id);
        setBoards(await dbAPI().getDesks() || [])
    }
    const changeBoardTitle = async (boardId, title) => {
        await dbAPI().changeDeskTitle(boardId, title);
        setBoards(await dbAPI().getDesks() || []);
    }
    return (
        <div className="board board_main">
            <List
                grid={{gutter: 24}}
                dataSource={boardsState}
                header={<NewBoard setBoards={setBoards}/>}
                renderItem={board => (
                    <List.Item>
                        <BoardCard
                            id={board.id}
                            title={board.title}
                            deleteBoard={deleteBoard}
                            changeBoardTitle={changeBoardTitle}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default MainBoard