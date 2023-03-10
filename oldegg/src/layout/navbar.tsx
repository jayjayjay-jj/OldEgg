import style from '@/styles/layout/Navbar.module.scss'
import Image from 'next/image';
import menu from '@/assets/icons/menu.png'
import logo from '@/assets/logo/Logo.svg'
import address from '@/assets/icons/address.png'
import notif from '@/assets/icons/notification.png'
import people from '@/assets/icons/people.png'
import cart from '@/assets/icons/shopping.png'
import search from '@/assets/icons/search.png'
import Theme from '@/pages/components/Theme'
import Link from 'next/link';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import getCookie from '@/util/getCookie';
import JWT from '@/types/JWTToken';
import Authentication from '@/api/authentication';
import User from '@/types/User';
import { ThemeContext } from '@/pages/changer/themeChanger';

export default function Navbar() {
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

    const handleChange = ((e: { target: { value: SetStateAction<string>; }; }) => {
        console.log(e.target.value)
        setLangOption(e.target.value)
    })

    const { theme } = useContext(ThemeContext);
    console.log(theme)

    return ( 
        <div className={style.index} style={{ backgroundColor : theme.white_darkBlue }}>
            <div className={style.left}>
                <div className={style.sidebarIcon} style={{ backgroundColor : theme.white_lightBlue }}>
                    <Image src={menu} alt="sidebar" className={style.sidebarImage}></Image>
                </div>

                <div className={style.logo}>
                    <Link href="/"><Image src={logo} alt="Newegg" className={style.logoImage}></Image></Link>
                </div>

                <div className={style.address} style={{ backgroundColor : theme.white_lightBlue}}>
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

                <div className={style.searchBar}>
                    <div className={style.searchBox}>
                        <input type='search' className={style.searchInput}></input>
                    </div>

                    <div>
                        <button className={style.searchIcon}>
                            <Image src={search} alt="sidebar" className={style.searchImage}></Image>
                        </button>
                    </div>
                </div>
            </div>
            
            <div className={style.right}>
                <div className={style.notification} style={{ backgroundColor : theme.white_lightBlue }}>
                    <Image src={notif} alt="notification" className={style.notificationImage}></Image>
                </div>

                <div className={style.language}>
                    <select id="lang" value={langOption} onChange={handleChange} className={style.languageSelection} style={{ backgroundColor : theme.white_lightBlue }}>
                        <option value="English">EN</option>
                        <option value="Indonesian">IND</option>
                    </select>
                </div>

                <div className={style.themeChanger}>
                    <Theme />
                </div>

                <div className={style.user} style={{ backgroundColor : theme.white_lightBlue}}>
                    <Image src={people} alt="user" className={style.userImage}></Image>

                    <div className={style.userText}>
                        <div className={style.userWelcome}>
                            Welcome 
                        </div>

                        <div>
                            <div className={style.textSelection}>{user?.first_name ?
                                <Link href="/account/settings" className={style.userSelection}>{user?.first_name + " " + user?.last_name}</Link> : 
                                <Link href="/account/sign-in" className={style.userSelection}>Sign In/ Register</Link>}</div>
                        </div>
                    </div>
                </div>

                <div className={style.return} style={{ backgroundColor : theme.white_lightBlue}}>
                    <div>
                        Returns
                    </div>

                    <div className={style.textSelection}>
                        &orders
                    </div>
                </div>

                <div className={style.cart} style={{ backgroundColor : theme.white_lightBlue }}>
                    <Image src={cart} alt="shoppingCart" className={style.cartImage}></Image>
                </div>
            </div>

            <div className={style.right}>

            </div>  
        </div>
    );
}

