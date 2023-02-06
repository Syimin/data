import React,{useState,useEffect,useContext} from 'react'
import {Card,Col,Button,Container,Row} from 'react-bootstrap'
import { Switch,Route,Link } from 'react-router-dom';
import SettingStorePage from './SettingStorePage'
import {HOST,PORT} from '../../config'

import {userContext} from '../App'

const ProfileStoreInfo = (props)=>{
    const {store} = props
    return(
        <div style={{textAlign:"center",backgroundPosition:"relative"}}>
                <p>
                    <img 
                    height={210}
                    src={"/img/white.png"} 
                    style={{backgroundPosition:"absolute"}}/>
                </p>
                <p style={{fontSize:"40px",backgroundPosition:"relative",marginTop: "-200px"}}>{store.storename}</p>
                <img
                width={96}
                height={96}
                className="img-thumbnail round"
                style={{borderRadius:"100%",backgroundPosition:"relative",marginTop: "-10px"}}
                src = {store.avatar ? `/upload/${store.avatar}` : "/img/avatar.jpg"}
                />
        <p style={{fontSize:"12px",color:"gray"}}>{store.description ? store.description : "暂无简介"}</p>
        </div>
    )
}

const StorecommodityInfo = (props)=>{
    const {storecommodities} = props
    const lines = storecommodities.map((storecommodity,idx)=>{
        return(
            <div>
                <Col xs={12} sm={6} md={2} key={idx}>
                    <Card.Body  style={{paddingRight:"1px",paddingLeft:"1px"}}>
                        <Card style={{width:"12rem"}} key={idx}>
                        <Link to={`/storecommodities/${storecommodity._id}`}>
                            <Card.Img variant="top" src={`/upload/${storecommodity.pictures[0]}`} style={{height:"180px"}} />
                        </Link>
                        <Card.Title className="pl-2">
                            <span style={{fontSize:"13px"}}>{storecommodity.title}</span>
                        </Card.Title>
                        <Card.Text>
                            <div>
                                <span style={{color:"red", fontSize:"14px"}}>￥{storecommodity.price}元</span> 
                                {/* <p>发布于:{new Date(storecommodity.posttime).toLocaleString()}</p> */}
                            </div>
                        </Card.Text>  
                        </Card>
                    </Card.Body>
                </Col> 
            </div>
        )
    })
    return(
        <Row style={{alignContent:"stretch",alignItems:"stretch"}}>
            {lines}
        </Row>
    )
}

const StoreInfo = (props)=>{
    const {user} = useContext(userContext)
    const {sid} = props
    const [store,setStore] = useState({})
    const [storecommodities,setStorecommodities] = useState([])
    const getStore = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/stores/${sid}`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setStore(result.data)
                setStorecommodities(result.data.storecommodities)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(()=>{
        getStore()
    },[])

    return(   
        <div>
            <ProfileStoreInfo store={store}/>
            <Link to={`/settingstore/${store._id}`}>
                <div style={{textAlign:"center"}}>
                    <Button variant="secondary" size="sm" onClick={()=><SettingStorePage/>}>编辑</Button>
                </div>
            </Link>
            <br/>
            <StorecommodityInfo storecommodities={storecommodities}/>
        </div>

    )
}

export default StoreInfo