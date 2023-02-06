import React from 'react'
import {Container} from 'react-bootstrap'
import {Route, Switch, Link, withRouter } from 'react-router-dom';
import {Tabs} from 'antd';
const { TabPane } = Tabs;
import FromsbPletter from './FromsbPletter'
import TosbPletter from './TosbPletter'
import PletterPage from './PletterPage';

const ProfilePletter2 = (props)=>{
    const {uid} = props.match.params
    return(
        <Container>
            <Tabs defaultActiveKey="1" centered tabPosition="left">
                <TabPane tab={<span>私信我的</span>} key="1" >
                    <FromsbPletter uid={uid}/>
                </TabPane>
                <TabPane tab={<span>我私信的</span>} key="2" >
                    <TosbPletter uid={uid}/>
                </TabPane>
            </Tabs>
        </Container>
    )  
}

const ProfilePletter = ()=>{
    return(
        <Switch>
            <Route exact path="/profilepletter/:uid" component={ProfilePletter2}/>
            <Route exact path="/pletter/:pid" component={PletterPage}/>
        </Switch>
    )
   
}

export default ProfilePletter