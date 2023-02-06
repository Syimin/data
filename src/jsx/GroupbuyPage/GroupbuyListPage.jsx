import React,{useState,useContext} from 'react'
import {Switch,Route,Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {PlusCircleFilled} from '@ant-design/icons'
import GroupbuyCard from './GroupbuyCard'
import GroupbuyPage from './GroupbuyPage'
import {HOST,PORT} from '../../config'
import {userContext} from '../App'

const GroupbuyListTable = ()=>{
    const [groupbuys,setGroupbuys] = useState([])
    const {auth} = useContext(userContext)
    const loadGroupbuys = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/groupbuys`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setGroupbuys(result.data)
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
                <p style={{fontSize:"25px",textAlign:"center",color:"gray"}}>团购区</p>
                <Link to="/postgroupbuy">
                    <PlusCircleFilled style={{fontSize:"35px",color:"#0A8ADB"}}/>
                </Link>
            </div>
            )
            :null
            }
            <GroupbuyCard loadGroupbuys={loadGroupbuys} groupbuys={groupbuys}/>
        </Container>
    )
}

const GroupbuyListPage = ()=>{
    return(
        <Switch>
            <Route exact path="/groupbuys" component={GroupbuyListTable}/>
            <Route exact path="/groupbuys/:gid" component={GroupbuyPage}/>
        </Switch>
    )
}

export default GroupbuyListPage