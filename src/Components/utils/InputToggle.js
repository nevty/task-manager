import React, {useState} from "react";
import dbAPI from "api/api";
import {Card} from "styles/styled/Components";
import {Button, Col, Input, Row} from "antd";


const InputToggle = ({ handleSubmit, placeholder, showButtonPlaceholder,showButtonProps }) => {
    const [toggleState, toggle] = useState(false);
    const [inputV,changeV] = useState('');

    const onSubmit = () => {
        if (inputV && inputV.trim()) {
            handleSubmit(inputV);
        }
        changeV("");
        toggle(false)
    };

    const handleCancel = ()=>{
        changeV("");
        toggle(false)
    }

    return toggleState
        ?
        <Row gutter={[0 , 8]}>
            <Col span="24">
                <Input placeholder={placeholder} value={inputV} onChange={e=>changeV(e.target.value)}
                       onPressEnter={onSubmit}/>
            </Col>
            <Col span="24">
                <Row gutter={[8]}>
                    <Col span="12">
                        <Button block onClick={handleCancel}>
                            Отменить
                        </Button>
                    </Col>
                    <Col span="12">
                        <Button block onClick={onSubmit}>
                            Создать
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
        :
        <Button onClick={() => toggle(true)} {...showButtonProps}>
            {showButtonPlaceholder}
        </Button>
}

export default InputToggle