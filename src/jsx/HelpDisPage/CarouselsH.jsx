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
    const {helpdiscuss} = props
    if(!helpdiscuss.pictures) return null
    const pictures = helpdiscuss.pictures
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

const CarouselsH = (props)=>{
    const {helpdiscuss,loadHelpdiscuss} = props
    useEffect(()=>{
        loadHelpdiscuss();
    },[])

    return(
        <div>
            <PPart helpdiscuss={helpdiscuss}/>
        </div>
    )
}

export default CarouselsH