import React, {useState} from "react";
import dbAPI from "api/api";
import {Card} from "styles/styled/Components";
import {Button, Col, Input, Row} from "antd";


const NewBoard = ({ setBoards }) => {
    const [toggleState, toggle] = useState(false);
    const [inputV,changeV] = useState('');

    const handleCreateBoard = async () => {
        if (inputV && inputV.trim()) {
            dbAPI().createDesk({ title: inputV});
            setBoards(await dbAPI().getDesks())
        }
        changeV("");
        toggle(false)
    };

    const handleCancel = ()=>{
        changeV("");
        toggle(false)
    }

    return (
        <Card>
            {
                (toggleState && <Row gutter={[0 , 8]}>
                    <Col span="24">
                        <Input placeholder="Название доски" value={inputV} onChange={e=>changeV(e.target.value)}
                               onPressEnter={handleCreateBoard}/>
                    </Col>
                    <Col span="24">
                        <Row gutter={[8]}>
                            <Col span="12">
                                <Button block onClick={handleCancel}>
                                    Отменить
                                </Button>
                            </Col>
                            <Col span="12">
                                <Button block onClick={handleCreateBoard}>
                                    Создать
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>)
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

export default NewBoard