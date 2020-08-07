import React, {useState} from "react";
import {Button, Col, Input, Row} from "antd";

const InputToggle = (
    {
        handleSubmit, placeholder,
        showButtonPlaceholder,showButtonProps,
        showButtonPrepend=<></>,showButtonAppend=<></>,
    }) => {
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
        <Row gutter={[0 , 8]} justify="center">
            <Col span="22">
                <Input placeholder={placeholder} autoFocus
                       onBlur={!inputV.trim() ? handleCancel : null}
                       value={inputV} onChange={e=>changeV(e.target.value)}
                       onPressEnter={onSubmit}
                />
            </Col>
            <Col span="22">
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
            {showButtonPrepend}
            {showButtonPlaceholder}
            {showButtonAppend}
        </Button>
}

export default InputToggle