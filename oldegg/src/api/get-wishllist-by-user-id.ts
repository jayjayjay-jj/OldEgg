import serverAPI from "@/env";
import axios from "axios";

const getWishlistHeaderByUserId = async (id: Number) => {

    try {

        const body = {
            user_id: Number(id)
        }

        const response = await axios.post(serverAPI + "get-wishlist-by-user-id", body);
        return response.data;

    } catch (error) {
        return 404;
        
    }

}

export default getWishlistHeaderByUserId;