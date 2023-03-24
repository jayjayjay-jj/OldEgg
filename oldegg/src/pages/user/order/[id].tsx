import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import LowerNavbar from "@/layout/lowerNavbar";
import Navbar from "@/layout/navbar";
import ShopNavbar from "@/layout/shopNavbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from '@/styles/order/Order.module.scss'
import getCookie from "@/util/getCookie";
import JWT from "@/types/JWTToken";
import Authentication from "@/api/authentication";
import getOrderDetailWithItem from "@/api/get-order-details-w-item";
import getUserOrderReviews from "@/api/get-order-review";

const OrderDetail = () => {
    const [role, setRole] = useState()
    
    let totalPriceTemp = 0
    const [totalPrice, setTotalPrice] = useState(0)

    const [user, setUser] = useState<any>()
    const [userID, setUserID] = useState<any>()
    const [reviewID, setReviewID] = useState<any>()
    const [details, setDetails] = useState<any>()
    const [orders,setOrders] = useState<any>()
    const [products, setProducts] = useState<any>()
    const [addresses, setAddresses] = useState<any>()
    const [deliveries, setDeliveries] = useState<any>()
    const [payments, setPayments] = useState<any>()
    const [reviews, setReviews] = useState<any>()

    const router = useRouter()

    useEffect(() => {
        setReviewID(router.query.id);
    }, [router.query.id]);

    let signIn = 0
    let message = ""

    useEffect(() => {
        setRole(localStorage.getItem('role'))

        const getCurrentUser = async () => {
            const JWT = getCookie("AuthenticationCookie")

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
                setUserID(user.ID)
            }
        }

        getCurrentUser()
    }, [])

    useEffect(() => {
        const getItem = async () => {
            const response = await getOrderDetailWithItem(orderID, userID)

            if(response === 404) {
                alert("hayo")
            }

            setDetails(response.details)
            setOrders(response.orders)
            setProducts(response.products)
            setAddresses(response.addresses)
            setDeliveries(response.deliveries)
            setPayments(response.payments)
        }

        getItem()
    }, [orderID, userID])

    useEffect(() => {
        const getTotalPriceee = () => {
            if(products && details) {
                details.forEach((detail:any, index:Number) => {
                    totalPriceTemp += detail.quantity * products[index].price
                    setTotalPrice(totalPriceTemp)
                })
            }
        }

        getTotalPriceee()

    }, [details, products])

    useEffect(() => {
        const getReview = async () => {
            const response = await getUserOrderReviews(userID, orderID)

            if(response === 404) {
                alert("w")
            }

            setReviews(response)
        }

        getReview()
    }, [orderID, userID])

    return ( 
        <div>
            <header>
                {(role === 'user') ? <Navbar /> : (role === 'shop') ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>

            <div className={style.index}>
                <div className={style.title}>
                    Order {orderID}
                </div>

                <div>
                    {details && details.map((detail: any, index: Number) => {
                        return (
                            <div className={style.card}>
                                <div className={style.heading}>
                                    <div>   
                                        Address: {addresses[index].address_name}
                                    </div>

                                    <div>   
                                        Delivery Method: {deliveries[index].delivery_name}
                                    </div>

                                    <div>   
                                        Payment: {payments[index].payment_name}
                                    </div>
                                </div>

                                <br></br>

                                <div>
                                    Product ID: {detail.product_id}
                                </div>

                                <div>
                                    Product Name: {products[index].name}
                                </div>

                                <div>
                                    Product Quantity Bought: {detail.quantity}
                                </div>

                                <div>
                                    Product Price: Rp{products[index].price}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className={style.title}>
                    Total: Rp{totalPrice}
                </div>

                <div>
                    {reviews && reviews.map((review: any) => {
                        return (
                            <div className={style.comment}>
                                <br></br>
                                Your comment: {review.review_comment}
                            </div>
                        )
                    })}
                </div>
            </div>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default OrderDetail;