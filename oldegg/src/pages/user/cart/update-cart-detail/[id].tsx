import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import Navbar from "@/layout/navbar";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import style from '@/styles/wishlist/WishlistHeader.module.scss'
import { ThemeContext } from "@/pages/changer/themeChanger";
import LowerNavbar from "@/layout/lowerNavbar";
import getCookie from "@/util/getCookie";
import JWT from "@/types/JWTToken";
import Authentication from "@/api/authentication";
import getCartDetail from "@/api/get-cart-detail";
import UpdateCartQuantity from "@/api/update-cart-quantity";
import ShopNavbar from "@/layout/shopNavbar";

const ShopDetailPage = () => {
    const router = useRouter();
    const {theme} = useContext(ThemeContext)

    const [headerID, setHeaderID] = useState()
    const [detailID, setDetailID] = useState()
    const [userID, setUserID] = useState()
    const [name, setName] = useState("")
    const [count, setCount] = useState()
    const [status, setStatus] = useState("public")
    const [role, setRole] = useState('')

    const [uid, setUid] = useState()
    const [prodID, setProdID] = useState()
    const [productName, setProductName] = useState('')
    const [productStock, setProductStock] = useState()

    const [user, setUser] = useState<any>()
    const [carts, setCarts] = useState()
    const [products, setProducts] = useState()
    const [headers, setHeaders] = useState<any>()
    const [cid, setcid] = useState<any>();
    const [wishlist, setWishlist] = useState<any>();
    const [wishlists, setWishlists] = useState<any>();
    const [wishlistProducts, setWishlistProducts] = useState<any>()
    const [wishlistDetails, setWishlistDetails] = useState<any>()
    
    const query = router.query
    const {cartId, productID} = query

    useEffect(() => {
        setcid(router.query.id);
    }, [router.query.id]);

    let message = ""
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
                message = "Sign In / Register"

            } else {
                setUser(user)
                setUserID(user.ID)
            }
        }

        getCurrentUser()        
    }, [])

    useEffect(() => {       
        const getDetail = async () => {            
            const response = await getCartDetail(Number(cartId), Number(productID));
            console.log(response.cart);
            

            if(response === 404) {
                alert("Something went wrong")
            }
            
            setCarts(response.cart)
            setProducts(response.product)
            setCount(response.cart.quantity)

            setProductName(response.product.name)
            setProductStock(response.product.stock)
        }

        getDetail();    

    }, [cartId, productID]);
    
    const handleSubmit = async () => {

        const response = await UpdateCartQuantity(Number(cartId), Number(productID), Number(count));

        if (response == 404) alert("Something Went Wrong");
        else {
            alert('Details updated!');
            router.push("/user/cart")
        }

    };

    function incrementCount() {
        let setok = products.stock

        if(count < setok) {
            setCount(count + 1)
        }
    }

    function decrementCount() {
        if(count > 0) {
            setCount(count - 1)
        }
    }

    // if (!wishlist || Object.keys(wishlist).length == 0) return <div>Loading ...</div>

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>

            <div className={style.updateIndex}>
                <div className={style.form}>
                    <div className={style.updateTitle}>
                        Update Cart Quantity
                    </div>

                    <div className={style.update}>
                        Product Name: {productName}
                    </div>
                    
                    <div className={style.update}>
                        Product Stock: {productStock}
                    </div>

                    <br></br>

                    <div className={style.update}>
                        <div>
                            Current Cart Quantity: {count}
                        </div>

                        <br></br>

                        <div className={style.count}>
                            <button onClick={decrementCount} className={style.plusminusButton}>-</button>
                            <input type="number" value={count} onChange={(e:any) => setCount(e.target.value)} className={style.plusminusBox} />
                            <button onClick={incrementCount} className={style.plusminusButton}>+</button>
                        </div>

                        <button className={style.button}  onClick={() => handleSubmit(cartId, prodID, count)}>
                            Update
                        </button>
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

export default ShopDetailPage;