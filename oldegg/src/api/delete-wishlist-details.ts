import serverAPI from "@/env";
import axios from "axios";

const DeleteWishlistDetails = async (id: Number, prodId: Number) => {

    try {

        const body = {
            wishlist_id: Number(id),
            product_id: Number(prodId)
        }

        console.log(body);
        

        const response = await axios.post(serverAPI + "delete-wishlist-details", body);
        return response.data;

    } catch (error) {

        return 404;
        
    }

}

export default DeleteWishlistDetails;