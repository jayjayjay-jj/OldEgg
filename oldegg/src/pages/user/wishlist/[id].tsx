import getShopById from "@/api/get-shop-by-id";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import Navbar from "@/layout/navbar";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import style from '@/styles/wishlist/WishlistHeader.module.scss'
import getWishlistHeaderById from "@/api/get-wishlist-by-id";
import { ThemeContext } from "@/pages/changer/themeChanger";
import Link from "next/link";

const ShopDetailPage = () => {
    const router = useRouter();
    const {theme} = useContext(ThemeContext)

    const [wishlistID, setWishlistID] = useState<any>();
    const [wishlist, setWishlist] = useState<any>();
    
    useEffect(() => {
        setWishlistID(router.query.id);
    }, [router.query.id]);

    useEffect(() => {

        const get = async () => {

            const response = await getWishlistHeaderById(wishlistID);
            setWishlist(response);
            console.log(response);
            
        }

        get();
        
    }, [wishlistID]);

    if (!wishlist || Object.keys(wishlist).length == 0) return <div>Loading ...</div>

    return ( 
        <div>
            <header>
                <Navbar />
            </header>

            <div className={style.index}>
                <div className={style.outer}>
                    <div className={style.cardName}>
                        {wishlist.wishlist_name}
                    </div>

                    <div className={style.cardStatus}>
                        Status: {wishlist.wishlist_status}
                    </div>

                    <button className={style.button}>
                        <Link href={"/user/wishlist/update-wishlist-header/" + wishlistID} className={style.buttonLink}>Update Wishlist</Link>
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