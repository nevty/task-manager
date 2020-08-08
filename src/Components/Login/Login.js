import React from "react";
import {Button, Divider, Form, Input, Space, Typography} from "antd";
import {GoogleOutlined, LockOutlined, MailOutlined} from "@ant-design/icons";
import authAPI from "api/auth";

const Login = ({ redirect }) => {
    const [form] = Form.useForm();
    const handleSubmit = async ({ user_mail, user_password }) => {
        try {
            await authAPI.login(user_mail, user_password);
            redirect('/')
        } catch (e) {
        }
        form.resetFields()
    };
    const signPopup = (method) => {
        authAPI.loginWithPopUp(method)
            .then(({ result }) => {
                if (result) redirect('/');
            });
        form.resetFields();
    };
    return (
        <Form
            form={form}
            onFinish={handleSubmit}
        >
            <Typography.Title level={3}>
                Login
            </Typography.Title>
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
                Login
            </Button>
            <Divider>or with</Divider>
            <Space>
                <Button onClick={() => signPopup('google')} shape="circle" icon={<GoogleOutlined/>}/>
            </Space>
        </Form>
    )
}

export default Login