import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import Navbar from "@/layout/navbar";
import { ThemeContext } from "@/pages/changer/themeChanger";
import style from "@/styles/shop/Shop.module.scss"
import Link from "next/link";
import { useContext } from "react"
import ShopUpperSetting from '@/pages/components/ShopUpperSetting';

const ShowAllShops= () => {
    const {theme} = useContext(ThemeContext);

    return ( 
        <div>
            <header>
                <Navbar />
            </header>

            <body>
                <ShopUpperSetting />
            </body>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default ShowAllShops