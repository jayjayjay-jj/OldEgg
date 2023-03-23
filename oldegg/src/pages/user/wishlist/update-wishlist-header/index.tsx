import ShowAllWishlistHeader from "@/api/show-all-wishlists-headers";
import UpdateWishlistHeader from "@/api/update-wishlist-header";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import LowerNavbar from "@/layout/lowerNavbar";
import Navbar from "@/layout/navbar";
import ShopNavbar from "@/layout/shopNavbar";
import { ThemeContext } from "@/pages/changer/themeChanger";
import style from '@/styles/wishlist/WishlistHeader.module.scss'
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const ViewAllWishlists = () => {
    const[id, setId] = useState()
    const[name, setName] = useState("")
    const[status, setStatus] = useState("")
    const[wishlists, setWishlists] = useState<any>()

    const[role, setRole] = useState('')
    const{theme} = useContext(ThemeContext)

    useEffect(() => {        
        
        const getWishlishHeader = async() => {
            setRole(localStorage.getItem('role'))
            console.log(wishlists.ID);
            
            const response = await UpdateWishlistHeader(Number(id), name, status);
            console.log(response);
            

            if(response === 404) {
                alert("Something went wrong!")
            }

            setWishlists(response)
        }
        console.log(wishlists);
        getWishlishHeader()
        
    }, []);

    if(!wishlists) return <div>Loading...</div>

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>
            
            <div>
                <div className={style.index}>
                    {wishlists.ID}
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