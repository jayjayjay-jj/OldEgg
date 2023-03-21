import RectangularInputField from "@/pages/components/RectangularInputField";
import setCookie from "@/util/setCookie";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import style from '@/styles/account/SignInPage.module.scss'
import Link from "next/link";
import logo from '../../../assets/logo/logo.svg';
import Image from "next/image";
import axios from "axios";
import { ThemeContext } from "@/pages/changer/themeChanger";
import SignInButton from "@/pages/components/SignInButton";
import ShopSignIn from "@/api/shop-sign-in";
import Shop from "@/types/Shop";

const SignInPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const route = useRouter()
    const {theme} = useContext(ThemeContext);

    const onFormSubmitted = async (e:any) => {
        e.preventDefault();

        const shopAttempt:Shop = {
            email: email,
            password: password,
            status: status
        }

        const response = await ShopSignIn(shopAttempt)
        console.log("Response: " + response)
        if(response === 404) {
            alert("Sign-In Failed!")

        } else if(response === "Email not found!") {
            alert("Invalid Email!")

        } else if(response === "Password not found!") {
            alert("Invalid Password!") 
        
        } else if(response === "Banned!") {
            alert("You're banned!") 
        
        } else {
            alert("Shop Sign-In Success!")
            console.log(response)

            setCookie("AuthenticationCookie", response, 2)
            localStorage.setItem("role", "shop")
            route.push("/")
        }
    }

    return ( 
        <div className={style.all} style={{ backgroundColor : theme.white_gray }}>
            <div className={style.signInHead}>
                <Link href="/"><Image src={logo} alt="Newegg" className={style.image}></Image></Link>
            </div>

            <SignInButton />

            <div className={style.signInBody}>
                <div className={style.title}style={{ color : theme.black_white }}> Shop Sign In</div>
                <br></br>
                    
                <form className={style.index} onSubmit={onFormSubmitted}>
                    <RectangularInputField required value={email} onChange={setEmail} placeholder="Email Address" email />
                    <RectangularInputField required value={password} onChange={setPassword} placeholder="Password" password />    
                    <button className={style.signInStyle}>SIGN IN</button>
                
                </form> 
            </div>

            <br></br>
            <br></br>

            <div className={style.signInFoot}>
                <br></br>

                <div className={style.textLinktc}>
                    <Link href="/" className={style.textLinktc}>Terms & Conditions&nbsp;</Link>
                    |
                    <Link href="/" className={style.textLinktc}>&nbsp;Privacy Policy</Link>
                </div>

                <br></br>

                <div className={style.copyright}>
                    © 2023 Oldegg Inc. All rights reserved
                </div>

                <br></br>
            </div>
        </div>
    );
}

export default SignInPage