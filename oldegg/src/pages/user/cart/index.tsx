import Authentication from "@/api/authentication";
import DeleteCartItem from "@/api/delete-cart-item";
import getCartByUserId from "@/api/get-cart-by-user-";
import getWishlistByUserId from "@/api/get-wishlist-by-user";
import InsertCartToLater from "@/api/insert-cart-to-list";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import LowerNavbar from "@/layout/lowerNavbar";
import Navbar from "@/layout/navbar";
import ShopNavbar from "@/layout/shopNavbar";
import { ThemeContext } from "@/pages/changer/themeChanger";
import style from '@/styles/cart/Cart.module.scss'
import JWT from "@/types/JWTToken";
import getCookie from "@/util/getCookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const ViewAllCart = () => {
    const[userID, setUserID] = useState()
    const[wishlistID, setWishlistID] = useState()
    const[name, setName] = useState('')

    const[count, setCount] = useState(0)
    const[user, setUser] = useState<any>()
    const[carts, setCarts] = useState<any>()
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
    
        const getCart = async() => {
            setRole(localStorage.getItem('role'))
            
            const response = await getCartByUserId(Number(userID));

            if(response === 404) {
                alert("Something went wrong!")
            }

            setCarts(response.carts)
            setProducts(response.products)
            
        }

        getCart()

        const getWishlishtHeader = async() => {
            setRole(localStorage.getItem('role'))
            
            const response = await getWishlistByUserId(Number(userID));
        
            if(response === 404) {
                alert("Something went wrong!")
            }
            
            setWishlists(response)
            setName(response.wishlist_name)
        }
        getWishlishtHeader() 

    }, [userID]);

    useEffect(() => {

        if(products && carts) {
            carts.forEach((cart:any, index:Number) => {
                totalPriceTemp += cart.quantity * products[index].price
                setTotalPrice(totalPriceTemp)
            })
            setIsCalculated(true)
        }
    }, [carts, products])

    const goToDetail = (id: Number) => {
        router.push('/user/wishlist/' + id);
    }

    const handleUpdateRedirect = (index: Number, productID: Number) => {        
        router.push({
            pathname: "/user/cart/update-cart-detail/" + carts[index].cart_id,
            query: {
                cartId: Number(carts[index].cart_id),
                productID: productID
            }
        })
    }

    const handleSaveItem = async (userID: Number, productID: Number, quantity: Number, cartId: Number) => {
        const insertResponse = await InsertCartToLater(userID, productID, quantity)

        if(insertResponse === 404) {
            alert("Something went wrong")
        }

        const deleteResponse = await DeleteCartItem(cartId, productID)

        if(deleteResponse === 404) {
            alert("Something went wrong")
        }

        window.location.reload()
    }

    const handleFormSubmit = async () => {
        console.log(carts.id);
        console.log(products.id);
        console.log(carts.quantity);

        // const newWishlistDetail:WishlistDetail = {
            // wishlist_id: Number(wishlistID),
            // // product_id: Number(product.ID),
            // quantity: Number(count),
        // }
        
        // const response = await InsertProductToWishlist(newWishlistDetail)
        // if(response === 404) {
        //     alert("Error in inserting product to wishlist")
        // } else {
        //     alert("Products successfully inserted to Wishlist!.")
        //     window.location.reload()
        // }        
    }

    if(!carts || !user.ID || !userID) return <div>Loading...</div>

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>
            
            <div>
                <div className={style.index}>
                    <div className={style.title}>
                        My Cart
                    </div>

                    {
                        carts.map((cart: any, index: Number) => {
                            return (
                                <div className={style.card} style={{ backgroundColor : theme.lightBlue_darkBlue }}>
                                        <div className={style.left}>
                                            <div className={style.name}>
                                                {products[index].name}
                                            </div>

                                            <div className={style.carStatus}>
                                                Quantity: {cart.quantity}
                                            </div>

                                            <div>
                                                Price: {products[index].price}
                                            </div>

                                            <div className={style.lowerButton}>
                                                <button className={style.button} onClick={(e) => handleUpdateRedirect(index, cart.ID)}>
                                                    Update Cart
                                                </button>

                                                <button className={style.button} onClick={(e) => {handleSaveItem(userID, products[index].ID, cart.quantity, cart.ID)}}>
                                                    Save item for later
                                                </button>   

                                            </div>
                                        </div>

                                        <div className={style.right}>
                                            Total: Rp{cart.quantity * products[index].price}
                                        </div>
                                </div>
                            )
                        }
                    )}
                </div>
                        
                <div className={style.card}>
                    <div className={style.bottom}>
                        <button className={style.button} onClick={() => setIsDisplayingWishlists(true)}>+ WishList</button>

                        {
                            isDisplayingWishlists &&
                            <div className={style.bodybody}>
                                <form onSubmit={handleFormSubmit}>
                                {
                                    <div className={style.cardName}>
                                        <select className={style.inputField} onChange={(e) => {setWishlistID(e.target.value)}}>
                                        {wishlists.map((wishlist: any) => {
                                            return (
                                                <option value={wishlist.ID}>{wishlist.wishlist_name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                }

                                    <div className={style.bodybody}>
                                        <button className={style.addButton} >Add to this wishlist</button>
                                    </div>

                                    <div className={style.bodybody}>
                                        <button className={style.closeButton} onClick={() => setIsDisplayingWishlists(false)}>Close</button>
                                    </div>
                                </form>
                            </div>
                        }

                        <button className={style.button}>
                            <Link className={style.buttonLink} href='/user/checkout'>Checkout</Link>
                        </button>
                    </div>

                    <div className={style.price}>
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

export default ViewAllCart;