import { Layout, Menu } from 'antd';
import {Link} from 'react-router-dom'
import DiscussListPage from './DiscussListPage'
import HelpdiscussListPage from '../HelpDisPage/HelpdiscussListPage'
import LikediscussListPage from '../LikeDisPage/LikediscussListPage'
import UnlikediscussListPage from '../UnlikeDisPage/UnlikediscussListPage'
import React from 'react'
import {
  CoffeeOutlined,
  SoundOutlined,
  LikeOutlined,
  DislikeOutlined
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const Headerleft2 = ()=>{
    return(
        <Layout theme="light">
            <Content style={{ padding: '0 50px' }}>
            <Layout style={{ padding: '24px 0' }} theme="light">
                <Sider  width={200}>
                <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                >
                <Menu.Item key="1" icon={<CoffeeOutlined />}>
                <Link to="/discusses/">
                    闲谈区
                </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<SoundOutlined />}>
                <Link to="/helpdiscusses/">
                    求助区
                    </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<LikeOutlined />}>
                <Link to="/likediscusses/">
                    种草区
                    </Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<DislikeOutlined />}>
                <Link to="/unlikediscusses/">
                    踩雷区
                    </Link>
                </Menu.Item>
                </Menu>
                </Sider>
                <Content >
                <div>
                    <DiscussListPage/>
                    <HelpdiscussListPage/>
                    <LikediscussListPage/>
                    <UnlikediscussListPage/>
                </div>
                </Content>
            </Layout>
            </Content>
        </Layout>
    )
}
  
export default Headerleft2