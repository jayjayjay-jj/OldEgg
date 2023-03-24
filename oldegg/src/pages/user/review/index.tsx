import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import LowerNavbar from "@/layout/lowerNavbar";
import Navbar from "@/layout/navbar";
import ShopNavbar from "@/layout/shopNavbar";
import { useEffect, useState } from "react";
import style from '@/styles/search/Search.module.scss'
import getCookie from "@/util/getCookie";
import JWT from "@/types/JWTToken";
import Authentication from "@/api/authentication";
import getUserReviews from "@/api/get-user-review";
import { useRouter } from "next/router";

const UserReview = () => {
    const [role, setRole] = useState('')
    const router = useRouter()

    const [user, setUser] = useState<any>()
    const [userID, setUserID] = useState<any>()
    const [reviews, setReviews] = useState<any>()

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
        const getReview = async () => {
            const response = await getUserReviews(userID)

            if(response === 404) {
                alert("w")
            }

            setReviews(response)
        }

        getReview()
    }, [userID])

    const goToDetail = (id: Number) => {
        router.push('/user/review/' + id);
    }

    return ( 
        <div>
            <header>
                {(role === 'user') ? <Navbar /> : (role === 'shop') ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>

            <div className={style.index}>
                <div className={style.title}>
                    Review Page
                </div>

                <div>
                    {reviews && reviews.map((review: any) => {
                        return (
                            <div className={style.card} onClick={() => goToDetail(review.ID)}>
                                {review.review_comment} (Order {review.order_id})
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

export default UserReview;