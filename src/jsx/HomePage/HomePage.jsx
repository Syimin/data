import React from 'react'
import {Container,Row,Col} from "react-bootstrap"
import {Link} from 'react-router-dom'
import {Demo,Slogan} from './Introduction'
import { BackTop } from 'antd';
import CommodityListPage2 from './CommodityListPage2'
import SecondhandListPage2 from './SecondhandListPage2'
import GroupbuyListPage2 from './GroupbuyListPage2'

const HomePage = ()=>{
    return(
        <>
        <div>
        <Container fluid>
            <Row>
                <Col sm={12} md={12} className="pl-0 pr-0">
                    <Demo/>
                </Col>
            </Row>
        </Container>
        </div>
        {/* <div className="pt-3">
            <h3 style={{textAlign:"center"}}>商品区</h3>
            <Link to="/commodities/">
                更多
            </Link>
            <CommodityListPage2/>
            
        </div>
        <div>
            <h3 style={{textAlign:"center"}}>二手区</h3>
            <Link to="/secondhands/">
                更多
            </Link>
            <SecondhandListPage2/>
        </div>
        <div>
            <h3 style={{textAlign:"center"}}>团购区</h3>
            <Link to="/groupbuys/">
                更多
            </Link>
            <GroupbuyListPage2/>
        </div> */}
        <BackTop/>
        </>
    )
}

export default HomePage