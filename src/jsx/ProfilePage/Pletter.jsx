import React,{useEffect,useContext} from 'react'
import {Media} from 'react-bootstrap'
import {userContext} from '../App'
import DeletePcommentButton from './DeletePcommentButton'
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
            <center>{author.nickname ? author.nickname : author.username}</center>
            
        </div>   
    )
}

const ContentCard = (props)=>{
    const {user,auth} = useContext(userContext)
    const {floor,hideDeleteCButton} = props
    return(
        <div>
            <p>
                {floor.content}
            </p>

            {auth && (floor.author && user.username === floor.author.username)
            ? (
            <p className="d-flex justify-content-end text-muted">
                {hideDeleteCButton===false ? null : <DeletePcommentButton pid={floor._id}/>}
            </p>
            )
            : null
            }

            <p className="d-flex justify-content-end text-muted">
                <small>发表于{new Date(floor.posttime).toLocaleString()}</small>
            </p>
            <hr/>
        </div>
    )
}

const DPart = (props)=>{
    const {pletter} = props
    if(!pletter.author) return null
    return(
        <Media className="rounded border p-3 mb-3 mt-0">
            <UserCard author={pletter.author}/>
            <Media.Body>
                <ContentCard floor={pletter} hideDeleteCButton={false}/>
            </Media.Body>
        </Media>
    )
}

const Floor = (props)=>{
    const {pcomment} = props
    return(
        <Media className="rounded border p-3 mb-3">
            <UserCard author={pcomment.author}/>
            <Media.Body>
                <ContentCard floor={pcomment}/>
            </Media.Body>
        </Media>
    )
}

const CPart = (props)=>{
    const {pcomments} = props
    const floors = pcomments.map((pcomment,idx)=>{
        return(
            <div>
                <Floor key={idx} pcomment={pcomment}/>
            </div>
        )
    })
    return(
        <div>
            {floors}
        </div>
    )
}

const Pletter = (props)=>{
    const {pcomments,pletter,loadPletter} = props
    useEffect(()=>{
        loadPletter()
    },[])

    return(
        <div>
            <DPart pletter={pletter}/>
            <CPart pcomments={pcomments}/>
        </div>
    )
}

export default Pletter