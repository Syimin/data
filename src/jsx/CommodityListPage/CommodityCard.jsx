import React,{useEffect,useContext} from 'react'
import {Card,Col,Button,Container,Row} from 'react-bootstrap'
import {message} from 'antd'
import {Link} from 'react-router-dom'
import {userContext} from '../App'
import { BackTop } from 'antd';
import {
    ShopOutlined
} from '@ant-design/icons';
import {HOST,PORT,DOMAIN} from '../../config'

const RowCard = (props)=>{
    const {auth,user,setUser} = useContext(userContext)
    const {commodity} = props
    return(
    <div>
        <Card style={{width:"10rem"}}>
        <Link to={`/commodities/${commodity._id}`}>
            <Card.Img variant="top" src={`/upload/${commodity.pictures[0]}`} style={{height:"140px"}} />
        </Link>
        <Card.Title className="pl-2">
            <span style={{fontSize:"11px"}}>{commodity.title.length >= 11 ? commodity.title[0]+commodity.title[1]+commodity.title[2]+commodity.title[3]+commodity.title[4]+commodity.title[5]+commodity.title[6]+commodity.title[7]+commodity.title[8]+commodity.title[9]+commodity.title[10]+"..." : commodity.title}</span>
        </Card.Title>
        <Card.Text>
            <div>
                {/* <img
                    width={32}
                    height={32}
                    className="mr-3 rounded-circle "
                    src={commodity.author.avatar ? `/upload/${commodity.author.avatar}` : '/img/avatar.jpg'}
                /><span style={{fontSize:"14px"}}>{commodity.author.username}</span> */}
                    <span style={{color:"orangered",fontSize:"8px",paddingLeft:"7px"}}>￥</span><span style={{color:"orangered",fontSize:"14px"}}>{commodity.price}元</span>
                    <span className="d-flex justify-content-end text-muted">{commodity.author.stores.length ? <Link to={`/profilestoreinfoclick/${commodity.author.stores[0]}`}><ShopOutlined style={{fontSize:"20px",color:"#0A8ADB",paddingRight:"3px"}}/></Link>: <Link><ShopOutlined style={{fontSize:"20px",color:"white",paddingRight:"3px"}}/></Link> }</span>
                {/* <p>发布于:{new Date(commodity.posttime).toLocaleString()}</p> */}
            </div>
        </Card.Text>
        
        </Card>
    </div>
    )
}


const CommodityCard = (props)=>{
    const {loadCommodities,commodities} = props
    useEffect(()=>{
        loadCommodities()
    },[])

    const rows = commodities.map((commodity,idx)=>(
        <Col xs={12} sm={6} md={2} key={idx}>
            <Card.Body>
                <RowCard commodity={commodity}/>
            </Card.Body>
        </Col>       
    ));
    
    return(
        <>
        <Container>
            <Row style={{alignContent:"stretch",alignItems:"stretch"}}>
                {rows}
            </Row>
        </Container>
        <BackTop/>
        </>
    )
}

export default CommodityCard
