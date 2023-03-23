import serverAPI from "@/env";
import axios from "axios";

const UpdateWishlistHeader = async (id: Number, name: string, status: string) => {

    try {

        const body = {
            id: Number(id),
            wishlist_name: name,
            wishlist_status: status,
        }

        console.log(body);
    
        const response = await axios.post(serverAPI + "update-wishlist-header", body);        
        return response.data;

    } catch (error) {

        return 404;
        
    }
}

export default UpdateWishlistHeader;