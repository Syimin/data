import React,{useState,useContext} from 'react'
import {Switch,Route,Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {PlusCircleFilled} from '@ant-design/icons'
import { BackTop } from 'antd';
// import PostLikediscussesButton from './PostLikediscussesButton'
import LikediscussList from './LikediscussList'
import LikediscussPage from './LikediscussPage'
import {HOST,PORT} from '../../config'

import {userContext} from '../App'

const LikediscussListTable = ()=>{
    const [likediscusses,setLikediscusses] = useState([])
    const {auth} = useContext(userContext)
    const loadLikediscusses = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/likediscusses`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setLikediscusses(result.data)
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }
    return(
        <Container>
            {auth
            ?
            (
                <div>
                    <p style={{fontSize:"25px",textAlign:"center",color:"gray"}}>种草区</p>
                    <Link to="/postlikediscuss">
                        <PlusCircleFilled style={{fontSize:"35px",paddingBottom:"30px",color:"orange"}}/>
                    </Link>
                    
                </div>
            )
            : null
            }
            <LikediscussList loadLikediscusses={loadLikediscusses} likediscusses={likediscusses}/>
            <BackTop/>
        </Container>
    )
}


const LikediscussListPage = ()=>{
    return(
        <Switch>
            <Route exact path="/likediscusses" component={LikediscussListTable}/>
            <Route exact path="/likediscusses/:lid" component={LikediscussPage}/>
        </Switch>
    )
   
}

export default LikediscussListPage