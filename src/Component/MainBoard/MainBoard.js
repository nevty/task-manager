import React, {useEffect, useState} from "react";
import NewDeskButton from "./NewDeskButton";
import {storageAPI} from "../../api/api";
import DeskCard from "./DeskCard";

const MainBoard = () => {
    const [desksState, setDesks] = useState([]);
    useEffect(() => {
        setDesks(storageAPI.getDesks() || [])
    }, []);
    return (
        <div className="board_main">
            <NewDeskButton setDesks={setDesks}/>
            {desksState.map((desk, index) => (
                    <DeskCard key={index} title={desk.title} id={desk.id}/>
                ))}
        </div>
    )
}

export default MainBoard