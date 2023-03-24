import serverAPI from "@/env";
import axios from "axios";

const getWishlistDetails = async (id: Number) => {

    try {

        const body = {
            id: Number(id),
        }        

        const response = await axios.post(serverAPI + "get-wishlist-header-details", body);
        return response.data;
        
    } catch (error) {

        return 404;
        
    }

}

export default getWishlistDetails;