import SignIn from "@/api/sign-in";
import RectangularInputField from "@/pages/components/RectangularInputField";
import User from "@/types/User";
import setCookie from "@/util/setCookie";
import { useRouter } from "next/router";
import { useState } from "react";
import style from '@/styles/account/SignInPage.module.scss'
import Link from "next/link";
import logo from '../../../assets/logo/logo.svg';
import Image from "next/image";

const SignInPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const route = useRouter()

    const onFormSubmitted = async (e:any) => {
        e.preventDefault();

        console.log(email)
        console.log(password)

        const userAttempt:User = {
            email: email,
            password: password
        }

        const response = await SignIn(userAttempt)
        // console.log("Response: " + response)
        if(response === 404) {
            alert("Sign-In Failed!")

        } else if(response === "Email not found!") {
            alert("Invalid Email!")

        } else if(response === "Password not found!") {
            alert("Invalid Password!") 
        
        } else {
            alert("Sign-In Success!")
            console.log(response)

            setCookie("AuthenticationCookie", response, 2)
            route.push("/")
        }
    }

    return ( 
        <div className={style.all}>
            <div className={style.signInHead}>
                <Link href="/"><Image src={logo} alt="Newegg" className={style.image}></Image></Link>
            </div>

            <div className={style.signInBody}>
                <div className={style.title}>Sign In</div>
                <br></br>

                <form className={style.index} onSubmit={onFormSubmitted}>
                    <RectangularInputField required value={email} onChange={setEmail} placeholder="Email Address" email />
                    <RectangularInputField required value={password} onChange={setPassword} placeholder="Password" password />    
                    <button className={style.signInStyle}>SIGN IN</button>    
                </form>

                <button className={style.button}>
                    GET ONE-TIME SIGN IN CODE
                </button>

                <Link href="/" className={style.link}>What's the One-Time Code?</Link>

                <div className={style.text}>
                    <div>
                        New to Newegg?&nbsp;
                        <Link href="/account/sign-up" className={style.textLink}>Sign Up</Link>
                    </div>
                </div>
                
                <br></br>

                <div className={style.link}>OR</div>

                <div>
                    <button className={style.button}>
                        SIGN IN WITH GOOGLE
                    </button>
                    <button className={style.button}>
                        SIGN IN WITH APPLE
                    </button>
                </div>
            </div>

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