import serverAPI from "@/env";
import WishlistDetail from "@/types/WishlistDetail";
import WishlistHeader from "@/types/WishlistHeader";
import axios from "axios";

const InsertProductToWishlist = async (newWishlist:WishlistDetail) => {
    
    try {
        const response = await axios.post(serverAPI + "insert-product-to-wishlist", newWishlist)
        return response.data

    } catch (error) {
        return 404;

    }
    
}

export default InsertProductToWishlist;