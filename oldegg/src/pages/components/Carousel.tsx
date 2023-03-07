import next from 'next'
import React, { useContext, useEffect, useState } from 'react'
import style from '@/pages/components/Carousel.module.scss'
import Link from 'next/link'
import CarouselCard from '@/pages/components/CarouselCard'
import { ThemeContext } from '../changer/themeChanger'

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

    const { theme } = useContext(ThemeContext);

    return (
        <div className={style.outer}>
            <div className={style.carousel}  style={carousel}>

                <div className={style.sidebar}>
                    <ul className={style.ul} style={{ backgroundColor : theme.lightBlue_black }}>
                        <li className={style.list}>
                            <Link href='/' className={style.link} style={{ color : theme.black_white }}>Components & Storage</Link>
                        </li>

                        <li className={style.list}> 
                            <Link href='/' className={style.link} style={{ color : theme.black_white }}>Computer Systems</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link} style={{ color : theme.black_white }}>Computer Peripherals</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link} style={{ color : theme.black_white }}>Appliances</Link>                
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link} style={{ color : theme.black_white }}>TV & Home Theater</Link>                
                        </li>
                        
                        <li className={style.list}>
                            <Link href='/' className={style.link} style={{ color : theme.black_white }}>Electronics</Link>
                        </li>
                        
                        <li className={style.list}>
                            <Link href='/' className={style.link} style={{ color : theme.black_white }}>Gaming & VR</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link} style={{ color : theme.black_white }}>Networking</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link} style={{ color : theme.black_white }}>Smart Home & Security</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link} style={{ color : theme.black_white }}>Office Solutions</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link} style={{ color : theme.black_white }}>Software & Services</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link} style={{ color : theme.black_white }}>Automotive & Tools</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/'className={style.link} style={{ color : theme.black_white }}>Home & Outdoors</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link} style={{ color : theme.black_white }}>Health & Sports</Link>
                        </li>

                        <li className={style.list}>
                            <Link href='/' className={style.link} style={{ color : theme.black_white }}>Toys, Drones & Maker</Link>
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
