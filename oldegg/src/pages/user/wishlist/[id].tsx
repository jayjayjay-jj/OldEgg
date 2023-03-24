import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import Navbar from "@/layout/navbar";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import style from '@/styles/wishlist/WishlistHeader.module.scss'
import getWishlistHeaderById from "@/api/get-wishlist-by-id";
import { ThemeContext } from "@/pages/changer/themeChanger";
import Link from "next/link";
import getWishlistDetails from "@/api/get-wishlist-by-header";
import getCookie from "@/util/getCookie";
import JWT from "@/types/JWTToken";
import Authentication from "@/api/authentication";
import LowerNavbar from "@/layout/lowerNavbar";
import ShopNavbar from "@/layout/shopNavbar";
import DeleteWishlistDetails from "@/api/delete-wishlist-details";
import RectangularInputField from "@/pages/components/RectangularInputField";
import UpdateWishlistNote from "@/api/update-wishlist-note";

const ShopDetailPage = () => {
    const router = useRouter();
    const {theme} = useContext(ThemeContext)
    const [count, setCount] = useState(0)
    const [role, setRole] = useState('')

    const [userID, setUserID] = useState()
    const [productID, setProductID] = useState()
    const [note, setNote] = useState('')
    const [wishlistNote, setWishlistNote] = useState('')

    const [user, setUser] = useState<any>();
    const [header, setHeader] = useState<any>()
    const [wishlistID, setWishlistID] = useState<any>();
    const [wishlist, setWishlist] = useState<any>();
    const [wishlistProducts, setWishlistProducts] = useState<any>()
    const [wishlistDetails, setWishlistDetails] = useState<any>()
    
    useEffect(() => {
        setWishlistID(router.query.id);
    }, [router.query.id]);

    let message = ""
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
                message = "Sign In / Register"

            } else {
                setUser(user)

            }
        }

        getCurrentUser()        
    }, [])

    useEffect(() => {
        setRole(localStorage.getItem("role"))

        const get = async () => {

            const response = await getWishlistHeaderById(wishlistID);
            console.log(response);

            setWishlist(response);    
            setUserID(response.user_id)    
            setWishlistNote(response.notes)    
        }

        get(); 
        

        const getDetails = async () => {
            const response = await getWishlistDetails(wishlistID);
            console.log(response.products);
            console.log(response.details);
            
            setWishlistProducts(response.products)
            setWishlistDetails(response.details)
        }

        getDetails()         
        
        
    }, [wishlistID, userID]);

    const handleUpdateRedirect = (index: Number, productID: Number) => {
        console.log(wishlistDetails[index].wishlist_id);
        
        router.push({
            pathname: "/user/wishlist/update-wishlist-detail/" + wishlistDetails[index].wishlist_id,
            query: {
                wishID: Number(wishlistDetails[index].wishlist_id),
                productID: productID
            }
        })
    }

    const handleDelete = (index: Number, productID: Number) => {
        console.log(wishlistDetails[index].wishlist_id);
        console.log(productID);
        
        
        const getDelete = async () => {
            const response = await DeleteWishlistDetails(wishlistDetails[index].wishlist_id, productID);
            console.log(response);
            
            if(response === 404) {
                alert("Something went wrong")
            } else {
                alert("Delete item succesfull")
                window.location.reload()
            }
        }

        getDelete()
    }

    const handleNote = () => {
        const updateNote = async() => {
            const response = await UpdateWishlistNote(wishlistID, note);
            console.log(response);

            if(response === 404) {
                alert("Something went wrong")
            } 

            alert("Node added")
            window.location.reload()
        }

        updateNote()
    }

    if (!wishlistDetails || !wishlist || Object.keys(wishlist).length == 0) return <div>Loading ...</div>

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>

            <div className={style.index}>
                <div className={style.outer}>
                    <div className={style.cardName}>
                        {wishlist.wishlist_name}
                    </div>

                    <div className={style.cardStatus}>
                        Status: {wishlist.wishlist_status}
                    </div>

                    {(wishlistNote) ? <div>Wishlist note = {wishlistNote}</div> : <div></div>}

                    <button className={style.button}>
                        <Link href={"/user/wishlist/update-wishlist-header/" + wishlistID} className={style.buttonLink}>Update Wishlist</Link>
                    </button>
                </div>
                
                <div className={style.detailIndex}>
                {
                    (wishlistProducts.map((wishlist :any, index: Number) => {
                        return (
                            <div className={style.details} style={{ backgroundColor: theme.lightBlue_darkBlue}}>
                                <div className={style.left}> 
                                    <div>
                                        <img src={wishlist.image} className={style.detailImage}/>
                                    </div>
                                </div>
                                
                                <div className={style.mid}>
                                    <div className={style.detailName}>
                                        {wishlist.name}
                                    </div>

                                    <div className={style.detailPrice}>
                                        Rp{wishlist.price}
                                    </div>

                                    <div className={style.detailQuantity}>
                                        Wishlist Quantity: {wishlistDetails[index].quantity}
                                    </div>
                                </div>

                                {(userID === user.ID) ? 
                                    <div className={style.right}>

                                        <div>
                                            <button className={style.button} onClick={(e) => handleUpdateRedirect(index, wishlist.ID)}>
                                                Update
                                            </button>
                                        </div>

                                        <div>
                                            <button className={style.button} onClick={(e) => handleDelete(index, wishlist.ID)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                    </div>
                                }
                            </div>
                        )
                    }))
                }
                </div>

                <div className={style.notes}>
                    {(wishlistNote === "") ?
                        <div>
                            <form onSubmit={handleNote}>
                                <div className={style.noteTitle}>
                                    Add Note
                                </div>

                                <RectangularInputField required value={note} onChange={setNote} placeholder="Add Note" />

                                <div>
                                    <button className={style.noteButton}>Add Note</button>
                                </div>
                            </form>
                        </div>
                    :
                        <div>
                            <div className={style.noteTitle}>
                                Wishlist Note
                            </div>

                            {wishlistNote}
                        </div>
                    }
                </div>
            </div>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default ShopDetailPage;