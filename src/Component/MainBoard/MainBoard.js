import React, {useEffect, useState} from "react";
import NewDeskButton from "./NewDeskButton";
import {storageAPI} from "../../api/api";
import DeskCard from "./DeskCard";
import {List} from "antd";

const MainBoard = () => {
    const [desksState, setDesks] = useState([]);
    useEffect(() => {
        setDesks(storageAPI.getDesks() || [])
    }, []);
    return (
        <div className="board_main">
            <List
             grid={{gutter:8}}
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