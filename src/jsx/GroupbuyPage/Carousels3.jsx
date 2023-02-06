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
    const {groupbuy} = props
    if(!groupbuy.pictures) return null
    const pictures = groupbuy.pictures
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

const Carousels3 = (props)=>{
    const {groupbuy,loadGroupbuy} = props
    useEffect(()=>{
        loadGroupbuy();
    },[])

    return(
        <div>
            <PPart groupbuy={groupbuy}/>
        </div>
    )
}

export default Carousels3