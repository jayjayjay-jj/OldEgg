import getProductById from "@/api/get-product-by-id";
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

const UserDetailPage = () => {
    const router = useRouter();
    const {theme} = useContext(ThemeContext)
    const [product, setProduct] = useState<any>();
    const [user, setUser] = useState<User>();

    const [productID, setProductID] = useState<any>();
    const [shopID, setShopID] = useState<any>()

    const [role, setRole] = useState('')
    const [stock, setStock] = useState()
    const [count, setCount] = useState(0)

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
            console.log(product);
        }
        
        get()
    }, [productID])

    function incrementCount() {
        let stock = product.stock

        if(count < stock) {
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
                        {user.ID}
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

                                    <div className={style.count}>
                                        <button onClick={decrementCount} className={style.plusminusButton}>-</button>
                                        <input type="number" value={count} onChange={(e:any) => setCount(e.target.value)} className={style.plusminusBox} />
                                        <button onClick={incrementCount} className={style.plusminusButton}>+</button>
                                    </div>

                                    <div className={style.buttonBox}>
                                        <button className={style.productButton}>+ WishList</button>
                                        <button className={style.productButton}>+ Cart</button>
                                    </div>
                                </div>
                                :
                                <div className={style.out}>
                                    Out of Stock
                                </div>
                            }
                        </div>                        
                    </div>
                </div>
            
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

                    <div>
                        <br></br>
                        asd
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