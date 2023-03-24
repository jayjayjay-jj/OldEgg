import serverAPI from "@/env";
import axios from "axios";

const getWishlistByUserId = async (id: Number) => {

    try {

        const body = {
            user_id: Number(id)
        }

        const response = await axios.post(serverAPI + "show-user-wishlist", body);
        return response.data;

    } catch (error) {
        return 404;
        
    }

}

export default getWishlistByUserId;