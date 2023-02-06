import React from 'react'
import {Carousel} from 'react-bootstrap'

const Demo = ()=>{
    return(
        <Carousel className="cuIcon-title text-pink">
            <Carousel.Item>
                <img
                    height="380px"
                    className="d-block w-100"
                    src="/img/index/scoll/scroll_03.jpg"
                    alt="Third slide"
                />
                {/* <Carousel.Caption>
                    <h3 style={{color:"white"}}>气垫</h3>
                    <p>003</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <img
                    height="380px"
                    className="d-block w-100"
                    src="/img/index/scoll/scroll_02.jpg"
                    alt="Second slide"
                />
                {/* <Carousel.Caption>
                    <h3 style={{color:"white"}}>完美日记</h3>
                    <p>002</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <img
                    height="380px"
                    className="d-block w-100"
                    src="/img/index/scoll/scroll_05.jpg"
                    alt="Third slide"
                />
                {/* <Carousel.Caption>
                    <h3 style={{color:"white"}}>气垫</h3>
                    <p>003</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <img
                    height="380px"
                    className="d-block w-100"
                    src="/img/index/scoll/scroll_04.jpg"
                    alt="Third slide"
                />
                {/* <Carousel.Caption>
                    <h3 style={{color:"white"}}>气垫</h3>
                    <p>003</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <img
                    height="380px"
                    className="d-block w-100"
                    src="/img/index/scoll/scroll_01.jpg"
                    alt="First slide"
                />
                {/* <Carousel.Caption>
                    <h3 style={{color:"white"}}>雅诗兰黛口红</h3>
                    <p>001</p>
                </Carousel.Caption> */}
            </Carousel.Item>
        </Carousel>
    )
}

const Slogan = ()=>{
    return(
        <div>
            <img
                height="300px"
                className="d-block w-100"
                src="/img/huisebz.jpg"
                alt="First slide"
            />
        </div>
    )
}

const Introduction = ()=>{
    return(
        <div>
            <Demo/>
            <Slogan/>
        </div>
    )
}



export {Demo,Slogan}
export default Introduction