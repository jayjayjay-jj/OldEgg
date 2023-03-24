import serverAPI from "@/env";
import axios from "axios";

const ShowPublicWishlistPaginate = async (page: Number, limit: Number) => {

    try {
        
        const body = {
            wishpage: Number(page),
            wishlimit: Number(limit)
        }
        
        const response = await axios.post(serverAPI + "show-all-public-wishlist-paginate", body)
        return response.data

    } catch (error) {
        return 404;
        
    }

}

export default ShowPublicWishlistPaginate;