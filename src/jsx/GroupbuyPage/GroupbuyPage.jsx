import React,{useState,useEffect,useContext} from 'react'
import {Container,Row,ButtonGroup,Col} from 'react-bootstrap'
import { BackTop } from 'antd';
import Carousels3 from './Carousels3'
import Groupbuy from './Groupbuy'
import PostGButton from './PostGButton'
import ModifyGButton from './ModifyGButton'
import DeleteGButton from './DeleteGButton'
import {HOST,PORT} from '../../config'
import {userContext} from '../App'


const GroupbuyPage = (props)=>{
    const {user,auth} = useContext(userContext)
    const {gid} = props.match.params//从浏览器地址栏匹配到cid
    const [groupbuy,setGroupbuy] = useState({})
    const [comments,setComments] = useState([])
    const loadGroupbuy = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/groupbuys/${gid}`)
            const result = await res.json()
            if(res.ok){
                setGroupbuy(result.data.groupbuy)
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
                    <Carousels3 gid={gid} loadGroupbuy={loadGroupbuy} groupbuy={groupbuy}/>
                </Col>
                <Col sm={12} md={7}>
                    <>
                        {groupbuy.author && user.username === groupbuy.author.username
                        ? (
                        <Row className="m-0">
                            <ButtonGroup className="ml-auto">
                                <ModifyGButton gid={gid} loadGroupbuy={loadGroupbuy}/>
                                <DeleteGButton gid={gid}/>
                            </ButtonGroup>
                        </Row>)
                        : null
                        }
            
                        <Groupbuy gid={gid} loadGroupbuy={loadGroupbuy} groupbuy={groupbuy} comments={comments}/>
                        {auth
                        ? <PostGButton gid={gid} loadGroupbuy={loadGroupbuy}/>
                        : null
                        }
                    </>
                </Col>
            </Row>
            <BackTop/>
        </Container>
    )

}
export default GroupbuyPage