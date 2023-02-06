import React,{useState} from 'react'
import {Switch,Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import CommodityCard from '../CommodityListPage/CommodityCard'
import CommodityPage from '../CommodityListPage/CommodityPage'
import {HOST,PORT} from '../../config'

const CommodityListTable = (props)=>{
    const rows = props
    const [commodities,setCommodities] = useState([])
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
            {rows >=4  ?  null : <CommodityCard loadCommodities={loadCommodities} commodities={commodities}/> }
        </Container>
    )
}

const CommodityListPage2 = ()=>{
    return(
        <Switch>
            <Route exact path="/" component={CommodityListTable}/>
            <Route exact path="/home" component={CommodityListTable}/>
            <Route exact path="/commodities/:cid" component={CommodityPage}/>
        </Switch>
    )
}

export default CommodityListPage2