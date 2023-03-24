import Authentication from "@/api/authentication";
import getOrderById from "@/api/get-order-by-id";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import LowerNavbar from "@/layout/lowerNavbar";
import Navbar from "@/layout/navbar";
import ShopNavbar from "@/layout/shopNavbar";
import JWT from "@/types/JWTToken";
import getCookie from "@/util/getCookie";
import { useEffect, useState } from "react";
import style from '@/styles/order/Order.module.scss'
import UpdateOrderStatus from "@/api/update-order-status";
import getAllOrder from "@/api/get-all-order";
import ShopAuthentication from "@/api/shop-authentication";
import { useRouter } from "next/router";

const OrderPage = () => {
    const [role, setRole] = useState('')
    const [orderStatus, setOrderStatus] = useState('')
    const [userID, setUserID] = useState()
    const [status, setStatus] = useState('all')

    const [user, setUser] = useState<any>()
    const [shop, setShop] = useState<any>()
    const [orderId, setOrderId] = useState<any>()
    const [userOrder, setUserOrder] = useState<any>()
    const [shopOrder, setShopOrder] = useState<any>()
    const [details, setDetails]= useState<any>()
    const [products, setProducts] = useState<any>()

    const router = useRouter()

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
            }
        }
        getCurrentUser()    

        const getCurrentShop = async () => {
            
            const JWT = getCookie("AuthenticationCookie")
            setRole(localStorage.getItem("role"))

            const token:JWT = {
                token_string: JWT
            }

            const shop = await ShopAuthentication(token)
            
            if(shop === 404) {
                alert("Server Error")
            
            } else if(shop === "Where is Cookie? 0_0null") {
                alert("No cookie")

            } else {
                setShop(shop)
            }
        }
        
        getCurrentShop()
        
        const getUserOrder = async() => {
            
            const response = await getOrderById(Number(userID), status)
            
            if(response === 404) {
                alert("neng ngong")
            }

            if(userOrder === undefined) {
                setUserOrder(response)
                setOrderId(response.ID)     
            }
            
            setUserOrder(response)
            setOrderId(response.ID)
        }
        getUserOrder()        

        const getShopOrder = async() => {         
            console.log(status);
            
            const response = await getAllOrder(status)
            console.log(response);
            
            if(response === 404) {
                alert("ngong neng")
            }

            if(shopOrder === undefined) {
                setShopOrder(response)
                setOrderId(response.ID)
            }

            setShopOrder(response)
            setOrderId(response.ID)

        }
        getShopOrder()        
        
    }, [userID, status, shopOrder])

    const handleUpdateStatus = async (id: Number) => {
        alert(id)

        const updateStatus = async() => {
            const response = await UpdateOrderStatus(id)

            if(response === -1) {
                alert("awodkxoakodkawo")
            }
        }

        updateStatus()
        window.location.reload()
    }

    const goToDetail = (id: Number) => {
        router.push('/user/order/' + id);
    }

    if(!userOrder || !details || !products) <div>Loading...</div>

    return ( 
        <div> 
            <header>
                {(role === 'user') ? <Navbar /> : (role === 'shop') ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>

            <div className={style.index}>
                {(role === 'user') ?
                    <div>
                        <div className={style.title}>
                            My Order(s)
                        </div>

                        <div className={style.selectCont}>
                            <select id="status" onChange={(e) => {setStatus(e.target.value)}} className={style.selection}>
                                <option value="all">All</option>
                                <option value="open">Open</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="finished">Finished</option>
                            </select>
                        </div>

                        {userOrder && userOrder.map((order: any) => {
                            return (
                                <div className={style.card}>
                                    <div className={style.cardName} onClick={() => goToDetail(order.ID)}>
                                        Order Id : {order.ID}
                                    </div>

                                    <div>
                                        Order Status : {order.status}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                :
                    <div className={style.index}>
                        <div className={style.title}>
                            All Order(s)
                        </div>

                        <div className={style.selectCont}>
                            <select id="status" onChange={(e) => {setStatus(e.target.value)}} className={style.selection}>
                                <option value="all">All</option>
                                <option value="open">Open</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="finished">Finished</option>
                            </select>
                        </div>

                        {shopOrder && shopOrder.map((order: any) => {
                            return (
                                <div className={style.card}>
                                    <div className={style.cardName}>
                                        Order Id : {order.ID}
                                    </div>

                                    <div>
                                        Order Status : {order.status}
                                    </div>

                                    {(order.status === 'open') ?
                                        <button className={style.noteButton} onClick={() => handleUpdateStatus(order.ID)}>Mark as Done</button>
                                    :(order.status === 'cancelled') ?
                                        <div></div>
                                    :
                                        <div></div>
                                    } 
                                </div>
                            )
                        })}
                    </div>
                }
            </div>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default OrderPage;