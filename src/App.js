import React, {useState} from 'react';
import {Link, Route} from "react-router-dom";
import MainBoard from "./Component/MainBoard/MainBoard";
import DeskBoard from "./Component/DeskBoard/DeskBoard";
import {Grid, Layout, Menu} from "antd";
import {LayoutOutlined, UserOutlined} from "@ant-design/icons"
import LoginPage from "./pages/LoginPage";
import './App.css';

const {Sider,Content} = Layout;
const {useBreakpoint} = Grid;

function App({ history }) {
    const screens = useBreakpoint();
    const [collapse,toggleCollapse] = useState(true);
    const handleCollapse = collapsed=>toggleCollapse(collapsed);
    return (
        <Layout className="App">
            <Layout>
                <Content style={screens.sm ? null : {minWidth: "320px"}} className="Content">
                    <Route path="/" exact component={MainBoard}/>
                    <Route path="/desk/:id" component={DeskBoard}/>
                    <Route path="/login" exact component={LoginPage}/>
                </Content>
            </Layout>
            <Sider collapsedWidth={screens.sm ? "80" : "0"} reverseArrow collapsible collapsed={collapse} onCollapse={handleCollapse} className="Sider" >
                <Menu theme="dark" className="Menu" mode="inline">
                    <Menu.Item icon={<UserOutlined/>}>
                        <Link to="/login">Profile</Link>
                    </Menu.Item>
                    <Menu.Item icon={<LayoutOutlined/>}>
                        <Link to="/">Boards</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        </Layout>
    );
}

export default App;
