import React,{useEffect,useContext} from 'react'
import {Card,Col,Button,Container,Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {ShoppingCartOutlined,HeartOutlined} from '@ant-design/icons';
import {userContext} from '../App'
import { BackTop } from 'antd';
import {HOST,PORT} from '../../config'
import {
    ShopOutlined
} from '@ant-design/icons';
const RowCard = (props)=>{
    const {auth} = useContext(userContext)
    const {secondhand} = props
    return(
    <div>
        <Card style={{width:"10rem"}}>
        <Link to={`/secondhands/${secondhand._id}`}>
            <Card.Img variant="top" src={`/upload/${secondhand.pictures[0]}`} style={{height:"140px"}} />
        </Link>
        <Card.Title className="pl-2">
            <span style={{fontSize:"11px"}}>{secondhand.title.length >= 11 ? secondhand.title[0]+secondhand.title[1]+secondhand.title[2]+secondhand.title[3]+secondhand.title[4]+secondhand.title[5]+secondhand.title[6]+secondhand.title[7]+secondhand.title[8]+secondhand.title[9]+secondhand.title[10]+"..." : secondhand.title}</span>
        </Card.Title>
        <Card.Text>
            <div>
                {/* <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail rounded-circle "
                    src={secondhand.author.avatar ? `/upload/${secondhand.author.avatar}` : '/img/avatar.jpg'}
                />{secondhand.author.username} */}
                <span style={{color:"orangered",fontSize:"8px",paddingLeft:"6px"}}>￥</span><span style={{color:"orangered",fontSize:"14px"}}>{secondhand.price}元</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{fontSize:"12px" ,color:"gray"}}>{secondhand.number}成新</span>
                <span className="d-flex justify-content-end text-muted">{secondhand.author.stores.length ? <Link to={`/profilestoreinfoclick/${secondhand.author.stores[0]}`}><ShopOutlined style={{fontSize:"20px",color:"#0A8ADB",paddingRight:"3px"}}/></Link>: <Link><ShopOutlined style={{fontSize:"20px",color:"white",paddingRight:"3px"}}/></Link> }</span>
                {/* <p>发布于:{new Date(secondhand.posttime).toLocaleString()}</p> */}
            </div>
        </Card.Text>
        </Card>
    </div>
    )
    // {auth
    //     ?(<p className="d-flex justify-content-end pr-3">
    //         {/* <HeartOutlined style={{ fontSize: '23px'}} onClick={()=>alert("功能还未开启！ごめんなさい！")}/> */}
    //         <ShoppingCartOutlined style={{ fontSize: '28px'}}  onClick={()=>alert("功能还未开启！ごめんなさい！")}/>
    //     </p>)
    //     :null
    //     }
}

const SecondhandCard = (props)=>{
    const {loadSecondhands,secondhands} = props
    useEffect(()=>{
        loadSecondhands()
    },[])

    const rows = secondhands.map((secondhand,idx)=>(
        <Col xs={12} sm={6} md={2} key={idx}>
            <Card.Body>
                <RowCard secondhand={secondhand}/>
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

export default SecondhandCard
