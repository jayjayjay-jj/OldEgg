import Authentication from '@/api/authentication'
import getCartByUserId from '@/api/get-cart-by-user-'
import getWishlistByUserId from '@/api/get-wishlist-by-user'
import ShopAuthentication from '@/api/shop-authentication'
import JWT from '@/types/JWTToken'
import getCookie from '@/util/getCookie'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import style from '@/styles/layout/LowerNavbar.module.scss'
import ShowAllCategories from '@/api/show-all-categories'
import { ThemeContext } from '@/pages/changer/themeChanger'

export default function LowerNavbar() {
    let signIn = 0
    let message = ""
    let totalPriceTemp = 0

    const [role, setRole] = useState('')
    const [userID, setUserID] = useState()
    const [name, setName]= useState('')
    const [isCalculated, setIsCalculated] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)

    const [user, setUser] = useState<any>()
    const [shop, setShop] = useState<any>()
    const [carts, setCarts] = useState<any>()
    const [wishlists, setWishlists] = useState<any>()
    const [products, setProducts] = useState<any>()
    const [categories, setCategories] = useState<any>()

    const {theme} = useContext(ThemeContext)

    useEffect(() => {
        setRole(localStorage.getItem('role'))

        const getCurrentUser = async () => {
            const JWT = getCookie("AuthenticationCookie")
            // console.log(JWT)
    
            const token:JWT = {
                token_string: JWT
            }
    
            // console.log(JWT)
            const user = await Authentication(token)
            
            if(user === 404) {
                signIn = 0
                alert("Server Error")
            
            } else if(user === "Where is Cookie? 0_0null") {
                message = "Sign In / Register"
    
            } else {
                signIn = 100
                setUser(user)
                setUserID(user.ID)
    
            }
        }
    
        getCurrentUser()
    
        const getCurrentShop = async () => {
            const JWT = getCookie("AuthenticationCookie")
    
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
    
            }
        }
    
        getCurrentShop()
    }, [])

    useEffect(() => {        
    
        const getCart = async() => {            
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

    useEffect(() => {
        const getAllCategories = async() => {
            const response = await ShowAllCategories();
        
            if(response === 404) {
                alert("Something went wrong!")
            }
        
            setCategories(response)
        }
    
        getAllCategories()
    }, [])

    return (
        <div className={style.index}>
            <div className={style.lowerUpper}>
                <button className={style.button}>
                    <Link className={style.buttonLink} href='/user/public-wishlist/all-wishlist'>Public Wishlist</Link>
                </button>

                <button className={style.button}>
                    <Link className={style.buttonLink} href='/user/wishlist'>My Wishlist</Link>
                </button>

                <button className={style.button}>
                    <Link className={style.buttonLink} href='/user/followed-wishlist'>Followed Wishlist</Link>
                </button>

                <button className={style.button}>
                    <Link className={style.buttonLink} href='/user/cart'>Cart</Link>
                </button>

                <button className={style.button}>
                    <Link className={style.buttonLink} href='/user/save-later'>Save for Later</Link>
                </button>

                <button className={style.button}>
                    <Link className={style.buttonLink} href='/user/order'>Order Page</Link>
                </button>

                <button className={style.button}>
                    <Link className={style.buttonLink} href='/user/search'>Search Page</Link>
                </button>

                {(role === 'user') ?  
                    <button className={style.button}>
                        <Link className={style.buttonLink} href='/user/review'>Review Page</Link>
                    </button>
                    :
                (role === 'shop') ?
                    <button className={style.button}>
                        <Link className={style.buttonLink} href='/shop/shop-review'>Review Page</Link>
                    </button>
                    :
                    <button className={style.button}>
                        <Link className={style.buttonLink} href='/user/review'>Review Page</Link>
                    </button>
                }

                <button className={style.button}>
                    <Link className={style.buttonLink} href='/user/build-pc'>Build PC</Link>
                </button>
            </div>

            <div className={style.lowerLower}>
                <div className={style.categories}>
                {
                    categories && categories.map((category: any) => {
                        return (
                            <div className={style.categoryCard} style={{ backgroundColor: theme.lightBlue_darkBlue }}>
                            {category.category_name}
                        </div>
                        )
                    })
                }
                </div>

                {(role === 'user') ?
                    <div className={style.text}>
                        Cart: Rp{totalPrice}
                    </div>
                :
                    <div></div>
                }
            </div>
        </div>
    )
}
