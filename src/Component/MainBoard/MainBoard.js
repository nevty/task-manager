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
    return (
        <div className="board board_main">
            <List
                grid={{gutter: 24}}
                dataSource={desksState}
                header={<NewDeskButton setDesks={setDesks}/>}
                renderItem={desk => (
                    <List.Item>
                        <DeskCard title={desk.title} id={desk.id}/>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default MainBoard