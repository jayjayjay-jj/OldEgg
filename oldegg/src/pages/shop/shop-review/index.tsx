import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import LowerNavbar from "@/layout/lowerNavbar";
import Navbar from "@/layout/navbar";
import ShopNavbar from "@/layout/shopNavbar";
import { useEffect, useState } from "react";
import style from '@/styles/search/Search.module.scss'

const ShopReviewPage = () => {
    const [role, setRole] = useState('')

    useEffect(() => {
        setRole(localStorage.getItem('role'))
    })

    return ( 
        <div>
            <header>
                {(role === 'user') ? <Navbar /> : (role === 'shop') ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>

            <div className={style.index}>
                <div className={style.title}>
                    Shop Review Page
                </div>
            </div>s

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default ShopReviewPage;