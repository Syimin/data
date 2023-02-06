import React,{useState,useEffect,useContext} from 'react'
import {Media} from 'react-bootstrap'
import {message} from 'antd'
import {HOST,PORT,DOMAIN} from '../../config'
import {userContext} from '../App'
import {LikeFilled,LikeOutlined} from '@ant-design/icons'
import DeleteHelpcommentButton from './DeleteHelpcommentButton'
import {Link} from 'react-router-dom'

const UserCard = (props)=>{
    const {auth} = useContext(userContext)
    const {author} = props
    return(
        <div>
            <Link to={`/profileclick/${author._id}`}>
            <img
                width={64}
                height={64}
                className="mr-3 img-thumbnail round"
                src={author.avatar ? `/upload/${author.avatar}` : '/img/avatar.jpg'}
                alt={author.nickname ? author.nickname:author.username}
            />
            </Link>
            <br/>
            <center>{author.nickname ? author.nickname:author.username}</center>
        </div>
    )
}

const ContentCard = (props)=>{
    const {user,auth,setUser} = useContext(userContext)
    const {floor,hideDeleteCButton} = props
    const like = async (target)=>{
        try {
            const storage = await localStorage.getItem(DOMAIN)//storage是字符串形式
            const {username,token} = JSON.parse(storage)//要解构就得先将storage转换成json格式
            const body = {
                username,token
            }
            const res = await fetch(`${HOST}:${PORT}/api/users/likes2/${target}`,{
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
    
    const unlike = async (target)=>{
        try {
            const storage = await localStorage.getItem(DOMAIN)//storage是字符串形式
            const {username,token} = JSON.parse(storage)//要解构就得先将storage转换成json格式
            const body = {
                username,token
            }
            const res = await fetch(`${HOST}:${PORT}/api/users/unlikes2/${target}`,{
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
    
    if(!user.likesh) return null

    const likebutton = user.likesh.includes(floor._id)
    ?<span onClick={()=>unlike(floor._id)}><LikeFilled style={{fontSize:"24px",color:"orangered"}}/></span>
    :<span onClick={()=>like(floor._id)}><LikeOutlined style={{fontSize:"24px",color:"orangered"}}/></span>

    return(
        <div>
            <h5>{floor.title}</h5>
            <p>
                {floor.content}
            </p>

            {auth && (floor.author && user.username === floor.author.username)
            ? (
            <p className="d-flex justify-content-end text-muted">
                {hideDeleteCButton===false ? null : <DeleteHelpcommentButton hid={floor._id}/>}
            </p>
            )
            : null
            }
            
            {
            hideDeleteCButton===false 
            ?
            <>
            {likebutton}<span style={{fontSize:"20px"}}>{floor.dianzans_helpdiscuss.length}</span>
            </>
            :
            null
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

const HPart = (props)=>{
    const {helpdiscuss} = props
    if(!helpdiscuss.author) return null
    return(
        <Media className="rounded border p-3 mb-3 mt-0">
            <UserCard author={helpdiscuss.author}/>
            <Media.Body>
                <ContentCard floor={helpdiscuss} hideDeleteCButton={false}/>
            </Media.Body>
        </Media>
    )
}

const Floor = (props)=>{
    const {helpcomment} = props
    return(
        <Media className="rounded border p-3 mb-3">
            <UserCard author={helpcomment.author}/>
            <Media.Body>
                <ContentCard floor={helpcomment}/>
            </Media.Body>
        </Media>
    )
}

const CPart = (props)=>{
    const {helpcomments} = props
    const floors = helpcomments.map((helpcomment,idx)=>{
        return(
            <div>
                <Floor key={idx} helpcomment={helpcomment}/>
            </div>
        )
    })
    return(
        <div>
            {floors}
        </div>
    )
}

const Helpdiscuss = (props)=>{
    const {helpcomments,helpdiscuss,loadHelpdiscuss} = props
    useEffect(()=>{
        loadHelpdiscuss()
    },[])

    return(
        <div>
            <HPart helpdiscuss={helpdiscuss}/>
            <CPart helpcomments={helpcomments}/>
        </div>
    )
}

export default Helpdiscuss