import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import LowerNavbar from "@/layout/lowerNavbar";
import Navbar from "@/layout/navbar";
import ShopNavbar from "@/layout/shopNavbar";
import { useEffect, useState } from "react";

const LiveChatPage = () => {
    const [role, setRole] = useState('')

    useEffect(() => {
        setRole(localStorage.getItem('role'))
    })

    return ( 
        <div>
            <header>
                {(role === "user") ? <Navbar /> : (role === "shop") ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>

            <div>
                
            </div>
            
            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default LiveChatPage;