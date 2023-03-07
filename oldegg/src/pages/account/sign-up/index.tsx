import SignUp from "@/api/sign-up";
import RectangularInputField from "@/pages/components/RectangularInputField";
import User from "@/types/User";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import style from '@/styles/account/SignUpPage.module.scss'
import logo from '../../../assets/logo/logo.svg'
import Image from "next/image";

const SignUpPage = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobilePhoneNumber, setMobilePhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [subscribed, setSubcribed] = useState('');

    const router = useRouter()

    const handleFormSubmit = async (e:any) => {
        e.preventDefault();

        const newUser:User = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            mobile_phone_number: mobilePhoneNumber,
            password: password,
            role_id: 1,
            subscribed: true ,
            status: "Active"
        }

        console.log(firstName)
        console.log(lastName)
        console.log(email)
        console.log(mobilePhoneNumber)
        console.log(password)

        const response = await SignUp(newUser)
        if(response === 404) {
            alert("Error in sign-up")
        } else {
            alert("Sign-up successfull! Account created.")
            router.push("/account/sign-in")
        }
    }

    return ( 
        <div className={style.all}>
            <div className={style.signUpHead}>
                <Link href="/"><Image src={logo} alt="Newegg" className={style.image}></Image></Link>
            </div>

            <div className={style.signUpHead}>
                <div className={style.title}>Create Account</div>
                <br></br>

                <form className={style.index} onSubmit={handleFormSubmit}>
                    <RectangularInputField value={firstName} onChange={setFirstName} required placeholder="First Name" />
                    <RectangularInputField value={lastName} onChange={setLastName} required placeholder="Last Name" />
                    <RectangularInputField value={email} onChange={setEmail} required placeholder="Email Address" email />
                    <RectangularInputField value={mobilePhoneNumber} onChange={setMobilePhoneNumber} required placeholder="Mobile Phone Number" number />
                    <RectangularInputField value={password} onChange={setPassword} required placeholder="Password" password />  

                    <br></br>

                    <div className="checkboxForm">
                        <input name="checkbox" type="checkbox" />
                        <div className={style.text}>&nbsp;Subscribe for exclusive e-mail offers and discounts</div>
                    </div>

                    <div className={style.textLinkPN}>
                        By creating an account, you agree to Newegg’s&nbsp;   
                        <Link href="/" className={style.textLinkPN}>Privacy Notice</Link>
                        &nbsp;and&nbsp;
                        <Link href="/" className={style.textLinkPN}>Terms of Use.</Link>
                    </div>

                    <button  className={style.signUpStyle}>Sign Up</button>    

                    <div className={style.textSign}>
                        Have an account?&nbsp;   
                        <Link href="/account/sign-in" className={style.textSignIn}>Sign In</Link>
                    </div>
                </form>
            </div>
                
            <div className={style.signInFoot}>
                <br></br>
                <br></br>
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

export default SignUpPage;