import getShopById from "@/api/get-shop-by-id";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import Navbar from "@/layout/navbar";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import style from '@/styles/wishlist/WishlistHeader.module.scss'
import getWishlistHeaderById from "@/api/get-wishlist-by-id";
import { ThemeContext } from "@/pages/changer/themeChanger";
import UpdateWishlistHeader from "@/api/update-wishlist-header";
import LowerNavbar from "@/layout/lowerNavbar";
import getCookie from "@/util/getCookie";
import JWT from "@/types/JWTToken";
import Authentication from "@/api/authentication";

const ShopDetailPage = () => {
    const router = useRouter();
    const {theme} = useContext(ThemeContext)

    const [name, setName] = useState("")
    const [status, setStatus] = useState("public")
    const [user, setUser] = useState<any>()
    const [wishlistID, setWishlistID] = useState<any>();
    const [wishlist, setWishlist] = useState<any>();
    
    useEffect(() => {
        setWishlistID(router.query.id);
    }, [router.query.id]);

    useEffect(() => {

        const get = async () => {
            const response = await getWishlistHeaderById(wishlistID);

            setWishlist(response);            
        }

        get();

        const getCurrentUser = async () => {
            const JWT = getCookie("AuthenticationCookie")
            // console.log(JWT)

            const token:JWT = {
                token_string: JWT
            }

            // console.log(JWT)
            const user = await Authentication(token)
            
            if(user === 404) {
                alert("Server Error")
            
            } else if(user === "Where is Cookie? 0_0null") {
                alert("No Cookie")

            } else {
                setUser(user)

            }
        }

        getCurrentUser()
        
    }, [wishlistID]);

    const handleSubmit = async () => {

        const response = await UpdateWishlistHeader(wishlistID, name, status);

        if (response == 404) alert("Something Went Wrong");
        else {
            alert('Wishlist updated!');
            router.push("/user/wishlist")
        }

    };

    if (!wishlist || Object.keys(wishlist).length == 0) return <div>Loading ...</div>

    return ( 
        <div>
            <header>
                <Navbar />
                <LowerNavbar />
            </header>

            {(wishlist.user_id === user.ID) ? 
            <div className={style.updateIndex}>
                <div className={style.form}>
                    <div className={style.updateTitle}>
                        Update Wishlist
                    </div>

                    <div className={style.update}>
                        Current Name: {wishlist.wishlist_name}

                        <div className="div">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={style.inputField} placeholder="New Name"/>
                        </div>
                    </div>

                    <div className={style.update}>
                        Current Status: {wishlist.wishlist_status}

                        <div>
                            <select id="status" onChange={(e) => {setStatus(e.target.value)}} className={style.inputField}>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                    </div>

                    <button className={style.button}  onClick={() => handleSubmit(wishlist.ID)}>
                        Update
                    </button>
                </div>
            </div>
            :
            <div className={style.title}>
                <br></br>

                <div>
                    This is not your wishlist!, You're not allowed to update! ╰（‵□′）╯
                </div>
                
                <br></br>
            </div>
            }

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default ShopDetailPage;