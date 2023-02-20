import style from '@/styles/layout/Navbar.module.scss'
import Image from 'next/image';
import menu from '@/assets/icons/menu.png'
import logo from '@/assets/logo/Logo.svg'
import address from '@/assets/icons/address.png'
import notif from '@/assets/icons/notification.png'
import people from '@/assets/icons/people.png'
import cart from '@/assets/icons/shopping.png'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import getCookie from '@/util/getCookie';
import JWT from '@/types/JWTToken';
import Authentication from '@/api/authentication';
import User from '@/types/User';

export default function Navbar() {
    const [user, setUser] = useState<User>()

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
        <div className={style.index}>
            <div className={style.left}>
                <div className={style.sidebarIcon}>
                    <Image src={menu} alt="sidebar" className={style.sidebarImage}></Image>
                </div>

                <div className={style.logo}>
                    <Link href="/"><Image src={logo} alt="Newegg" className={style.logoImage}></Image></Link>
                </div>

                <div className={style.address}>
                    <Image src={address} alt="sidebar" className={style.addressImage}></Image>

                    <div className={style.addressText}>
                        <div className={style.addressHello}>
                            Hello
                        </div>

                        <div className={style.textSelection}>
                            Select Address
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.right}>
                <div className={style.notification}>
                    <Image src={notif} alt="notification" className={style.notificationImage}></Image>
                </div>

                <div className={style.user}>
                    <Image src={people} alt="user" className={style.userImage}></Image>

                    <div className={style.userText}>
                        <div className={style.userWelcome}>
                            Welcome 
                        </div>

                        <div>
                            <div className={style.textSelection}>{user?.first_name ? 
                                    user?.first_name + " " + user?.last_name : 
                                    <Link href="/account/sign-in" className={style.userSelection}>Sign In/ Register</Link>}</div>
                        </div>
                    </div>
                </div>

                <div className={style.return}>
                    <div>
                        Returns
                    </div>

                    <div className={style.textSelection}>
                        &orders
                    </div>
                </div>

                <div className={style.cart}>
                    <Image src={cart} alt="shoppingCart" className={style.cartImage}></Image>
                </div>
            </div>

            <div className={style.right}>

            </div>  
        </div>
    );
}

