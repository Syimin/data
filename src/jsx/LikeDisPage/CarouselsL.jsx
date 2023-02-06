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
    const {likediscuss} = props
    if(!likediscuss.pictures) return null
    const pictures = likediscuss.pictures
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

const CarouselsL = (props)=>{
    const {likediscuss,loadLikediscuss} = props
    useEffect(()=>{
        loadLikediscuss();
    },[])

    return(
        <div>
            <PPart likediscuss={likediscuss}/>
        </div>
    )
}

export default CarouselsL