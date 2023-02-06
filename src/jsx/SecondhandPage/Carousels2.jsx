import {Carousel} from 'antd'
import React,{useEffect} from 'react'

const Floor = (props)=>{
    const {picture} = props
    return(
        <Carousel>
            <div>
            <img 
            height="450px"
            width="450px"
            src={`/upload/${picture}`}
            />
            </div>
        </Carousel>
    )
}

const PPart = (props)=>{
    const {secondhand} = props
    if(!secondhand.pictures) return null
    const pictures = secondhand.pictures
    const floors = pictures.map((picture,idx)=>{
        return(
            <div>
                <Floor key={idx} picture={picture}/>
            </div>
        )
    })
    console.log(floors)
    return(
        <div>
            {floors}
        </div>
    )
    
}

const Carousels2 = (props)=>{
    const {secondhand,loadSecondhand} = props
    useEffect(()=>{
        loadSecondhand();
    },[])

    return(
        <div>
            <PPart secondhand={secondhand}/>
        </div>
    )
}

export default Carousels2