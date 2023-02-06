import React,{useEffect,useState,useContext} from 'react'
import {Card,Col,Button,Container,Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {ShoppingCartOutlined,HeartOutlined} from '@ant-design/icons';
import {userContext} from '../App'
import {HOST,PORT} from '../../config'
import { BackTop } from 'antd';
import {
    ShopOutlined
} from '@ant-design/icons';
const RowCard = (props)=>{
    const {auth} = useContext(userContext)
    const {groupbuy} = props
    const [num,setNum] = useState(0)
    return(
    <div>
        <Card style={{width:"10rem"}}>
        <Link to={`/groupbuys/${groupbuy._id}`}>
            <Card.Img variant="top" src={`/upload/${groupbuy.pictures[0]}`} style={{height:"140px"}} />
        </Link>
        <Card.Title className="pl-2">
            <span style={{fontSize:"11px"}}>{groupbuy.title.length >= 11 ? groupbuy.title[0]+groupbuy.title[1]+groupbuy.title[2]+groupbuy.title[3]+groupbuy.title[4]+groupbuy.title[5]+groupbuy.title[6]+groupbuy.title[7]+groupbuy.title[8]+groupbuy.title[9]+groupbuy.title[10]+"..." : groupbuy.title}</span>
        </Card.Title>
        <Card.Text>
            <div>
                {/* <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail rounded-circle "
                    src={groupbuy.author.avatar ? `/upload/${groupbuy.author.avatar}` : '/img/avatar.jpg'}
                />{groupbuy.author.username} */}
                <span style={{color:"gray",textDecoration:"line-through",fontSize:"8px",paddingLeft:"8px"}}>￥</span><span style={{color:"gray",textDecoration:"line-through",fontSize:"10px"}}>{groupbuy.motoprice}元</span>
                <span style={{color:"orangered",fontSize:"8px",paddingLeft:"8px"}}>￥</span><span style={{color:"orangered",fontSize:"14px"}}>{groupbuy.price}元</span>
                <span className="d-flex justify-content-end text-muted">{groupbuy.author.stores.length ? <Link to={`/profilestoreinfoclick/${groupbuy.author.stores[0]}`}><ShopOutlined style={{fontSize:"18px",color:"#0A8ADB",paddingRight:"3px"}}/></Link>: <Link><ShopOutlined style={{fontSize:"18px",color:"white",paddingRight:"3px"}}/></Link> }</span>
                {/* <span style={{fontSize:"14px"}}>已上车:{num} / 预计开团数量:{groupbuy.number}</span> */}
                {/* <p>发布于:{new Date(groupbuy.posttime).toLocaleString()}</p> */}
            </div>
        </Card.Text>
        </Card>
    </div>
    )
}

const GroupbuyCard = (props)=>{
    const {loadGroupbuys,groupbuys} = props
    useEffect(()=>{
        loadGroupbuys()
    },[])

    const rows = groupbuys.map((groupbuy,idx)=>(
        <Col xs={12} sm={6} md={2} key={idx}>
            <Card.Body>
                <RowCard groupbuy={groupbuy}/>
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

export default GroupbuyCard
