import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Card} from "styles/styled/Components";
import {DeleteFilled, EditFilled, MoreOutlined} from "@ant-design/icons";
import {Typography, Modal, Input} from "antd";
import ActionList from "../utils/ActionList";

const {confirm} = Modal;

const DeskCard = ({title, id, deleteDesk, changeDeskTitle}) => {
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
    const [edit, setEdit] = useState(false);
    const toggleEdit = () => setEdit(!edit);
    const handleSubmit = (e) => {
        const value = e.target.value.trim();
        if (value) {
            changeDeskTitle(id, value)
        }
        setEdit(false);
    }
    return (
        <Card>
            <ActionList
                className="actions"
                toggleIcon={<MoreOutlined style={{fontSize: "16px", cursor: "pointer"}}/>}
                actions={[
                    <DeleteFilled onClick={showDeleteConfirm} style={{fontSize: "16px", color: "#ff4d4f"}}/>,
                    <EditFilled onClick={toggleEdit} style={{fontSize: "16px"}}/>,
                ]}/>

            {
                edit ?
                    <Input defaultValue={title} onPressEnter={handleSubmit}/>
                    :
                    <Link to={`desk/${id}`} strong component={Typography.Link}>{title}</Link>
            }
        </Card>
    )
}

export default DeskCard