import getShopById from "@/api/get-shop-by-id";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import Navbar from "@/layout/navbar";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import style from '@/styles/wishlist/WishlistHeader.module.scss'
import getWishlistHeaderById from "@/api/get-wishlist-by-id";
import { ThemeContext } from "@/pages/changer/themeChanger";
import UpdateWishlistHeader from "@/api/update-wishlist-header";

const ShopDetailPage = () => {
    const router = useRouter();
    const {theme} = useContext(ThemeContext)

    const [name, setName] = useState("")
    const [status, setStatus] = useState("public")
    const [wishlistID, setWishlistID] = useState<any>();
    const [wishlist, setWishlist] = useState<any>();
    
    useEffect(() => {
        setWishlistID(router.query.id);
    }, [router.query.id]);

    useEffect(() => {

        const get = async () => {
            const response = await getWishlistHeaderById(wishlistID);

            setWishlist(response);            
        }

        get();
        
    }, [wishlistID]);

    const handleSubmit = async () => {

        const response = await UpdateWishlistHeader(wishlistID, name, status);

        if (response == 404) alert("Something Went Wrong");
        else {
            alert('Wishlist updated!');
        }

    };

    if (!wishlist || Object.keys(wishlist).length == 0) return <div>Loading ...</div>

    return ( 
        <div>
            <header>
                <Navbar />
            </header>

            <div className={style.updateIndex}>
                <div className={style.form}>
                    <div className={style.updateTitle}>
                        Update Wishlist
                    </div>

                    <div className={style.update}>
                        Current Name: {wishlist.wishlist_name}

                        <div className="div">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={style.inputField} placeholder="New Name"/>
                        </div>
                    </div>

                    <div className={style.update}>
                        Current Status: {wishlist.wishlist_status}

                        <div>
                            <select id="status" onChange={(e) => {setStatus(e.target.value)}} className={style.inputField}>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                    </div>

                    <button className={style.button}  onClick={() => handleSubmit(wishlist.ID)}>
                        Update
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

export default ShopDetailPage;