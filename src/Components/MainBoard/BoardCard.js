import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Card} from "styles/styled/Components";
import {DeleteFilled, EditFilled, MoreOutlined} from "@ant-design/icons";
import {Typography, Modal, Input} from "antd";
import ActionList from "../utils/ActionList";

const {confirm} = Modal;

const BoardCard = ({title, id, deleteBoard, changeBoardTitle}) => {
    const showDeleteConfirm = () => confirm({
        title: 'Are you sure delete this board?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            deleteBoard(id)
        },
        onCancel() {
        },
    });
    const [edit, setEdit] = useState(false);
    const toggleEdit = () => setEdit(!edit);
    const handleSubmit = (e) => {
        const value = e.target.value.trim();
        if (value) {
            changeBoardTitle(id, value)
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
                    <Link to={`board/${id}`} strong component={Typography.Link}>{title}</Link>
            }
        </Card>
    )
}

export default BoardCard