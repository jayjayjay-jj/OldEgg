import ShowAllWishlistHeader from "@/api/show-all-wishlists-headers";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import LowerNavbar from "@/layout/lowerNavbar";
import Navbar from "@/layout/navbar";
import ShopNavbar from "@/layout/shopNavbar";
import { ThemeContext } from "@/pages/changer/themeChanger";
import style from '@/styles/wishlist/WishlistHeader.module.scss'
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const ViewAllWishlists = () => {
    const[wishlists, setWishlists] = useState<any>()
    const[role, setRole] = useState('')

    const router = useRouter()
    const{theme} = useContext(ThemeContext)

    useEffect(() => {        
        
        const getWishlishHeader = async() => {
            setRole(localStorage.getItem('role'))
            
            const response = await ShowAllWishlistHeader();
            console.log(response);
            

            if(response === 404) {
                alert("Something went wrong!")
            }

            setWishlists(response)
        }
        console.log(wishlists);
        getWishlishHeader()
        
    }, []);

    const goToDetail = (id: Number) => {
        router.push('/user/wishlist/' + id);
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
                    {
                        wishlists.map((wishlist: any) => {
                            return (
                                <div className={style.card} style={{ backgroundColor : theme.lightBlue_darkBlue }}>
                                    <div className={style.cardName} onClick={() => goToDetail(wishlist.ID)}>
                                        {wishlist.wishlist_name}
                                    </div>

                                    <div className={style.carStatus}>
                                        Status: {wishlist.wishlist_status}
                                    </div>
                                </div>
                            )
                        }
                    )}
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