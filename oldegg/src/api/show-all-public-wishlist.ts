import serverAPI from "@/env";
import axios from "axios";

const ShowAllPublicWishlist = async () => {

    try {
        const response = await axios.get(serverAPI + "show-all-public-wishlist")
        return response.data

    } catch (error) {
        return 404;
        
    }

}

export default ShowAllPublicWishlist;