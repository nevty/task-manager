import React, {useState} from "react";
import dbAPI from "../../api/api";
import {Card} from "../../styled/Components";
import {Button, Input, Space} from "antd";


const NewDeskButton = ({ setDesks }) => {
    const [toggleState, toggle] = useState(false);
    const [inputV,changeV] = useState('');

    const handleCreateDesk = async () => {
        if (inputV && inputV.trim()) {
            dbAPI().createDesk({ title: inputV});
            setDesks(await dbAPI().getDesks())
        }
        changeV("");
        toggle(false)
    };

    const handleCancel = ()=>{
        changeV("");
        toggle(false)
    }

    return (
        <Card className="desk desk_create">
            {
                (toggleState && <>
                    <Input placeholder="Название доски" value={inputV} onChange={e=>changeV(e.target.value)}
                           onPressEnter={handleCreateDesk}/>
                    <Space>
                        <Button onClick={handleCancel}>
                            Отменить
                        </Button>
                        <Button  onClick={handleCreateDesk}>
                            Создать
                        </Button>
                    </Space>
                </>)
                ||
                <>
                    <Button onClick={() => toggle(true)}>
                        Создать доску
                    </Button>
                </>
            }
        </Card>
    )
}

export default NewDeskButton