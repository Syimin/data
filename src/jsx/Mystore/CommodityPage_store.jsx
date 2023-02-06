import React,{useState,useEffect,useContext} from 'react'
import {Container,Row,ButtonGroup,Col} from 'react-bootstrap'
import { BackTop } from 'antd';
import Carousels_store from './Carousels_store'
import Commodity_store from './Commodity_store'
import PostButton_store from './PostButton_store'
import ModifyCButton_store from './ModifyCButton_store'
import DeleteCommodityButton_store from './DeleteCommodityButton_store'
import {HOST,PORT} from '../../config'
import {userContext} from '../App'

const CommodityPage_store = (props)=>{
    const {user,auth,store} = useContext(userContext)
    const {cid} = props.match.params//从浏览器地址栏匹配到cid
    const [commodity,setCommodity] = useState({})
    const [comments,setComments] = useState([])
    const loadCommodity = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/storecommodities/${cid}`)
            const result = await res.json()
            if(res.ok){
                setCommodity(result.data.commodity)
                setComments(result.data.comments)
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return(
        <Container>
            <Row>
                <Col sm={12} md={5}>
                    <Carousels_store cid={cid} loadCommodity={loadCommodity} commodity={commodity}/>
                </Col>
                <Col sm={12} md={7}>
                    <>
                        {commodity.author && store.storename === commodity.author.storename
                        ? 
                        (
                        <Row className="m-0">
                            <ButtonGroup className="ml-auto">
                                <ModifyCButton_store cid={cid} loadCommodity={loadCommodity}/>
                                <DeleteCommodityButton_store cid={cid}/>
                            </ButtonGroup>
                        </Row>
                        )
                        : null
                        }

                    <Commodity_store cid={cid} loadCommodity={loadCommodity} commodity={commodity} comments={comments}/>
                    {auth
                    ? <PostButton_store cid={cid} loadCommodity={loadCommodity}/>
                    : null
                    }
                    </>
                </Col>
            </Row>
            <BackTop/>
        </Container>

    )

}
export default CommodityPage_store