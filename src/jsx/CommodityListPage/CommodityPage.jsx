import React,{useState,useEffect,useContext} from 'react'
import {Container,Row,ButtonGroup,Col} from 'react-bootstrap'
import { BackTop } from 'antd';
import Carousels from './Carousels'
import Commodity from './Commodity'
import PostButton from './PostButton'
import ModifyCButton from './ModifyCButton'
import DeleteCommodityButton from './DeleteCommodityButton'
import {HOST,PORT} from '../../config'
import {userContext} from '../App'


const CommodityPage = (props)=>{
    const {user,auth} = useContext(userContext)
    const {cid} = props.match.params//从浏览器地址栏匹配到cid
    const [commodity,setCommodity] = useState({})
    const [comments,setComments] = useState([])
    const loadCommodity = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/commodities/${cid}`)
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
                    <Carousels cid={cid} loadCommodity={loadCommodity} commodity={commodity}/>
                </Col>
                <Col sm={12} md={7}>
                    <>
                        {commodity.author && user.username === commodity.author.username
                        ? 
                        (
                        <Row className="m-0">
                            <ButtonGroup className="ml-auto">
                                <ModifyCButton cid={cid} loadCommodity={loadCommodity}/>
                                <DeleteCommodityButton cid={cid}/>
                            </ButtonGroup>
                        </Row>
                        )
                        : null
                        }

                    <Commodity cid={cid} loadCommodity={loadCommodity} commodity={commodity} comments={comments}/>
                    {auth
                    ? <PostButton cid={cid} loadCommodity={loadCommodity}/>
                    : null
                    }
                    </>
                </Col>
            </Row>
            <BackTop/>
        </Container>

    )

}
export default CommodityPage