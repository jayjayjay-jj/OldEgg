import serverAPI from "@/env";
import axios from "axios";

const getWishlistDetailByID = async (id: Number, productId: Number) => {

    try {

        const body = {
            WishlistID: Number(id),
            ProductID: Number(productId)
        }

        const response = await axios.post(serverAPI + "get-wishlist-details", body);
        return response.data;

    } catch (error) {
        return 404;
        
    }

}

export default getWishlistDetailByID;