import React,{useState,useEffect,useContext} from 'react'
import {Switch,Route,Link} from 'react-router-dom'
import {Media} from 'react-bootstrap'
import {message} from 'antd'
import {StarFilled,StarOutlined,ShareAltOutlined,WarningOutlined} from '@ant-design/icons'
import {HOST,PORT,DOMAIN} from '../../config'
import {userContext} from '../App'
import DeleteCButton from './DeleteCButton'


const UserCard = (props)=>{
    const {author} = props
    return(
        <div>
            <Link to={`/profileclick/${author._id}`}>
                <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={author.avatar ? `/upload/${author.avatar}` : '/img/avatar.jpg'}
                    alt={author.nickname ? author.nickname : author.username}
                />
            </Link>
            <br/>
            <center>{author.nickname ? author.nickname : author.username}</center>
        </div>
    )
}

const ContentCard = (props)=>{
    const {user,setUser,auth} = useContext(userContext)
    const {floor,hideDeleteCButton} = props
    const collect = async (target)=>{
        try {
            const storage = await localStorage.getItem(DOMAIN)//storage是字符串形式
            const {username,token} = JSON.parse(storage)//要解构就得先将storage转换成json格式
            const body = {
                username,token
            }
            const res = await fetch(`${HOST}:${PORT}/api/users/collects/${target}`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            const result = await res.json()
            if(res.ok){
                message.success(result.message)
                setUser(result.data)
            }else{
                message.warning(result.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }
    
    const uncollect = async (target)=>{
        try {
            const storage = await localStorage.getItem(DOMAIN)//storage是字符串形式
            const {username,token} = JSON.parse(storage)//要解构就得先将storage转换成json格式
            const body = {
                username,token
            }
            const res = await fetch(`${HOST}:${PORT}/api/users/uncollects/${target}`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            const result = await res.json()
            if(res.ok){
                message.success(result.message)
                setUser(result.data)
            }else{
                message.warning(result.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }
    
    if(!user.collects) return null

    const button = user.collects.includes(floor._id)
    ?<span onClick={()=>uncollect(floor._id)}><StarFilled style={{fontSize:"24px",color:"orangered"}}/></span>
    :<span onClick={()=>collect(floor._id)}><StarOutlined style={{fontSize:"24px",color:"orangered"}}/></span>

    const putin = async (target)=>{
        try {
            const storage = await localStorage.getItem(DOMAIN)//storage是字符串形式
            const {username,token} = JSON.parse(storage)//要解构就得先将storage转换成json格式
            const body = {
                username,token
            }
            const res = await fetch(`${HOST}:${PORT}/api/shoppingcarts/putin/${target}`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            const result = await res.json()
            if(res.ok){
                message.success(result.message)
                setUser(result.data)
            }else{
                message.warning(result.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }
    
    if(!user.shoppingcarts) return
    
    const shoppingcart = <span onClick={()=>putin(floor._id)}>加入购物车</span>
    

    return(
        <div>
            <h5>{floor.title}</h5>
            <p>
                {floor.content}
            </p>
            {hideDeleteCButton===false 
            ?
            (
            <p style={{color:"orangered",fontSize:"28px"}}>
                ￥{floor.price}
            </p>
            )
            : null
            }
            
            {hideDeleteCButton===false 
            ?
            <>
            {button} <span style={{fontSize:"20px"}}>{floor.dianzans_commodity.length}</span>
            </>
            :null
            }
                <div className="d-flex justify-content-end text-muted">
                    {hideDeleteCButton===false 
                    ?
                    (
                        <>
                        <span style={{color:"white",backgroundColor:"orange",borderRadius:"10px 0px 0px 10px"}}>
                            <span className="p-3">{shoppingcart}</span>
                        </span>
                        <span style={{color:"white",backgroundColor:"orangered",borderRadius:"0px 10px 10px 0px"}}>
                            <span className="p-3">立即购买</span>
                        </span>
                        </>
                    ) 
                    
                    :null
                    } 
                </div>
        
            {auth && (floor.author && user.username === floor.author.username)
            ? (
            <p className="d-flex justify-content-end text-muted">
                {hideDeleteCButton===false ? null : <DeleteCButton cid={floor._id}/>}
            </p>
            )
            : null
            }

            <p className="d-flex justify-content-end text-muted">
                <small>发表于{new Date(floor.posttime).toLocaleString()}</small>
            </p>
            <hr/>
            <p className="d-flex justify-content-end m-0">
                <small>{floor.author.description}</small>
            </p>
        </div>
    )
}

const CPart = (props)=>{
    const {commodity} = props
    if(!commodity.author) return null
    return(
        <Media className="rounded border p-3 mb-3 mt-0">
            <UserCard author={commodity.author}/>
            <Media.Body>
                <ContentCard floor={commodity} hideDeleteCButton={false}/>
            </Media.Body>
        </Media>
    )
}

const Floor = (props)=>{
    const {comment} = props
    return(
        <Media className="rounded border p-3 mb-3">
            <UserCard author={comment.author}/>
            <Media.Body>
                <ContentCard floor={comment}/>
            </Media.Body>
        </Media>
    )
}

const CommentPart = (props)=>{
    const {comments} = props
    const floors = comments.map((comment,idx)=>{
        return(
            <div>
                <Floor key={idx} comment={comment}/>
            </div>
        )
    })
    return(
        <div>
            {floors}
        </div>
    )
}

const Commodity = (props)=>{
    const {commodity,loadCommodity,comments} = props
    useEffect(()=>{
        loadCommodity();
    },[])

    return(
        <div>
            <CPart commodity={commodity}/>
            <p style={{color:"red", fontSize:"18px",textAlign:"center"}}>
                ↓评论区↓
            </p>
            <CommentPart comments={comments}/>
        </div>
    )
}

export default Commodity