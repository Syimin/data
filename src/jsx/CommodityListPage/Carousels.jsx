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
    const {commodity} = props
    if(!commodity.pictures) return null
    const pictures = commodity.pictures
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

const Carousels = (props)=>{
    const {commodity,loadCommodity} = props
    useEffect(()=>{
        loadCommodity();
    },[])

    return(
        <div>
            <PPart commodity={commodity}/>
        </div>
    )
}

export default Carousels