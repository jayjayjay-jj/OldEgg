import Authentication from "@/api/authentication";
import Footer from "@/layout/footer";
import Navbar from "@/layout/navbar";
import JWT from "@/types/JWTToken";
import User from "@/types/User";
import getCookie from "@/util/getCookie";
import { useContext, useEffect, useState } from "react";
import style from '@/styles/account/AccountSettings.module.scss'
import LowerFooter from "@/layout/lowerFooter";
import { useRouter } from "next/router";
import Link from "next/link";
import { ThemeContext } from "@/pages/changer/themeChanger";
import UpperSetting from "@/pages/components/UpperSetting";
import ShopNavbar from "@/layout/shopNavbar";
import ShopAuthentication from "@/api/shop-authentication";
import Shop from "@/types/Shop";
import getProductByShopNameStock from "@/api/get-products-by-shop-and-stock-paginate";
import GetProductCount from "@/api/get-product-count";
import LowerNavbar from "@/layout/lowerNavbar";
import RectangularInputField from "@/pages/components/RectangularInputField";
import SendNewsletter from "@/api/send-newsletter";

const AccountSettingsPage = () => {
    const[user, setUser] = useState<User>()
    const[shop, setShop] = useState<Shop>()
    const[role, setRole] = useState('');
    
    const[name, setName] = useState('')
    const[count, setCount] = useState()
    const [newsletter, setNewsletter] = useState('')
    const[stock, setStock] = useState('All');
    const[products, setProducts] = useState<any>();
    const[shops, setShops] = useState<any>()
    
    const[page, setPage] = useState(1)
    const[limit, setLimit] = useState(5)
    const[totalPage, setTotalPage] = useState(0)
    
    const router = useRouter() 
    const { theme } = useContext(ThemeContext);

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
                signIn = 0
                alert("Server Error")
            
            } else if(user === "Where is Cookie? 0_0null") {
                message = "Sign In / Register"

            } else {
                signIn = 100
                setUser(user)

            }
        }

        getCurrentUser()
    }, [])

    useEffect(() => {
        const getCurrentShop = async () => {
            
            const JWT = getCookie("AuthenticationCookie")
            setRole(localStorage.getItem("role"))

            const token:JWT = {
                token_string: JWT
            }

            const shop = await ShopAuthentication(token)
            
            if(shop === 404) {
                signIn = 0
                alert("Server Error")
            
            } else if(shop === "Where is Cookie? 0_0null") {
                message = "Sign In / Register"

            } else {
                signIn = 100
                setShop(shop)
                setName(shop.name)
        
            }
        }
        
        getCurrentShop()
    }, [])

    useEffect(() => {
        
        const getProductsPaginate = async() => {         
            
            const response = await getProductByShopNameStock(String(shop?.name), stock, page, limit);            
            
            if(response === 404) {
                alert("Something went wrong!")
            }
            
            if (response.length === 0){
                setProducts(response)
                setPage(page - 1);
                return;
            }
            
            setProducts(response)
            
            const total = Math.ceil(response.length / limit);
            setTotalPage(total);
            
        }
        getProductsPaginate();

        const fetchProductCount = async () => {

            if (shop?.name !== undefined) {
                const response = await GetProductCount(shop?.name)
                setCount(response)
            }

        };

        fetchProductCount()      
        
    }, [shop?.name, stock, page, limit]);

    if (!shop || Object.keys(shop).length == 0) return <div>Loading ...</div>

    const onPrevButtonClicked = () => {

        if (page !== 1) setPage(page - 1); 

    }

    const onNextButtonClicked = () => {

        setPage(page + 1);

    }

    if(products === undefined) {
        return (
            <div>Loading...</div>
        )
    }

    const goToDetail = (id: Number) => {
        router.push('/shop/products/' + id);
    }

    const onFormSubmitted = async (e:any) => {
        e.preventDefault();

        document.cookie = "AuthenticationCookie" + "=; " + "expires= expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        router.push("/")
    }

    const handleNewsletter = async () => {
        const response = await SendNewsletter(newsletter)

        if(response === 404) {
            alert("Error in sending email")
        }
        alert("Newsletter sent successfully")
        router.push("/")
    }

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>

            <div className={style.body} style={{ backgroundColor : theme.white_gray }}>
                {(role == "user") ?
                <div>
                    <UpperSetting />

                    <div className={style.name} style={{ color : theme.black_white }}>
                        {user?.first_name + " " + user?.last_name}
                    </div>

                    <div className={style.card} style={{ backgroundColor : theme.lightBlue_darkBlue }}>
                        <p className={style.pass}>Phone Number: {user?.mobile_phone_number}</p>

                        <button className={style.button}>
                            <Link href='/account/change-phone-number' className={style.buttonLink}>Change Phone Number</Link>
                        </button>
                    </div>

                    <div className={style.card} style={{ backgroundColor : theme.lightBlue_darkBlue }}>
                        Email: {user?.email}
                    </div>

                    <div className={style.card} style={{ backgroundColor : theme.lightBlue_darkBlue }}>
                        Current Amount of Money : Rp{user?.money}
                    </div>

                    <div className={style.card} style={{ backgroundColor : theme.lightBlue_darkBlue }}>
                        <p className={style.pass}>Password: {user?.password}</p>
                        <button className={style.button}>
                            <Link href='/account/confirm-password' className={style.buttonLink}>Change Password</Link>
                        </button>
                    </div>
                    
                    <div className={style.card} style={{ backgroundColor : theme.lightBlue_darkBlue }}>
                        <RectangularInputField required value={newsletter} onChange={setNewsletter} placeholder="Newsletter"/>

                        <button className={style.button} onClick={handleNewsletter}>
                            Send Newsletter
                        </button>
                    </div>

                    <div className={style.card} style={{ backgroundColor : theme.lightBlue_darkBlue }}>
                        <button className={style.button}>
                            <Link href='/account/live-chat' className={style.buttonLink}>Message Center</Link>
                        </button>
                    </div>
                </div>
                :
                <div>
                    <div className={style.bannerCont}>
                        <img src={shop?.image}  className={style.banner}/>
                    </div>

                    <div className={style.outer}>
                        <div className={style.body}>
                            <div>
                                <div className={style.shopName}>
                                    <h1>{shop?.name}</h1>
                                </div>
                            </div> 

                            <div className={style.blanket}>
                                <div className={style.left}>
                                    <div>
                                        Product Count : {count}
                                    </div>

                                    <div>
                                        Current shop status: &nbsp;
                                        {(shop?.status == "Banned") ? "Banned" : "Active"}
                                    </div>
                                </div>
                                

                                <div className={style.right}>
                                    <div>
                                        <select id="categories" onChange={(e) => {setStock(e.target.value)}} className={style.selection}>
                                            <option value="All">All</option>
                                            <option value="Available">Available</option>
                                            <option value="Out of Stock">Out of Stock</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className={style.index}>
                                <button className={style.button}>
                                    <Link href='/account/change-shop-personal' className={style.buttonLink}>Update Shop Name and Picture</Link>
                                </button>
                            </div>
                        </div>

                        <div className={style.productIndex}>
                            {
                                (products.length === 0) ? "No products" : 
                                Array.isArray(products) && products !== undefined && 
                                products.map((product: any) => {
                                    return (
                                        <form className={style.productCard} style={{ backgroundColor : theme.white_gray }}>
                                            <div className={style.product}> 
                                                <div>
                                                    <img src={product.image} className={style.image}/>
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
                                        </form>
                                )})
                            }
                        </div>
                    </div>

                    <div className={style.paginateButton}>
                        <button className={style.pageButton} onClick={onPrevButtonClicked} style={{ backgroundColor : theme.gray_white }}>Prev</button>
                        <button className={style.pageButton} onClick={onNextButtonClicked} style={{ backgroundColor : theme.gray_white }}>Next</button>
                    </div>
                </div>
            }

                <form onSubmit={onFormSubmitted}>
                    <div className={style.logout}>
                        <button className={style.button}>Log Out</button>
                    </div>
                </form>
            </div>

            <Footer />

            <LowerFooter />
        </div>
    );
}

export default AccountSettingsPage;