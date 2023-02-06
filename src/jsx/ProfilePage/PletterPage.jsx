import React,{useState,useContext} from 'react'
import {Container,Row,ButtonGroup,Col} from 'react-bootstrap'
import { BackTop } from 'antd';
import Pletter from './Pletter'
import Pcomment from './Pcomment'
import DeletePletterButton from './DeletePletterButton'
import {HOST,PORT} from '../../config'
import {userContext} from '../App'

const PletterPage = (props)=>{
    const {user,auth} = useContext(userContext)
    const {pid} = props.match.params//从浏览器地址栏匹配到pid
    const [pletter,setPletter] = useState({})
    const [pcomments,setPcomments] = useState([])
    const loadPletter = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/pletters/${pid}`)
            const result = await res.json()
            if(res.ok){
                setPletter(result.data.pletter)
                setPcomments(result.data.pcomments)
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return(
        <Container>
                <div>
                    {pletter.author === user._id
                    ? (
                    <Row className="m-0">
                        <ButtonGroup className="ml-auto">
                            <DeletePletterButton pid={pid}/>
                        </ButtonGroup>
                    </Row>)
                    : null
                    }
                
                    <Pletter pid={pid} loadPletter={loadPletter} pcomments={pcomments} pletter={pletter}/>
                    {auth
                    ? <Pcomment pid={pid} loadPletter={loadPletter}/>
                    : null
                    }
                 </div>
                 <BackTop/>
        </Container>
    )
}

export default PletterPage