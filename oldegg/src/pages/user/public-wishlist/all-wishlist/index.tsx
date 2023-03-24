import Authentication from "@/api/authentication";
import ShowPublicWishlistPaginate from "@/api/show-public-wishlists-paginate";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import LowerNavbar from "@/layout/lowerNavbar";
import Navbar from "@/layout/navbar";
import ShopNavbar from "@/layout/shopNavbar";
import { ThemeContext } from "@/pages/changer/themeChanger";
import style from '@/styles/wishlist/WishlistHeader.module.scss'
import JWT from "@/types/JWTToken";
import getCookie from "@/util/getCookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const ViewAllWishlists = () => {
    const[user, setUser] = useState<any>()

    const[wishlistID, setWishlistID] = useState()

    const[wishlistUsers, setWishlistUsers] = useState<any>()
    const[wishlists, setWishlists] = useState<any>()
    const[role, setRole] = useState('')

    const[page, setPage] = useState(1)
    const[limit, setLimit] = useState(15)
    const[totalPage, setTotalPage] = useState(0)

    const router = useRouter()
    const{theme} = useContext(ThemeContext)

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

            }
        }
    }, []);

    useEffect(() => {
        setRole(localStorage.getItem('role'))

        const getWishlistPaginate = async() => {
            const response = await ShowPublicWishlistPaginate(page, limit);

            if(response === 404) {
                alert('Something went wrong')
            }

            if(response.length === 0) {
                setPage(page-1);
                return;
            }

            setWishlists(response.wishlists)
            console.log(response.wishlists);
            
            setWishlistUsers(response.users)
            console.log(response.users);

            const total = Math.ceil(response.length / limit)
            setTotalPage(total)
        }

        getWishlistPaginate()
        
    }, [page, limit])

    const goToDetail = (id: Number) => {
        router.push('/user/wishlist/' + id);
    }

    const onPrevButtonClicked = () => {
        if (page !== 1) setPage(page - 1); 
    }

    const onNextButtonClicked = () => {
        setPage(page + 1);
    }

    if(!wishlists) return <div>Loading...</div>

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header> 
            
            <div>
                <div className={style.index}>
                    <div className={style.title}>
                        Public Wishlist
                    </div>

                    <div className={style.rightSelection}>
                        <select id="pages" onChange={(e) => {setLimit(e.target.value)}} className={style.selection}>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="60">60</option>
                            <option value="90">90</option>
                        </select>
                    </div>

                    {  
                        wishlists.map((wishlist: any, index: Number) => {
                            return (
                                <div className={style.card} style={{ backgroundColor : theme.lightBlue_darkBlue }}>
                                    <div className={style.cardName} onClick={() => goToDetail(wishlist.wishlist_id)}>
                                        {wishlist.wishlist_name}
                                    </div>

                                    <div className={style.carStatus}>
                                        Status: {wishlist.wishlist_status}
                                    </div>

                                    <div className={style.carStatus}>
                                        Owner: {wishlistUsers[index].first_name} {wishlistUsers[index].last_name}
                                    </div>

                                    {/* <button className={style.button}>
                                        <Link href={"/user/wishlist/update-wishlist-header/" + wishlist.ID} className={style.buttonLink}>Update Wishlist</Link>
                                    </button> */}
                                </div>
                            ) 
                        }
                    )}

                    <div className={style.paginateButton}>
                        <button className={style.paginate} onClick={onPrevButtonClicked} style={{ backgroundColor : theme.gray_white }}>Prev</button>

                        <div style={{ color : theme.black_white }}>
                            {page}
                        </div>

                        <button className={style. paginate} onClick={onNextButtonClicked} style={{ backgroundColor : theme.gray_white }}>Next</button>
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

export default ViewAllWishlists;