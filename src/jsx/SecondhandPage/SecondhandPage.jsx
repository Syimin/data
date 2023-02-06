import React,{useState,useEffect,useContext} from 'react'
import {Container,Row,ButtonGroup,Col} from 'react-bootstrap'
import { BackTop } from 'antd';
import Carousels2 from './Carousels2'
import Secondhand from './Secondhand'
import PostSButton from './PostSButton'
import ModifySButton from './ModifySButton'
import DeleteSButton from './DeleteSButton'
import {HOST,PORT} from '../../config'
import {userContext} from '../App'


const SecondhandPage = (props)=>{
    const {user,auth} = useContext(userContext)
    const {sid} = props.match.params//从浏览器地址栏匹配到cid
    const [secondhand,setSecondhand] = useState({})
    const [comments,setComments] = useState([])
    const loadSecondhand = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/secondhands/${sid}`)
            const result = await res.json()
            if(res.ok){
                setSecondhand(result.data.secondhand)
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
                    <Carousels2 sid={sid} loadSecondhand={loadSecondhand} secondhand={secondhand}/>
                </Col>
                <Col sm={12} md={7}>
                    <>
                        {secondhand.author && user.username === secondhand.author.username
                        ? (
                        <Row className="m-0">
                            <ButtonGroup className="ml-auto">
                                <ModifySButton sid={sid} loadSecondhand={loadSecondhand}/>
                                <DeleteSButton sid={sid}/>
                            </ButtonGroup>
                        </Row>)
                        : null
                        }
                        
                        <Secondhand sid={sid} loadSecondhand={loadSecondhand} secondhand={secondhand} comments={comments}/>
                        {auth
                        ? <PostSButton sid={sid} loadSecondhand={loadSecondhand}/>
                        : null
                        }
                    </>
                </Col>
            </Row>
            <BackTop/>
        </Container>
    )

}
export default SecondhandPage