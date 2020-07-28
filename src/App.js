import React, {useState} from 'react';
import {Route} from "react-router-dom";
import './App.css';
import MainBoard from "./Component/MainBoard/MainBoard";
import DeskBoard from "./Component/DeskBoard/DeskBoard";
import {Layout, Menu} from "antd";
import {UserOutlined} from "@ant-design/icons"
const {Sider,Content,Header,Footer} = Layout;

function App({ history }) {
    const [collapse,toggleCollapse] = useState(false);
    const handleCollapse = collapsed=>toggleCollapse(collapsed);
    return (
        <Layout className="App">
            <Layout>
                <Content className="Content">
                    <Route path="/" exact component={MainBoard}/>
                    <Route path="/desk/:id" component={DeskBoard}/>
                </Content>
            </Layout>
            <Sider collapsible collapsed={collapse} onCollapse={handleCollapse} className="Sider">
                <Menu theme="dark" className="Menu" mode="inline">
                    <Menu.Item icon={<UserOutlined/>}>
                        Profile
                    </Menu.Item>
                </Menu>
            </Sider>
        </Layout>
    );
}

export default App;
