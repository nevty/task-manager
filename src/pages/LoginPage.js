import { Card, Col, Row} from "antd";
import React from "react";
import Login from "../Component/Login/Login";


const LoginPage = ({history})=>{

    return (
        <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
            <Col>
                <Card>
                    <Login/>
                </Card>
            </Col>
        </Row>
    )
}

export default LoginPage