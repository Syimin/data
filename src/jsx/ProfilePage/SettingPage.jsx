import React from 'react'
import {Container,Row,Col,Card,Accordion} from 'react-bootstrap'
import SettingForm from './SettingForm'     
import PostWallpaper from './PostWallpaper'    
    const SettingPage = (props)=>{
        const {uid} = props.match.params
        return(
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col sm={12} md={6}>
                        <SettingForm uid={uid}/>
                    </Col>
                    <Col sm={12} md={6}>
                        <PostWallpaper uid={uid}/>
                    </Col>
                </Row>
            </Container>
    
        )
        
                           
    }

    export default SettingPage
 
    

