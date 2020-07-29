import {Button, Form, Input, Typography} from "antd";
import React from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {auth} from "../../index";

const Login = ()=>{
    const [form] = Form.useForm();
    const handleSubmit = ({user_mail,user_password}) => {
        auth.signInWithEmailAndPassword(user_mail, user_password).then(r =>{
            console.log(r)
        })
        form.resetFields()
    }
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
        </Form>
    )
}

export default Login