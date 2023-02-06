import React,{useContext} from 'react'
import {userContext} from '../App'
import { Layout, Menu } from 'antd';
import {Link} from 'react-router-dom'
import CommodityListPage from './CommodityListPage'
import SecondhandListPage from '../SecondhandPage/SecondhandListPage'
import GroupbuyListPage from '../GroupbuyPage/GroupbuyListPage'
import StoreListPage from '../StoreListPage/StoreListPage'
import CommodityListPage_store from '../Mystore/CommodityListPage_store'
import {
  AppstoreOutlined,
  UserSwitchOutlined,
  TeamOutlined,
  ShopOutlined,
  SmileOutlined
} from '@ant-design/icons';

const {Content, Sider } = Layout;

const Headerleft = ()=>{
    const {auth2,store} = useContext(userContext)
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
                <Menu.Item key="1" icon={<AppstoreOutlined />}>
              <Link to="/commodities/">
                商品区
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserSwitchOutlined />}>
              <Link to="/secondhands/">
                二手区
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />}>
              <Link to="/groupbuys/">
                团购区
              </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<ShopOutlined />}>
              <Link to="/stores/">
                商铺区
              </Link>
            </Menu.Item>
            {auth2?
            <Menu.Item key="5" icon={<SmileOutlined />}>
              <Link to="/storecommodities/">
                商铺商品区
              </Link>
            </Menu.Item>
            :null}
                </Menu>
                </Sider>
                <Content >
                <div>
                    <CommodityListPage/>
                    <SecondhandListPage/>
                    <GroupbuyListPage/>
                    <StoreListPage/>
                    <CommodityListPage_store/>
                </div>
                </Content>
            </Layout>
            </Content>
        </Layout>
    )
}
  
export default Headerleft