import SignIn from "@/api/sign-in";
import RectangularInputField from "@/pages/components/RectangularInputField";
import User from "@/types/User";
import setCookie from "@/util/setCookie";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import style from '@/styles/account/SignInPage.module.scss'
import Link from "next/link";
import logo from '../../../assets/logo/logo.svg';
import Image from "next/image";
import axios from "axios";
import { ThemeContext } from "@/pages/changer/themeChanger";

const SignInPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const [code, setCode] = useState('')

    const [isOneTimeSigningIn, setIsOneTimeSigningIn] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);

    const route = useRouter()
    const {theme} = useContext(ThemeContext);

    const onFormSubmitted = async (e:any) => {
        e.preventDefault();

        console.log(email)
        console.log(password)
        console.log(status)

        const userAttempt:User = {
            email: email,
            password: password,
            status: status,
        }

        const response = await SignIn(userAttempt)
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
            alert("Sign-In Success!")
            console.log(response)

            setCookie("AuthenticationCookie", response, 2)
            route.push("/")
        }
    }

    const getOneTimeSignInCode = async (e: any) => {

        e.preventDefault();
        setIsOneTimeSigningIn(true);

    }

    const sendCode = async () => {

        // Send a Request
        const body = {
            email: email
        }
        
        setIsSending(true); 
        let response:any = await axios.post("http://localhost:8080/get-one-time-sign-in-code", body);
        response = response.data
        setIsSending(false); 

        if (response === "Field Can't be Empty") alert(response);
        else if (response === "Email isn't Registered") alert(response);
        else if (response === "Send Error") alert(response);
        else {

            alert("Email Sent!");
            setIsCodeSent(true);

        }

    }

    const onCodeSubmitted = async () => {

        // Send Request to Backend
        const body = {
            email: email,
            code: code
        }

        let response:any = await axios.post("http://localhost:8080/sign-in-with-one-time-code", body);
        response = response.data

        if (response === 'Invalid Code') alert(response)
        else if (response === 'Failed to Create Token') alert(response)
        else if (response === 'Code is Not Longer Valid') alert(response)
        else {

            alert('Successful Login');
            setCookie('AuthenticationCookie', response, 10);
            route.push('/');

        }

    }

    return ( 
        <div className={style.all} style={{ backgroundColor : theme.white_gray }}>
            <div className={style.signInHead}>
                <Link href="/"><Image src={logo} alt="Newegg" className={style.image}></Image></Link>
            </div>

            <div className={style.signInBody}>
                <div className={style.title}style={{ color : theme.black_white }}>Sign In</div>
                <br></br>

                {
                    !isOneTimeSigningIn ?
                    <form className={style.index} onSubmit={onFormSubmitted}>
                        <RectangularInputField required value={email} onChange={setEmail} placeholder="Email Address" email />
                        <RectangularInputField required value={password} onChange={setPassword} placeholder="Password" password />    
                        <button className={style.signInStyle}>SIGN IN</button> 
                        <button onClick={ getOneTimeSignInCode } type="button" className={style.button}>
                            GET ONE-TIME SIGN IN CODE
                        </button> 
                    
                    </form> :
                        !isCodeSent ?
                            !isSending ?
                                <div className={style.codeIndex}>
                                    <RectangularInputField required value={email} onChange={setEmail} placeholder="Email Address" email />
                                    <br />
                                    <button className={style.signInStyle} onClick={ sendCode }>SEND CODE</button>
                                </div> : 

                                <h3 className={style.codeSending} style={{ color : theme.black_white }}>
                                    Sending Code
                                </h3>     
                                :
                                <>
                                    <RectangularInputField required value={code} onChange={setCode} placeholder="Code" number />
                                    <br />
                                    <button onClick={ onCodeSubmitted } className={style.signInStyle}>Submit Code</button> 
                                </>                    
                    
                }
                

                <Link href="/" className={style.link}>What's the One-Time Code?</Link>

                <div className={style.text} style={{ color : theme.black_white }}>
                    <div>
                        New to Newegg?&nbsp;
                        <Link href="/account/sign-up" className={style.textLink} style={{ color : theme.black_white }}>Sign Up</Link>
                    </div>
                </div>
                
                <br></br>

                <div className={style.link} style={{ color : theme.black_white }}>OR</div>

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