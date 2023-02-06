import React,{useState,useEffect} from 'react'
import {Route, Switch, Link, withRouter } from 'react-router-dom';
import {Card,ListGroup,Row,Col,Accordion} from 'react-bootstrap'
import {HOST,PORT} from '../../config'
import {MinusOutlined,PlusOutlined} from '@ant-design/icons'




const ShoppingInfo = (props)=>{
    const {shoppingcarts} = props
    const lines = shoppingcarts.map((shoppingcart,idx)=>{
    const [counter,setCounter] = useState(shoppingcart.price)
    const [num,setNum] = useState(1)
        return(
            <ListGroup.Item key={idx}>
                <Link to={`/commodities/${shoppingcart._id}`}>
                    <img
                    width={128}
                    height={128}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${shoppingcart.pictures[0]}`}
                    />
                </Link>
                <Link to={`/commodities/${shoppingcart._id}`}>
                    <span>{shoppingcart.title}</span>
                </Link>
                <p style={{fontSize:"24px" ,color:"orangered"}}>￥{shoppingcart.price}</p>
                数量: {num >= 1 ? <button onClick={()=>{setCounter(counter-shoppingcart.price),setNum(num-1)}} ><MinusOutlined/></button> : null} {num} <button onClick={()=>{setCounter(counter+shoppingcart.price),setNum(num+1)}}><PlusOutlined/></button>
                <p className="d-flex justify-content-end">
                    <p style={{color:"red"}}>合计:{counter}</p>
                </p>
            </ListGroup.Item>
            
        )
    })
    return(
        <div>
            {lines}
        </div>
    )
}


const ShoppingInfo2 = (props)=>{
    const {shoppingcarts2} = props
    const lines = shoppingcarts2.map((shoppingcart2,idx)=>{
    const [counter2,setCounter2] = useState(shoppingcart2.price)
    const [num2,setNum2] = useState(1)
        return(
            <ListGroup.Item key={idx}>
                <Link to={`/secondhands/${shoppingcart2._id}`}>
                    <img
                    width={128}
                    height={128}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${shoppingcart2.pictures[0]}`}
                    />
                </Link>
                <Link to={`/secondhands/${shoppingcart2._id}`}>
                    <span>{shoppingcart2.title}</span>
                </Link>
                <p style={{fontSize:"24px" ,color:"orangered"}}>￥{shoppingcart2.price}</p>
                数量: {num2 >= 1 ? <button onClick={()=>{setCounter2(counter2-shoppingcart2.price),setNum2(num2-1)}} ><MinusOutlined/></button> : null} {num2} <button onClick={()=>{setCounter2(counter2+shoppingcart2.price),setNum2(num2+1)}}><PlusOutlined/></button>
                <p className="d-flex justify-content-end">
                    <p style={{color:"red"}}>合计:{counter2}</p>
                </p>
            </ListGroup.Item>
            
        )
    })
    return(
        <div>
            {lines}
        </div>
    )
}

const ShoppingInfo3 = (props)=>{
    const {shoppingcarts3} = props
    const lines = shoppingcarts3.map((shoppingcart3,idx)=>{
    const [counter3,setCounter3] = useState(shoppingcart3.price)
    const [num3,setNum3] = useState(1)
        return(
            <ListGroup.Item key={idx}>
                <Link to={`/groupbuys/${shoppingcart3._id}`}>
                    <img
                    width={128}
                    height={128}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${shoppingcart3.pictures[0]}`}
                    />
                </Link>
                <Link to={`/groupbuys/${shoppingcart3._id}`}>
                    <span>{shoppingcart3.title}</span>
                </Link>
                <p style={{fontSize:"24px" ,color:"orangered"}}>￥{shoppingcart3.price}</p>
                数量: {num3 >= 1 ? <button onClick={()=>{setCounter3(counter3-shoppingcart3.price),setNum3(num3-1)}} ><MinusOutlined/></button> : null} {num3} <button onClick={()=>{setCounter3(counter3+shoppingcart3.price),setNum3(num3+1)}}><PlusOutlined/></button>
                <p className="d-flex justify-content-end">
                    <p style={{color:"red"}}>合计:{counter3}</p>
                </p>
            </ListGroup.Item>
            
        )
    })
    return(
            <div>
                {lines}
            </div>
    )
}

// const ProfileInfo = (props)=>{
//     const [counter,counter2,counter3] = props
//     console.log(counter)
//     return(
//         <div style={{fontSize:"35px",color:"red"}}>总计:{counter+counter2+counter3}元</div>
//     )
// }

const ShoppingCart = (props)=>{
    const {uid} = props
    const [user,setUser] = useState({})
    const [shoppingcarts,setShoppingcarts] = useState([])
    const [shoppingcarts2,setShoppingcarts2] = useState([])
    const [shoppingcarts3,setShoppingcarts3] = useState([])
    const getUser = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/users/${uid}`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setUser(result.data)
                setShoppingcarts(result.data.shoppingcarts)
                setShoppingcarts2(result.data.shoppingcarts2)
                setShoppingcarts3(result.data.shoppingcarts3)
            }
        } catch (error) {
            alert(error.message)
        }
    }
    useEffect(()=>{
        getUser()
    },[])

    return(
        <div>
            <ShoppingInfo shoppingcarts={shoppingcarts}/>
            <ShoppingInfo2 shoppingcarts2={shoppingcarts2}/>
            <ShoppingInfo3 shoppingcarts3={shoppingcarts3}/>
        </div>
    )
}

export default ShoppingCart
