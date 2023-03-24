import Authentication from "@/api/authentication";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import LowerNavbar from "@/layout/lowerNavbar";
import Navbar from "@/layout/navbar";
import ShopNavbar from "@/layout/shopNavbar";
import ChatRoom from "@/pages/components/ChatRoom";
import JWT from "@/types/JWTToken";
import getCookie from "@/util/getCookie";
import { useEffect, useState } from "react";

const CustomerChatToService = () => {
    const [userId, setUserId] = useState()
    const [name, setName] = useState('')

    const [user, setUser] = useState<any>()
    const [role, setRole] = useState('')

    let message = ""
    useEffect(() => {

        const getCurrentUser = async () => {
            const JWT = getCookie("AuthenticationCookie")
            setRole(localStorage.getItem("role"))

            const token:JWT = {
                token_string: JWT
            }

            const user = await Authentication(token)
            
            if(user === 404) {
                alert("Server Error")
            
            } else if(user === "Where is Cookie? 0_0null") {
                message = "Sign In / Register"

            } else {
                setUser(user)
                setUserId(user.ID)
                setName(user.name)

            }
        }

        getCurrentUser()
    }, [])

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>

            <div>
                <ChatRoom 
                    from={userId + ""}
                    to={"2"}
                    senderName={name}
                />
            </div>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default CustomerChatToService;