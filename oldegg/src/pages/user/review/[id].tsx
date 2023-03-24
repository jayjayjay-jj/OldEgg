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
import getReviewDetail from "@/api/get-review-detail";
import { useRouter } from "next/router";
import UpdateReview from "@/api/update-review-detail";
import RectangularInputField from "@/pages/components/RectangularInputField";

const UserReview = () => {
    const [role, setRole] = useState('')

    const [deliv, setDeliv] = useState(0)
    const [prod, setProd] = useState(0)
    const [service, setService] = useState(0)
    const [comment, setComment] = useState('')

    const [user, setUser] = useState<any>()
    const [userID, setUserID] = useState<any>()
    const [reviews, setReviews] = useState<any>()
    const [reviewID, setReviewID] = useState<any>()
    const [reviewUser, setReviewUser] = useState<any>()

    const router = useRouter()

    let signIn = 0
    let message = ""

    useEffect(() => {
        setReviewID(router.query.id);
    }, [router.query.id]);

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
            const response = await getReviewDetail(reviewID)

            if(response === 404) {
                alert("w")
            }

            setReviews(response)
        }

        getReview()

    }, [reviewID])

    const handleSubmit = async() => {
        const response = await UpdateReview(reviewID, Number(deliv), Number(prod), Number(service), comment)

        if(response === 404) {
            alert("wong")
        }

        alert("Review Updated")
        window.location.reload()
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
                            <div className={style.card}>
                                <div>
                                    Review ID: {reviewID}
                                </div>

                                <div>
                                    Review Delivery: {review.review_delivery}/5
                                </div>

                                <div>
                                    Review Product: {review.review_product}/5
                                </div>

                                <div>
                                    Review Service: {review.review_service}/5
                                </div>

                                <div>
                                    Review Comment: {review.review_comment}
                                </div>

                                {(userID === review.user_id) ? 
                                    <div>
                                        <div className={style.form}>
                                            <div>
                                                <br></br>
                                                Update Review ID {reviewID}
                                            </div>

                                            <RectangularInputField required value={deliv} onChange={setDeliv} placeholder='Review Delivery' />

                                            <RectangularInputField required value={prod} onChange={setProd} placeholder='Review Product' />

                                            <RectangularInputField required value={service} onChange={setService} placeholder="Review Service" />

                                            <RectangularInputField required value={comment} onChange={setComment} placeholder="Review Comment" />

                                            <button onClick={() => handleSubmit(review?.ID)} className={style.button}>
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                :
                                    <div></div>
                                }
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