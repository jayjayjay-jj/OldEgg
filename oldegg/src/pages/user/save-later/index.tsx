import Authentication from "@/api/authentication";
import getLaterByUserId from "@/api/ger-later-by-user";
import getCartByUserId from "@/api/get-cart-by-user-";
import getWishlistByUserId from "@/api/get-wishlist-by-user";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import LowerNavbar from "@/layout/lowerNavbar";
import Navbar from "@/layout/navbar";
import ShopNavbar from "@/layout/shopNavbar";
import { ThemeContext } from "@/pages/changer/themeChanger";
import style from '@/styles/cart/Cart.module.scss'
import JWT from "@/types/JWTToken";
import getCookie from "@/util/getCookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const ViewAllSave = () => {
    const[userID, setUserID] = useState()
    const[wishlistID, setWishlistID] = useState()
    const[name, setName] = useState('')

    const[count, setCount] = useState(0)
    const[user, setUser] = useState<any>()
    const[laters, setLaters] = useState<any>()
    const[product, setProduct] = useState<any>();
    const[products, setProducts] = useState<any>()
    const[wishlists, setWishlists] = useState<any>()

    const [totalPrice, setTotalPrice] = useState(0);
    const [isCalculated, setIsCalculated] = useState(false)
    const [isDisplayingWishlists, setIsDisplayingWishlists] = useState(false);

    const[role, setRole] = useState('')
    const router = useRouter()
    const{theme} = useContext(ThemeContext)

    var totalPriceTemp = 0

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

    },[userID])

    useEffect(() => {        
    
        const getLater = async() => {
            setRole(localStorage.getItem('role'))
            
            const response = await getLaterByUserId(Number(userID));

            if(response === 404) {
                alert("Something went wrong!")
            }

            setLaters(response.laters)
            setProducts(response.products)
        }

        getLater()
        console.log(laters);
        console.log(products);

    }, [userID]);

    useEffect(() => {

        if(products && laters) {
            laters.forEach((cart:any, index:Number) => {
                totalPriceTemp += cart.quantity * products[index].price
                setTotalPrice(totalPriceTemp)
            })
            setIsCalculated(true)
        }
    }, [laters, products])

    const goToDetail = (id: Number) => {
        router.push('/user/wishlist/' + id);
    }
    if(!laters || !user.ID || !userID) return <div>Loading...</div>

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>
            
            <div>
                <div className={style.index}>
                    <div className={style.title}>
                        Save for Later
                    </div>
                    
                    {
                        laters.map((later: any, index: Number) => {
                            return (
                                <div className={style.card} style={{ backgroundColor : theme.lightBlue_darkBlue }}>
                                        <div className={style.left}>
                                            <div className={style.name}>
                                                {products[index].name}
                                            </div>

                                            <div className={style.carStatus}>
                                                Quantity: {later.quantity}
                                            </div>

                                            <div>
                                                Price: {products[index].price}
                                            </div>
                                        </div>

                                        <div className={style.right}>
                                            Total: Rp{later.quantity * products[index].price}
                                        </div>
                                </div>
                            )
                        }
                    )}
                </div>
                        
                <div className={style.card}>
                    <div className={style.name}>
                        Total Price: {totalPrice}
                    </div>
                </div>
            </div>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default ViewAllSave;