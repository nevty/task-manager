import React from "react";
import {Link} from "react-router-dom";
import {Card} from "styles/styled/Components";
import {MoreOutlined} from "@ant-design/icons";
import {Typography} from "antd";

const DeskCard = ({ title,id }) => {
    return (
        <Card>
            <div className="actions">
                <MoreOutlined style={{fontSize: "16px",cursor:"pointer"}}/>
            </div>
            <Link to={`desk/${id}`} strong component={Typography.Link}>{title}</Link>
        </Card>
    )
}

export default DeskCard