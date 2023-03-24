import RectangularInputField from "@/pages/components/RectangularInputField";
import { useEffect, useState } from "react"
import Navbar from "@/layout/navbar";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter"
import style from "@/styles/account/AccountSettings.module.scss";
import { useRouter } from "next/router";
import Authentication from "@/api/authentication";
import JWT from "@/types/JWTToken";
import getCookie from "@/util/getCookie";
import UpperSetting from "@/pages/components/UpperSetting";
import LowerNavbar from "@/layout/lowerNavbar";
import ShopNavbar from "@/layout/shopNavbar";
import Link from "next/link";
import User from "@/types/User";
import ConfirmPassword from "@/api/confirm-password";

const ChangePhoneNumber = () => {
    const[role, setRole] = useState()

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[user, setUser] = useState<any>()
    const[confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter()

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
            
            if(user === 404) {
                signIn = 0
                alert("Server Error")
            
            } else if(user === "Where is Cookie? 0_0null") {
                message = "Sign In / Register"

            } else {
                signIn = 100
                setUser(user)
                setEmail(user.email)

            }
        }

        getCurrentUser()

        setRole(localStorage.getItem('role'))
    }, [])

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        
        const userAttempt:User = {
            email: email,
            password: password
        }

        const response = await ConfirmPassword(userAttempt)
        console.log(response);
        
        if(response === 404) {
            alert("Ngeng ngong failed")

        } else if(response === "Wrong Password!") {
            alert("Wrong Password la")

            window.location.reload()
        } else {
            alert("Password right")
            console.log(response);

            router.push('/account/change-password')
        }
        
    };

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>

            <div className={style.index}>
                <UpperSetting />

                <div className={style.title}>
                    Confirm Password
                </div>

                <form onSubmit={handleSubmit}>
                    <RectangularInputField required value={password} onChange={setPassword} placeholder="Password" password /> 

                    <br></br>  

                    <button className={style.signInStyle}>
                        Confirm Password
                    </button>
                </form>
            </div>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default ChangePhoneNumber;