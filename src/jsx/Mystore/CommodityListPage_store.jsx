import React,{useState,useContext} from 'react'
import {Switch,Route,Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {PlusCircleFilled} from '@ant-design/icons'
import CommodityCard_store from './CommodityCard_store'
import CommodityPage_store from './CommodityPage_store'
import {HOST,PORT} from '../../config'
import {userContext} from '../App'

const CommodityListTable = ()=>{
    const [commodities,setCommodities] = useState([])
    const {auth,auth2} = useContext(userContext)
    const loadCommodities = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/storecommodities`,{
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
            {auth && auth2
            ?
            (
            <div>
                <p style={{fontSize:"25px",textAlign:"center",color:"gray"}}>商铺商品区</p>
                <Link to="/poststorecommodity">
                    <PlusCircleFilled style={{fontSize:"35px",color:"#0A8ADB"}}/>
                </Link>
            </div>
            
            )
            :null
            }
            <CommodityCard_store loadCommodities={loadCommodities} commodities={commodities}/> 
        </Container>
    )
}

const CommodityListPage_store = ()=>{
    return(
        <Switch>
            <Route exact path="/storecommodities" component={CommodityListTable}/>
            <Route exact path="/storecommodities/:cid" component={CommodityPage_store}/>
        </Switch>
    )
}

export default CommodityListPage_store