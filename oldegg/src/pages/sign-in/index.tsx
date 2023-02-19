import SignIn from "@/api/sign-in";
import RectangularInputField from "@/pages/components/RectangularInputField";
import User from "@/types/User";
import setCookie from "@/util/setCookie";
import { useRouter } from "next/router";
import { useState } from "react";
import style from '../../styles/SignInPage.module.scss'

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
        if(response === 404) {
            alert("Sign-In Failed!")
        } else {
            alert("Sign-In Success!")
            console.log(response)

            setCookie("AuthenticationCookie", response, 2)
            route.push("/")
        }
    }

    return ( 
        <form className={style.index} onSubmit={onFormSubmitted}>
            <RectangularInputField required value={email} onChange={setEmail} placeholder="Email" email />
            <RectangularInputField required value={password} onChange={setPassword} placeholder="Password" password />    
            <button>Sign In</button>    
        </form>
    );
}

export default SignInPage