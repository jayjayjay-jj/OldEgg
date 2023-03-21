import Authentication from "@/api/authentication";
import Footer from "@/layout/footer";
import Navbar from "@/layout/navbar";
import JWT from "@/types/JWTToken";
import User from "@/types/User";
import getCookie from "@/util/getCookie";
import { useContext, useEffect, useState } from "react";
import style from '@/styles/account/AccountSettings.module.scss'
import LowerFooter from "@/layout/lowerFooter";
import { useRouter } from "next/router";
import Link from "next/link";
import { ThemeContext } from "@/pages/changer/themeChanger";
import UpperSetting from "@/pages/components/UpperSetting";

const AccountSettingsPage = () => {
    const [user, setUser] = useState<User>()
    const route = useRouter() 

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

    const onFormSubmitted = async (e:any) => {
        e.preventDefault();

        document.cookie = "AuthenticationCookie" + "=; " + "expires= expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        route.push("/")
    }

    const { theme } = useContext(ThemeContext);

    return ( 
        <div>
            <Navbar />

            <div className={style.body} style={{ backgroundColor : theme.white_gray }}>
                <UpperSetting />

                <div className={style.name} style={{ color : theme.black_white }}>
                    {user?.first_name + " " + user?.last_name}
                </div>

                <div className={style.card} style={{ backgroundColor : theme.lightBlue_darkBlue }}>
                    <p className={style.pass}>Phone Number: {user?.mobile_phone_number}</p>

                    <button className={style.button}>
                        <Link href='/account/change-phone-number' className={style.buttonLink}>Change Phone Number</Link>
                    </button>
                </div>

                <div className={style.card} style={{ backgroundColor : theme.lightBlue_darkBlue }}>
                    Email: {user?.email}
                </div>

                <div className={style.card} style={{ backgroundColor : theme.lightBlue_darkBlue }}>
                    <p className={style.pass}>Password: {user?.password}</p>
                    <button className={style.button}>Change Password</button>
                </div>
                
                <form onSubmit={onFormSubmitted}>
                    <div className={style.logout}>
                        <button className={style.button}>Log Out</button>
                    </div>
                </form>
            </div>

            <Footer />

            <LowerFooter />
        </div>
    );
}

export default AccountSettingsPage;