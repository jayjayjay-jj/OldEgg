import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import Navbar from "@/layout/navbar"
import { ThemeContext } from "@/pages/changer/themeChanger";
import RectangularInputField from "@/pages/components/RectangularInputField";
import Theme from "@/pages/components/Theme";
import style from '@/styles/shop/InsertShop.module.scss';
import Link from "next/link";
import { useContext, useState } from "react";

const InsertNewShop = () => {

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const handleFormSubmit = () => {

    }

    const {theme} = useContext(ThemeContext);

    return ( 
        <div>
            <header>
                <Navbar />
            </header>

            <body>
                <div style={{ backgroundColor : theme.white_gray, color: theme.black_white }} className={style.index}>
                    <div className={style.title}>
                        Insert Shop
                    </div>

                    <br></br>

                    <form onSubmit={handleFormSubmit} className={style.form}>
                        <RectangularInputField value={name} onChange={setName} required placeholder="Shop Name" />

                        <RectangularInputField value={email} onChange={setEmail} required placeholder="Email Address" email />

                        <RectangularInputField value={password} onChange={setPassword} required placeholder="Password" password />  

                        <br></br>

                        <button  className={style.insertButton}>
                            Insert Shop
                        </button> 
                    </form>
                </div>
            </body>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default InsertNewShop;