import serverAPI from "@/env";
import axios from "axios";

const getWishlistHeaderDetailsProduct = async (id: Number, productId: Number) => {

    try {

        const body = {
            wishlist_id: Number(id),
            product_id: Number(productId)
        }        

        const response = await axios.post(serverAPI + "get-wishlist-details", body);
        return response.data;
        
    } catch (error) {

        return 404;
        
    }

}

export default getWishlistHeaderDetailsProduct;