import React,{useState,useContext} from 'react'
import {Switch,Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import GroupbuyCard from '../GroupbuyPage/GroupbuyCard'
import GroupbuyPage from '../GroupbuyPage/GroupbuyPage'
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
            <GroupbuyCard loadGroupbuys={loadGroupbuys} groupbuys={groupbuys}/>
        </Container>
    )
}

const GroupbuyListPage2 = ()=>{
    return(
        <Switch>
            <Route exact path="/" component={GroupbuyListTable}/>
            <Route exact path="/home" component={GroupbuyListTable}/>
            <Route exact path="/groupbuys/:gid" component={GroupbuyPage}/>
        </Switch>
    )
}

export default GroupbuyListPage2