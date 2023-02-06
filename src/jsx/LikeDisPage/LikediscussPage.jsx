import React,{useState,useEffect,useContext} from 'react'
import {Container,Row,ButtonGroup,Col} from 'react-bootstrap'
import { BackTop } from 'antd';
import Likediscuss from './Likediscuss'
import CarouselsL from './CarouselsL'
import ReplyForm from './ReplyForm'
import ModifyButton from './ModifyButton'
import DeleteLikediscussButton from './DeleteLikediscussButton'
import {HOST,PORT} from '../../config'
import {userContext} from '../App'

const LikediscussPage = (props)=>{
    const {user,auth} = useContext(userContext)
    const {lid} = props.match.params//从浏览器地址栏匹配到did
    const [likediscuss,setLikediscuss] = useState({})
    const [likecomments,setLikecomments] = useState([])
    const loadLikediscuss = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/likediscusses/${lid}`)
            const result = await res.json()
            if(res.ok){
                setLikediscuss(result.data.likediscuss)
                setLikecomments(result.data.likecomments)
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
                        <CarouselsL lid={lid} loadLikediscuss={loadLikediscuss} likediscuss={likediscuss}/>
                    </Col>
                    <Col sm={12} md={7}>
                    {likediscuss.author && user.username === likediscuss.author.username
                        ? (
                        <Row className="m-0">
                            <ButtonGroup className="ml-auto">
                                <ModifyButton lid={lid} loadLikediscuss={loadLikediscuss}/>
                                <DeleteLikediscussButton lid={lid}/>
                            </ButtonGroup>
                        </Row>)
                        : null
                        }
                    
                    <Likediscuss lid={lid} loadLikediscuss={loadLikediscuss} likecomments={likecomments} likediscuss={likediscuss}/>
                    {auth
                    ? <ReplyForm lid={lid} loadLikediscuss={loadLikediscuss}/>
                    : null
                    }
                    </Col>
                 </Row>
                 <BackTop/>
        </Container>
    )
}

export default LikediscussPage