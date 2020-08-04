import React, {useEffect, useState} from "react";
import NewDeskButton from "./NewDeskButton";
import DeskCard from "./DeskCard";
import {List} from "antd";
import dbAPI from "api/api"

const MainBoard = () => {
    const [desksState, setDesks] = useState([]);
    useEffect(() => {
        async function fetchData() {
            setDesks(await dbAPI().getDesks() || [])
        }

        fetchData()
            .catch(e => console.log(e));
    }, []);
    const deleteDesk = async (id) => {
        await dbAPI().deleteDesk(id);
        setDesks(await dbAPI().getDesks() || [])
    }
    const changeDeskTitle = async (deskId, title) => {
        await dbAPI().changeDeskTitle(deskId, title);
        setDesks(await dbAPI().getDesks() || []);
    }
    return (
        <div className="board board_main">
            <List
                grid={{gutter: 24}}
                dataSource={desksState}
                header={<NewDeskButton setDesks={setDesks}/>}
                renderItem={desk => (
                    <List.Item>
                        <DeskCard
                            id={desk.id}
                            title={desk.title}
                            deleteDesk={deleteDesk}
                            changeDeskTitle={changeDeskTitle}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default MainBoard