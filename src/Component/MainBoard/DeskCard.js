import React from "react";
import {Link} from "react-router-dom";
import {Card} from "styles/styled/Components";
import {DeleteFilled, EditFilled, MoreOutlined} from "@ant-design/icons";
import {Typography} from "antd";
import ActionList from "../utils/ActionList";

const DeskCard = ({ title, id }) => {
    return (
        <Card>
            <ActionList
                className="actions"
                toggleIcon={<MoreOutlined style={{ fontSize: "16px", cursor: "pointer" }}/>}
                actions={[
                    <DeleteFilled style={{ fontSize: "16px", color: "red"}}/>,
                    <EditFilled style={{ fontSize: "16px"}}/>,
                ]}/>
            <Link to={`desk/${id}`} strong component={Typography.Link}>{title}</Link>
        </Card>
    )
}

export default DeskCard