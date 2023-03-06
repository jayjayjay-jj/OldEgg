import next from 'next'
import React, { useEffect, useState } from 'react'
import style from '@/pages/components/Carousel.module.scss'
import Link from 'next/link'
import CarouselCard from '@/pages/components/CarouselCard'

export default function Carousel() {
    const [carouselImages, setCarouselIMages] = useState([
        "https://promotions.newegg.com/notebooks/23-0252/1920x660@2x.jpg",
        "https://promotions.newegg.com/wd/22-1109/banner/1920x660@2x.jpg",
        "https://promotions.newegg.com/msi/23-0264/1920x660@2x.jpg",
        "https://promotions.newegg.com/nepro/23-0121/1920x660@2x.jpg",
        "https://promotions.newegg.com/nepro/23-0278/1920x660@2x.jpg",
        "https://promotions.newegg.com/23-0277/1920x660.jpg"
    ])

    var imageIndex = 0
    const [imageCarousel, setImageCarousel] = useState(carouselImages[0])
    const [imageCarouselIndex, setImageCarouselIndex] = useState(0)

    const carousel = {
        backgroundImage: `url(${imageCarousel})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    const prev = () =>{
        if(imageCarouselIndex > 0){
            setImageCarouselIndex(imageCarouselIndex-1);
        } else if (imageCarouselIndex == 0){
            setImageCarouselIndex(5);
        }
    }

    const next = () => {
        if(imageCarouselIndex < 5){
            setImageCarouselIndex(imageCarouselIndex+1);
        } else if (imageCarouselIndex == 5){
            setImageCarouselIndex(0);
        }
    }

    useEffect(() => {
        setImageCarousel(carouselImages[imageCarouselIndex])
        const time = setInterval(next, 5000)
        return () => clearInterval(time)
    }, [carouselImages, imageCarouselIndex])

    return (
        <div className={style.outer}>
            <div className={style.carousel}  style={carousel}>

                <div className={style.sidebar}>
                    <ul className={style.ul}>
                        <li className={style.list}>
                            <Link href='/' className={style.link}>Components & Storage</Link>
                        </li>

                        <li className={style.list}> 
                            <Link href='/' className={style.link}>Computer Systems</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link}>Computer Peripherals</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link}>Appliances</Link>                
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link}>TV & Home Theater</Link>                
                        </li>
                        
                        <li className={style.list}>
                            <Link href='/' className={style.link}>Electronics</Link>
                        </li>
                        
                        <li className={style.list}>
                            <Link href='/' className={style.link}>Gaming & VR</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link}>Networking</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link}>Smart Home & Security</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link}>Office Solutions</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link}>Software & Services</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link}>Automotive & Tools</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/'className={style.link}>Home & Outdoors</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link}>Health & Sports</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link}>Toys, Drones & Maker</Link>
                        </li>
                    </ul> 
                </div>
                
                <div className={style.footer}>
                    <CarouselCard />
                </div>
            </div>
        </div>
    )
}
