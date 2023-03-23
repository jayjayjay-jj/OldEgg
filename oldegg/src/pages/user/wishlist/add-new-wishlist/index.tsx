import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import Navbar from "@/layout/navbar"
import { ThemeContext } from "@/pages/changer/themeChanger";
import RectangularInputField from "@/pages/components/RectangularInputField";
import style from '@/styles/shop/InsertShop.module.scss';
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import getCookie from "@/util/getCookie";
import JWT from "@/types/JWTToken";
import ShopNavbar from "@/layout/shopNavbar";
import WishlistHeader from "@/types/WishlistHeader";
import AddNewWishlistHeader from "@/api/insert-new-wishlist-header";
import User from "@/types/User";
import Authentication from "@/api/authentication";
import LowerNavbar from "@/layout/lowerNavbar";

const InsertNewWishlist = () => {

    const[name, setName] = useState('');
    const[status, setStatus] = useState('public')
    const[userId, setUserId] = useState();
    
    const router = useRouter()
    const[user, setUser] = useState<User>();
    const[role, setRole] = useState('')
    const {theme} = useContext(ThemeContext);

    const handleFormSubmit = async (e:any) => {
        e.preventDefault();

        const newWishlist:WishlistHeader = {
            wishlist_name: name,
            user_id: Number(user?.ID),
            wishlist_status: status,
        }
        
        const response = await AddNewWishlistHeader(newWishlist)
        if(response === 404) {
            alert("Error in insert-new-wishlist")
        } else {
            alert("New Wishlist successfully added!")
            console.log(newWishlist.wishlist_status);
            
            window.location.reload()
        }
    }

    let signIn = 0
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
                <div style={{ backgroundColor : theme.white_gray, color: theme.black_white }} className={style.index}>

                    <div className={style.title}>
                        Add new Wishlist
                    </div>

                    <br></br>

                    <form onSubmit={handleFormSubmit} className={style.form}>

                        <RectangularInputField value={name} onChange={setName} required placeholder="Wishlist Name" />

                        <div>
                            <select id="status" onChange={(e) => {setStatus(e.target.value)}} className={style.inputField}>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>

                        <button  className={style.insertButton}>
                            Add new wishlist
                        </button> 
                    </form>
                </div>
            </div>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default InsertNewWishlist;