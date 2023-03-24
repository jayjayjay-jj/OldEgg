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
import UpdateUserPassword from "@/api/update-user-password";

const ChangePassword = () => {
    const[role, setRole] = useState()

    const[newPassword, setNewPassword] = useState('')
    const[user, setUser] = useState<any>()
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

            }
        }

        getCurrentUser()

        setRole(localStorage.getItem('role'))
    }, [])

    const handleSubmit = async (e:any) => {

        const response = await UpdateUserPassword(user.ID, newPassword)
        
        if(response === 404) {
            alert("Ngeng ngong failed")

        } else {
            alert("Password Changed")
            console.log(response);

            // router.push('/account/change-password')
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
                    Change Password
                </div>

                <div onSubmit={handleSubmit}>
                    <RectangularInputField required value={newPassword} onChange={setNewPassword} placeholder="New Password" password /> 

                    <br></br>  

                    <button className={style.signInStyle} onClick={() => handleSubmit(user?.ID)}>
                        Change Password
                    </button>
                </div>
            </div>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default ChangePassword;