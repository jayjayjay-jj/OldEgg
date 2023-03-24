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
import getWishlistDetailByID from "@/api/get-wishlist-details-by-id";
import UpdateDetailQuantity from "@/api/update-detail-quantity";
import getWishlistHeaderDetailsProduct from "@/api/get-wishlist-header-details";
import getWishlistDetails from "@/api/get-wishlist-by-header";
import getWishlistHeaderByUserId from "@/api/get-wishllist-by-user-id";
import { setuid } from "process";

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
    const [details, setDetails] = useState()
    const [products, setProducts] = useState()
    const [headers, setHeaders] = useState<any>()
    const [wishlistID, setWishlistID] = useState<any>();
    const [wishlist, setWishlist] = useState<any>();
    const [wishlists, setWishlists] = useState<any>();
    const [wishlistProducts, setWishlistProducts] = useState<any>()
    const [wishlistDetails, setWishlistDetails] = useState<any>()
    
    const query = router.query
    const {wishID, productID} = query

    useEffect(() => {
        setWishlistID(router.query.id);
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

        const getWishlishHeader = async() => {
            setRole(localStorage.getItem('role'))
            
            const response = await getWishlistHeaderById(Number(wishlistID));
            console.log(response);
            

            if(response === 404) {
                alert("Something went wrong!")
            }

            setWishlists(response)
            setUid(response.user_id)
        }

        getWishlishHeader()
    }, [wishlistID])

    useEffect(() => {       
        const getDetail = async () => {
            const response = await getWishlistHeaderDetailsProduct(Number(wishID), Number(productID));

            if(response === 404) {
                alert("Something went wrong")
            }
            
            setDetails(response.wishlist)
            setProducts(response.product)
            setCount(response.wishlist.quantity)

            setProductName(response.product.name)
            setProductStock(response.product.stock)
        }

        getDetail();
        console.log(details);
        console.log(products);
        // console.log(products.name);        

    }, [wishlistID, wishID, productID]);
    
    const handleSubmit = async () => {

        const response = await UpdateDetailQuantity(Number(wishID), Number(productID), Number(count));

        if (response == 404) alert("Something Went Wrong");
        else {
            alert('Details updated!');
            router.push("/user/wishlist/" + wishlistID)
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
                <Navbar />
                <LowerNavbar />
            </header>

            {(uid === userID) ? 
            <div className={style.updateIndex}>
                <div className={style.form}>
                    <div className={style.updateTitle}>
                        Update Wishlist Quantity
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
                            Current Wishlist Count: {count}
                        </div>

                        <br></br>

                        <div className={style.count}>
                            <button onClick={decrementCount} className={style.plusminusButton}>-</button>
                            <input type="number" value={count} onChange={(e:any) => setCount(e.target.value)} className={style.plusminusBox} />
                            <button onClick={incrementCount} className={style.plusminusButton}>+</button>
                        </div>

                        <button className={style.button}  onClick={() => handleSubmit(wishID, prodID, count)}>
                            Update
                        </button>
                    </div>

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