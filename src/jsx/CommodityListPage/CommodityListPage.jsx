import React,{useState,useContext} from 'react'
import {Switch,Route,Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {PlusCircleFilled} from '@ant-design/icons'
import CommodityCard from './CommodityCard'
import CommodityPage from './CommodityPage'
import {HOST,PORT} from '../../config'
import {userContext} from '../App'

const CommodityListTable = ()=>{
    const [commodities,setCommodities] = useState([])
    const {auth} = useContext(userContext)
    const loadCommodities = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/commodities`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setCommodities(result.data)
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
                <p style={{fontSize:"25px",textAlign:"center",color:"gray"}}>商品区</p>
                <Link to="/postcommodity">
                    <PlusCircleFilled style={{fontSize:"35px",color:"#0A8ADB"}}/>
                </Link>
            </div>
            
            )
            :null
            }
            <CommodityCard loadCommodities={loadCommodities} commodities={commodities}/> 
        </Container>
    )
}

const CommodityListPage = ()=>{
    return(
        <Switch>
            <Route exact path="/commodities" component={CommodityListTable}/>
            <Route exact path="/commodities/:cid" component={CommodityPage}/>
        </Switch>
    )
}

export default CommodityListPage