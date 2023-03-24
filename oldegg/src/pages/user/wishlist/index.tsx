import Authentication from "@/api/authentication";
import getWishlistHeaderById from "@/api/get-wishlist-by-id";
import getWishlistHeaderByUserId from "@/api/get-wishllist-by-user-id";
import ShowAllWishlistHeader from "@/api/show-all-wishlists-headers";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import LowerNavbar from "@/layout/lowerNavbar";
import Navbar from "@/layout/navbar";
import ShopNavbar from "@/layout/shopNavbar";
import { ThemeContext } from "@/pages/changer/themeChanger";
import style from '@/styles/wishlist/WishlistHeader.module.scss'
import JWT from "@/types/JWTToken";
import getCookie from "@/util/getCookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const ViewAllWishlists = () => {
    const[userID, setUserID] = useState()
    const[user, setUser] = useState<any>()
    const[wishlists, setWishlists] = useState<any>()
    const[role, setRole] = useState('')

    const router = useRouter()
    const{theme} = useContext(ThemeContext)

    useEffect(() => {        
        const getCurrentUser = async () => {
            const JWT = getCookie("AuthenticationCookie")

            const token:JWT = {
                token_string: JWT
            }

            const user = await Authentication(token)
            
            if(user === 404) {
                alert("Server Error")
            
            } else if(user === "Where is Cookie? 0_0null") {
                alert("No Cookie")

            } else {
                setUser(user)
                setUserID(user.ID)
            }
        }

        getCurrentUser()
        console.log(userID);
        console.log(user);
        
        const getWishlishHeader = async() => {
            setRole(localStorage.getItem('role'))
            
            const response = await getWishlistHeaderByUserId(Number(userID));
            console.log(response);
            

            if(response === 404) {
                alert("Something went wrong!")
            }

            setWishlists(response)
        }
        getWishlishHeader()
        
    }, [userID, user]);

    const goToDetail = (id: Number) => {
        router.push('/user/wishlist/' + id);
    }

    if(!wishlists || !user.ID || !userID) return <div>Loading...</div>

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>
            
            <div>
                <div className={style.index}>
                    <div className={style.title}>
                        My Wishlist
                    </div>

                    {
                        wishlists.map((wishlist: any) => {
                            return (
                                <div className={style.card} style={{ backgroundColor : theme.lightBlue_darkBlue }}>
                                    <div className={style.cardName} onClick={() => goToDetail(wishlist.ID)}>
                                        {wishlist.wishlist_name}
                                    </div>

                                    <div className={style.carStatus}>
                                        Status: {wishlist.wishlist_status}
                                    </div>

                                    <button className={style.button}>
                                        <Link href={"/user/wishlist/update-wishlist-header/" + wishlist.ID} className={style.buttonLink}>Update Wishlist</Link>
                                    </button>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default ViewAllWishlists;