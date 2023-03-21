import RectangularInputField from "@/pages/components/RectangularInputField";
import { useEffect, useState } from "react"
import Navbar from "@/layout/navbar";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter"
import style from "@/styles/account/AccountSettings.module.scss";
import UpdateUserPhone from "@/api/update-user-phone";
import { useRouter } from "next/router";
import Authentication from "@/api/authentication";
import JWT from "@/types/JWTToken";
import getCookie from "@/util/getCookie";
import UpperSetting from "@/pages/components/UpperSetting";

const ChangePhoneNumber = () => {
    const[user, setUser] = useState<any>()
    const[phoneNumber, setPhoneNumber] = useState('')
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
    }, [])

        const handleSubmit = async () => {

        const response = await UpdateUserPhone(user.ID, phoneNumber);
        if (response == 404) alert("Something Went Wrong");
        else {

            alert('Phone Number Updated!');
            // window.location.reload();

        }

    };

    return ( 
        <div>
            <header>
                <Navbar />
            </header>

            <div className={style.index}>
                <UpperSetting />

                <div className={style.title}>
                    Change Phone Number
                </div>

                {user?.ID}

                <div>
                    Current Phone Number: {user?.mobile_phone_number}
                </div>

                <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className={style.inputField} placeholder="Mobile Phone Number"/>

                <button className={style.button} onClick={() => handleSubmit(user?.ID)}>Change Phone Number</button>
            </div>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default ChangePhoneNumber;