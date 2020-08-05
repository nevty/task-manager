import {Card, Col, Row, Tabs} from "antd";
import React from "react";
import Login from "Components/Login/Login";
import Register from "Components/Login/Register";

const {TabPane} = Tabs

const LoginPage = ({history})=>{
    const redirect = (to)=>{
        history.push(to)
    }

    return (
        <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
            <Col>
                <Card>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Login" key="1">
                            <Login redirect={redirect}/>
                        </TabPane>
                        <TabPane tab="Register" key="2">
                            <Register redirect={redirect}/>
                        </TabPane>
                    </Tabs>
                </Card>
            </Col>
        </Row>
    )
}

export default LoginPage