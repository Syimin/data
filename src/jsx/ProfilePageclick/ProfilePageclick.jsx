import React from 'react'
import {Container} from 'react-bootstrap'
import UserInfoclick from './UserInfoclick'

const ProfilePageclick = (props)=>{
    const {uid} = props.match.params
    // console.log(uid)
    return(
        <div>
            <Container>
                <UserInfoclick uid={uid}/>
            </Container>    
        </div>
    )  
}

export default ProfilePageclick