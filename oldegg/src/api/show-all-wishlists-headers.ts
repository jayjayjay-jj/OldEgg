import serverAPI from "@/env";
import axios from "axios";

const ShowAllWishlistHeader = async () => {

    try {
        const response = await axios.get(serverAPI + "show-all-wishlist")
        return response.data
        

    } catch (error) {
        return 404;
        
    }

}

export default ShowAllWishlistHeader;