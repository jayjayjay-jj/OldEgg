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
import { ThemeContext } from "@/pages/changer/themeChanger"
import SignInButton from '@/pages/components/SignInButton';
import CheckEmail from "@/api/check-email";

const InputEmail = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const [code, setCode] = useState('')

    const [isOneTimeSigningIn, setIsOneTimeSigningIn] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);

    const route = useRouter()
    const {theme} = useContext(ThemeContext);

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
            route.push('/account/change-password');

        }

    }

    return ( 
        <div className={style.all} style={{ backgroundColor : theme.white_gray }}>
            <div className={style.signInHead}>
                <Link href="/"><Image src={logo} alt="Newegg" className={style.image}></Image></Link>
            </div>

            <SignInButton />

            <div className={style.signInBody}>
                <div className={style.title}style={{ color : theme.black_white }}>Forgot Password</div>
                <br></br>

                {
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

                <div className={style.copyright}>
                    <br />
                    © 2023 Oldegg Inc. All rights reserved
                </div>

                <br></br>
            </div>
        </div>
    );
}

export default InputEmail