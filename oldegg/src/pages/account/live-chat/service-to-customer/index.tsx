import Authentication from "@/api/authentication";
import getChattingCustomers from "@/api/get-chatting-customer";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import LowerNavbar from "@/layout/lowerNavbar";
import Navbar from "@/layout/navbar";
import ShopNavbar from "@/layout/shopNavbar";
import ChatRoom from "@/pages/components/ChatRoom";
import JWT from "@/types/JWTToken";
import getCookie from "@/util/getCookie";
import { useEffect, useState } from "react";
import style from '@/styles/chat/Chat.module.scss'
import DeleteMessages from "@/api/delete-messages";

interface ChatRoomProps{
    from: string
    to: string
    senderName: string
}

const ServiceChatToCustomer = (props: ChatRoomProps) => {
    const [userId, setUserId] = useState('')
    const [name, setName] = useState('')
    const [user, setUser] = useState<any>()

    const [role, setRole] = useState('')
    const [receiverId, setReceiverId] = useState("");
    const { from, to, senderName } = props;

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
                setUserId(user.ID + "")
            }
        }

        getCurrentUser()
        console.log("asd");
        console.log(userId);
        
        
        const getReceiver = async () => {
            const response = await getChattingCustomers("999")

            if(response === 404) {
                alert("Something went wrong")
            }

            setReceiverId(response)
            console.log(response);
            
        }

        getReceiver() 
        
    }, [])

    const handleDelete = async () => {      
        
        const response = await DeleteMessages("999", receiverId + "")

        if(response === 404) {
            alert("Something weng wong")
        }

        alert("Chat " + receiverId + " with " + "999 successfully ended")
        window.location.reload()
    }

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>

            <div>
                <ChatRoom 
                    from={"999"}
                    to={receiverId + ""}
                    senderName={name}
                />

                <div className={style.buttonIndex}>
                    <button className={style.button} onClick={handleDelete}>End Conversation</button>
                </div>
            </div>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default ServiceChatToCustomer;