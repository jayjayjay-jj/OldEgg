import serverAPI from "@/env";
import WishlistHeader from "@/types/WishlistHeader";
import axios from "axios";

const AddNewWishlistHeader = async (newWishlist:WishlistHeader) => {
    
    try {
        const response = await axios.post(serverAPI + "create-wishlist", newWishlist)
        return response.data

    } catch (error) {
        return 404;

    }
    
}

export default AddNewWishlistHeader;