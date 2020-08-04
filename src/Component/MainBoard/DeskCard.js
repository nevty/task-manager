import React from "react";
import {Link} from "react-router-dom";
import {Card} from "styles/styled/Components";
import {DeleteFilled, EditFilled, MoreOutlined} from "@ant-design/icons";
import {Typography, Modal} from "antd";
import ActionList from "../utils/ActionList";

const {confirm} = Modal;

const DeskCard = ({title, id, deleteDesk}) => {
    const showDeleteConfirm = () => confirm({
        title: 'Are you sure delete this desk?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            deleteDesk(id)
        },
        onCancel() {
        },
    });
    return (
        <Card>
            <ActionList
                className="actions"
                toggleIcon={<MoreOutlined style={{fontSize: "16px", cursor: "pointer"}}/>}
                actions={[
                    <DeleteFilled onClick={showDeleteConfirm} style={{fontSize: "16px", color: "#ff4d4f"}}/>,
                    <EditFilled style={{fontSize: "16px"}}/>,
                ]}/>
            <Link to={`desk/${id}`} strong component={Typography.Link}>{title}</Link>
        </Card>
    )
}

export default DeskCard