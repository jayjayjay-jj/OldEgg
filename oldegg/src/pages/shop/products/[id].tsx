import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import style from '@/styles/product/ProductDetail.module.scss';
import Navbar from "@/layout/navbar";
import ShopNavbar from "@/layout/shopNavbar";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import { ThemeContext } from "@/pages/changer/themeChanger";
import getProductByShopStatus from "@/api/get-product-by-shop-status";
import getCookie from "@/util/getCookie";
import JWT from "@/types/JWTToken";
import Authentication from "@/api/authentication";
import User from "@/types/User";
import LowerNavbar from "@/layout/lowerNavbar";
import Link from "next/link";
import WishlistDetail from "@/types/WishlistDetail";
import InsertProductToWishlist from "@/api/insert-product-to-wishlist";
import getSimilarProducts from "@/api/get-similar-products";
import getWishlistByUserId from "@/api/get-wishlist-by-user";
import InsertProductToCart from "@/api/insert-product-to-cart";

const UserDetailPage = () => {
    const router = useRouter();
    const {theme} = useContext(ThemeContext)
    const [product, setProduct] = useState<any>();
    const [products, setProducts] = useState<any>();
    const [wishlists, setWishlists] = useState<any>()

    const [userID, setUserID] = useState()
    const [wishlistID, setWishlistID] = useState()
    const [name, setName] = useState('')
    const [category, setCategory] = useState()
    const [prodID, setProdID] = useState()
    const [user, setUser] = useState<User>();
    const [productID, setProductID] = useState<any>();
    const [shopID, setShopID] = useState<any>()

    const [role, setRole] = useState('')
    const [stock, setStock] = useState()
    const [count, setCount] = useState(0)

    const [isDisplayingWishlists, setIsDisplayingWishlists] = useState(false);

    let message = ""

    useEffect(() => {
        setProductID(router.query.id);

    }, [router.query.id]);

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
                setUserID(user.ID)
            }
        }

        getCurrentUser()
        
    }, [])

    useEffect(() => {
        const get = async () => {
            const response = await getProductByShopStatus(productID)
            
            if(response.length === 0) {
                setProduct("BANNED LMAOOOOOO")
                return;
            }
            
            setProduct(response[0])
            setCategory(response[0].category)
            setProdID(response[0].ID)
        }
        
        get()               

        const getSimilar = async () => {
            const response = await getSimilarProducts(productID, Number(category))
            
            if(response === 404) {
                setProduct("BANNED LMAOOOOOO")
                return;
            }
            
            setProducts(response)
            
        }
        
        getSimilar()
        console.log(products);
        
        
    }, [productID, category])

    useEffect(() => {        
        
        const getWishlishtHeader = async() => {
            setRole(localStorage.getItem('role'))
            
            const response = await getWishlistByUserId(Number(userID));
            // console.log(response);
            

            if(response === 404) {
                alert("Something went wrong!")
            }
            
            setWishlists(response)
            setName(response.wishlist_name)
        }
        getWishlishtHeader()        
        
    }, [userID, wishlists]);

    const handleFormSubmit = async (e:any) => {
        e.preventDefault();

        const newWishlistDetail:WishlistDetail = {
            wishlist_id: Number(wishlistID),
            product_id: Number(product.ID),
            quantity: Number(count),
        }
        
        const response = await InsertProductToWishlist(newWishlistDetail)
        if(response === 404) {
            alert("Error in inserting product to wishlist")
        } else {
            alert("Products successfully inserted to Wishlist!.")
            window.location.reload()
        }        
    }

    const handleCart = async() => {
        const response = await InsertProductToCart(Number(userID), Number(prodID), count);

        if(response === 404) {
            alert("Error in inserting product to cart")
        }

        window.location.reload()
    }

    const goToDetail = (id: Number) => {
        router.push('/shop/products/' + id);
    }

    function incrementCount() {
        let setok = product.stock

        if(count < setok) {
            setCount(count + 1)
        }
    }

    function decrementCount() {
        if(count > 0) {
            setCount(count - 1)
        }
    }

    if (!product || Object.keys(product).length == 0) return <div>Loading ...</div>

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />} 
                <LowerNavbar />
            </header>

            {(product === "BANNED LMAOOOOOO") ? 
            <div className={style.banned}>
                <br></br>
                The product is unavailable due to the banned shop ≡(▔﹏▔)≡
                <br></br>
            </div>
            :  
            <div className={style.bodybody}>
                <div className={style.index}>
                    <div className="left">
                        <img src={product.image} className={style.image}/>
                    </div>

                    <div className={style.right}>
                        <div className={style.name}>
                            {product.name}
                        </div>
                        
                        <div className={style.desc}>
                            {product.description}
                        </div>

                        <div className={style.price}>
                            Rp{product.price}
                        </div>

                        <div className={style.stock}>
                            {(product.stock) ? 
                                <div>
                                    Stock : {product.stock}

                                    {(role == "user") ? 
                                    <div>
                                        <div className={style.count}>
                                            <button onClick={decrementCount} className={style.plusminusButton}>-</button>
                                            <input type="number" value={count} onChange={(e:any) => setCount(e.target.value)} className={style.plusminusBox} />
                                            <button onClick={incrementCount} className={style.plusminusButton}>+</button>
                                        </div>
                                        
                                        <div className={style.buttonBox}>
                                            <button className={style.productButton} onClick={() => setIsDisplayingWishlists(true)}>+ WishList</button>

                                            <form onSubmit={handleCart}>
                                                <button className={style.productButton}>+ Cart</button>
                                            </form>
                                        </div>                                        
                                    </div>
                                    :
                                    <div>
                                        <br></br>
                                        
                                        <button className={style.button}>
                                            <Link href="/" className={style.buttonLink}>Update Product</Link>
                                        </button>
                                    </div>
                                    }
                                </div>
                                :
                                <div className={style.out}>
                                    Out of Stock
                                </div>
                            }
                        </div>                        
                    </div>
                </div>

                {
                    isDisplayingWishlists &&
                    <div className={style.bodybody}>
                        <h1>Wishlists</h1>

                        <form onSubmit={handleFormSubmit}>
                            {
                                <div className={style.card}>
                                    <div className={style.cardName}>
                                        <select className={style.inputField} onChange={(e) => {setWishlistID(e.target.value)}}>
                                        {wishlists.map((wishlist: any) => {
                                            return (
                                                <option value={wishlist.ID}>{wishlist.wishlist_name}</option>
                                            )
                                        })}
                                        </select>
                                    </div>

                                </div>
                            }

                            <div>
                                <button className={style.button} >Add to this wishlist</button>
                            </div>

                            <div>
                                <button className={style.closeButton} onClick={() => setIsDisplayingWishlists(false)}>Close</button>
                            </div>

                        </form>
                    </div>

                }

                <div className={style.body}>
                    <br></br>
                    <div className={style.details}>
                        <div className={style.detailTitle}>
                            Product Details :
                        </div>

                        <br></br>

                        <div>
                            {product.details}
                        </div>
                        <br></br>
                    </div>

                    <div className={style.productIndex}>
                        <div className={style.productCard}>
                            {
                                (products.map((product: any) => {
                                    return (
                                        <div className={style.product}> 
                                            <div>
                                                <img src={product.image} className={style.productImage}/>
                                            </div>

                                            <div className={style.productName} style={{ color: theme.darkBlue_lightBlue }} onClick={() => goToDetail(product.ID)}>
                                                {product.name}
                                            </div>

                                            <div className={style.productPrice} style={{ color: theme.black_white }}>
                                                Rp{product.price}
                                            </div>

                                            <div className={style.productStock} style={{ color: theme.black_white }}>
                                                Stock: {product.stock}
                                            </div>
                                        </div>
                                    )
                                }))
                            }
                        </div>
                    </div>
                </div> 
            </div>
        }

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default UserDetailPage;