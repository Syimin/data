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
    const {unlikediscuss} = props
    if(!unlikediscuss.pictures) return null
    const pictures = unlikediscuss.pictures
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

const CarouselsU = (props)=>{
    const {unlikediscuss,loadUnlikediscuss} = props
    useEffect(()=>{
        loadUnlikediscuss();
    },[])

    return(
        <div>
            <PPart unlikediscuss={unlikediscuss}/>
        </div>
    )
}

export default CarouselsU