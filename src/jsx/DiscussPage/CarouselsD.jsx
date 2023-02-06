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
    const {discuss} = props
    if(!discuss.pictures) return null
    const pictures = discuss.pictures
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

const CarouselsD = (props)=>{
    const {discuss,loadDiscuss} = props
    useEffect(()=>{
        loadDiscuss();
    },[])

    return(
        <div>
            <PPart discuss={discuss}/>
        </div>
    )
}

export default CarouselsD