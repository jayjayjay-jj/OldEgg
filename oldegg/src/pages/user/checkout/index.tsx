import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import LowerNavbar from "@/layout/lowerNavbar";
import Navbar from "@/layout/navbar";
import ShopNavbar from "@/layout/shopNavbar";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import style from '@/styles/checkout/Checkout.module.scss'
import getAddressByUserId from "@/api/get-addresses-by-user";
import getCookie from "@/util/getCookie";
import JWT from "@/types/JWTToken";
import Authentication from "@/api/authentication";
import ShowAllDeliveryProviders from "@/api/show-all-delivery-providers";
import ShowAllPaymentMethods from "@/api/get-all-payment-methods";
import getCartByUserId from "@/api/get-cart-by-user-";
import { ThemeContext } from "@/pages/changer/themeChanger";
import { useRouter } from "next/router";
import Checkout from "@/api/insert-cart-to-order";
import UpdateUserMoney from "@/api/update-user-money";

const CheckoutPage = () => {
    const [userID, setUserID] = useState()
    const [preMoney, setProMoney] = useState()
    const [userMoney, setUserMoney] = useState()
    const [address, setAddress] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)
    const [isCalculated, setIsCalculated] = useState(false)
    const [provider, setProvider] = useState()
    const [payment, setPayment] = useState()
    const [status, setStatus] = useState('open')

    const [user, setUser] = useState<any>()
    const [role, setRole] = useState('')
    const router = useRouter()
    const {theme} = useContext(ThemeContext)

    const [addresses, setAddresses] = useState<any>()
    const [providers, setProviders] = useState<any>()
    const [payments, setPayments] = useState<any>()
    const [carts, setCarts] = useState<any>()
    const [products, setProducts] = useState<any>()

    let totalPriceTemp = 0

    useEffect(() => {
        setRole(localStorage.getItem('role'))

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
                setProMoney(user.money)
            }
        }
        getCurrentUser()        

        const getUserAddreses = async () => {
            const response = await getAddressByUserId(Number(userID))

            if(response === 404) {
                alert("Something went wrong")
            }

            setAddresses(response)
        }

        getUserAddreses()

        const getAllProviders = async () => {
            const response = await ShowAllDeliveryProviders()

            if(response === 404) {
                alert("Something weng wong 2")
            }

            setProviders(response)
        }

        getAllProviders()

        const getAllPayments = async () => {
            const response = await ShowAllPaymentMethods()

            if(response === 404) {
                alert("Something weng wong 3")
            }

            setPayments(response)
        }

        getAllPayments()        

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

    }, [userID]);

    useEffect(() => {
        const getTotalPriceee = () => {
            if(products && carts) {
                carts.forEach((cart:any, index:Number) => {
                    totalPriceTemp += cart.quantity * products[index].price
                    setTotalPrice(totalPriceTemp)
                })
                setIsCalculated(true)
            }
        }

        getTotalPriceee()

    }, [carts, products])

    useEffect(() => {
        console.log(preMoney);
        setUserMoney(preMoney)

        if(payment === '2') {

            let finalCurr = 0            
            finalCurr = preMoney - totalPrice
            console.log(finalCurr);
            setUserMoney(finalCurr)

        } else if(payment === '1') {

            let finalCurr = 0
            finalCurr = preMoney
            console.log(finalCurr);
            setUserMoney(finalCurr)

        }         
        console.log(userMoney);
        
    }, [payment, totalPrice])

    const handleInsert = async () => {
        if(preMoney < totalPrice) {
            alert("Not enough money la")
        }        

        const response = await Checkout(Number(userID), Number(address), Number(provider), Number(payment), status, carts)      
        
        if(response === 404) {
            alert("Checkout failed")
        }

        
        const responseUser = await UpdateUserMoney(Number(userID), Number(userMoney))
        
        if(responseUser === 404) {
            alert("Moneymoney")
        }
        
        alert("Successfull checkout!")
        router.push("/")
    }

    if(!addresses) <div>Loading...</div>

    return ( 
        <div>
            <header>
                {(role === 'user') ? <Navbar /> : (role === 'shop') ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>

            <div className={style.index}>
                <div className={style.title}> 
                    Checkout Page
                </div>

                <div className={style.address}>
                    <div className={style.topAddress}>
                        <div className={style.text}>
                            Address&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                        </div>

                        <div>
                            <select className={style.inputField} onChange={(e) => {setAddress(e.target.value)}}>
                                {addresses && addresses.map((address:any) => {
                                    return (
                                        <option value={address.ID}>{address.address_name}</option>
                                    )
                                    })}
                            </select>
                        </div>
                    </div>
                        
                    <div className={style.lowerButton}>
                        <button className={style.button}>
                            <Link className={style.buttonLink} href='/user/checkout/address'>Manage Address</Link>
                        </button>
                    </div>
                </div>

                <br />

                <div className={style.topAddress}>
                    <div className={style.text}>
                        Delivery Provider&nbsp;&nbsp;&nbsp;: 
                    </div>

                    <div>
                        <select className={style.inputField} onChange={(e) => {setProvider(e.target.value)}}>
                            {providers && providers.map((provider:any) => {
                                return (
                                    <option value={provider.ID}>{provider.delivery_name}</option>
                                )
                                })}
                        </select>
                    </div>
                </div>

                <div className={style.topAddress}>
                    <div className={style.text}>
                        Payment Method&nbsp;&nbsp;&nbsp;: 
                    </div>

                    <div>
                        <select className={style.inputField} onChange={(e) => {setPayment(e.target.value)}}>
                            {payments && payments.map((payment:any) => {
                                return (
                                    <option value={payment.ID}>{payment.payment_name}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>

                <div className={style.cardOuter}>
                {
                    carts && carts.map((cart: any, index: Number) => {
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
                                            Price per item: {products[index].price}
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

                <div className={style.topAddress}>
                    <div className={style.text}>
                        Currect Currency&nbsp;&nbsp;&nbsp;: 
                    </div>

                    <div className={style.text}>
                        Rp{userMoney}
                    </div>
                </div>

                <div className={style.topAddress}>
                    <div className={style.text}>
                        Total Order Cost&nbsp;&nbsp;&nbsp;: 
                    </div>

                    <div className={style.text}>
                        Rp{totalPrice}
                    </div>
                </div>

                <div>
                    <button className={style.button} onClick={handleInsert}>
                        Checkout
                    </button>
                </div>
            </div>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default CheckoutPage;