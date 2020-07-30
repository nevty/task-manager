import { Col, Row} from "antd";
import React from "react";
import withAuthRedirect from "../hoc/withAuthRedirect";
import authAPI from "../api/auth";

const ProfilePage = ({history})=>{

    const logOut = ()=>{
        authAPI.logout();
    }

    return (
        <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
            <Col>
                <button onClick={logOut}>log out</button>
            </Col>
        </Row>
    )
}

export default withAuthRedirect(ProfilePage)
