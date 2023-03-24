import Authentication from "@/api/authentication";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import LowerNavbar from "@/layout/lowerNavbar";
import Navbar from "@/layout/navbar";
import ShopNavbar from "@/layout/shopNavbar";
import JWT from "@/types/JWTToken";
import getCookie from "@/util/getCookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import style from '@/styles/messages/MessageCenter.module.scss'

const LiveChatPage = () => {
    const [userID, setUserID] = useState()

    const [role, setRole] = useState('')
    const [user, setUser] = useState<any>()

    useEffect(() => {

        const getCurrentUser = async () => {
            const JWT = getCookie("AuthenticationCookie")
            setRole(localStorage.getItem("role"))

            const token:JWT = {
                token_string: JWT
            }

            const user = await Authentication(token)
            
            if(user === 404) {
                alert("Server Error")
            
            } else if(user === "Where is Cookie? 0_0null") {
                alert(user)

            } else {
                setUser(user)
                setUserID(user.ID)
            }
        }

        getCurrentUser()
    }, [])

    return ( 
        <div>
            <header>
                {(role === "user") ? <Navbar /> : (role === "shop") ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>

            <div className={style.index}>
                {(role === "user") ?
                    <div className={style.body}>
                        <div className={style.title}>
                            User
                        </div>
                        
                        <div className={style.outer}>
                            {(userID === 999) ?
                                <button className={style.button}>
                                    <Link className={style.buttonLink} href='live-chat/service-to-customer'>Customer</Link>
                                </button>
                            :
                                <button className={style.button}>
                                    <Link className={style.buttonLink} href='live-chat/customer-to-service'>Customer Service</Link>
                                </button>
                            }
                        </div>

                        <button className={style.button}>
                            <Link className={style.buttonLink} href='live-chat/customer-to-shop'>Shop</Link>
                        </button>

                        <div className={style.title}>
                            <br></br>
                            Manage Ongoing Promotion
                        </div>
                    </div>
                :
                    <div className={style.body}>
                        <div className={style.title}>
                            Shop
                        </div>

                        <button className={style.button}>
                            <Link className={style.buttonLink} href='live-chat/shop-to-customer'>Customer</Link>
                        </button>

                        <div className={style.title}>
                            <br></br>
                            Manage Ongoing Promotion
                        </div>
                    </div>
                }
            </div>
            
            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default LiveChatPage;