import React, { useEffect, useState } from 'react'
import style from '@/pages/components/CarouselCard.module.scss'
import Link from 'next/link'
import getCookie from '@/util/getCookie'
import Authentication from '@/api/authentication'
import JWT from '@/types/JWTToken'
import User from '@/types/User'

export default function CarouselCard() {
    const [user, setUser] = useState<User>()
    const [langOption, setLangOption] = useState('')

    let signIn = 0
    let message = ""

    useEffect(() => {
        const getCurrentUser = async () => {
            const JWT = getCookie("AuthenticationCookie")
            // console.log(JWT)

            const token:JWT = {
                token_string: JWT
            }

            // console.log(JWT)
            const user = await Authentication(token)
            console.log(token)
            console.log(user)
            
            if(user === 404) {
                signIn = 0
                alert("Server Error")
            
            } else if(user === "Where is Cookie? 0_0null") {
                message = "Sign In / Register"

            } else {
                signIn = 100
                setUser(user)

            }
            console.log(user)
            console.log(message)
        }

        getCurrentUser()
    }, [])

    return (
        <div className={style.outer}>
            <div className={style.box}>
                <div className={style.title}>
                    HI,&nbsp;{user?.first_name}&nbsp;{user?.last_name}
                </div>

                <br></br>

                <div className={style.description}>
                    Welcome to Newegg! Hope you enjoy shopping here today. If you have any comment or suggestion, please leave us&nbsp;

                    <Link href='/' className={style.link}>feedback</Link>

                    .
                </div>

                <br></br>

                <div className={style.right}>
                    <Link href='/account/sign-in' className={style.footerLink}>YOUR ACCOUNT</Link>
                    &nbsp;&nbsp;&nbsp;
                    <Link href='/' className={style.footerLink}>YOUR ORDERS</Link>
                </div>
            </div>

            <div className={style.box}>
                <div className={style.title}>
                    RECENTLY VIEWED ITEM 
                </div>

                <br></br>

                <div className={style.description}>
                    Welcome to Newegg! Hope you enjoy shopping here today. If you have any comment or suggestion, please leave us&nbsp;

                    <Link href='/' className={style.link}>feedback.</Link>
                </div>
            </div>

            <div className={style.box}>
                <div className={style.title}>
                    CATEGORY YOU MAY BE INTERESTED IN 
                </div>

                <br></br>

                <div className={style.description}>
                    Welcome to Newegg! Hope you enjoy shopping here today. If you have any comment or suggestion, please leave us&nbsp;

                    <Link href='/' className={style.link}>feedback.</Link>
                </div>
            </div>
        </div>
    )
}
