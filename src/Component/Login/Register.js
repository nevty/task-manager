import {Button, Form, Input, Typography} from "antd";
import React from "react";
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import authAPI from "../../api/auth";

const Register = ({redirect})=>{
    const [form] = Form.useForm();
    const handleSubmit = async ({user_name,user_mail,user_password}) => {
        try {
            await authAPI.register(user_name,user_mail,user_password);
            redirect('/')
        } catch (e) {}
        form.resetFields()
    }
    return (
        <Form
            form={form}
            onFinish={handleSubmit}
        >
            <Typography.Title level={3}>
                Register
            </Typography.Title>
            <Form.Item
                name="user_name"
                rules={[
                    {
                        required: true,
                        message: "This field required"
                    },
                ]}
            >
                <Input prefix={<UserOutlined/>}
                       placeholder="Name"
                />
            </Form.Item>
            <Form.Item
                name="user_mail"
                rules={[
                    {
                        required: true,
                        message: "This field required"
                    },
                ]}
            >
                <Input type="email" prefix={<MailOutlined/>}
                       placeholder="Email"
                />
            </Form.Item>
            <Form.Item
                name="user_password"
                rules={[
                    {
                        required: true,
                        message: "This field required"
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined/>}
                    placeholder="Password"
                />
            </Form.Item>
            <Button block type="primary" htmlType="submit">
                Register
            </Button>
        </Form>
    )
}

export default Register