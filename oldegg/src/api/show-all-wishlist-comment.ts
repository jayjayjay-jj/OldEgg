import serverAPI from "@/env";
import axios from "axios";

const getWishlistComments = async (id: Number) => {

    try {

        const body = {
            id: Number(id)
        }

        const response = await axios.post(serverAPI + "show-comment", body);
        return response.data;

    } catch (error) {
        return 404;
        
    }

}

export default getWishlistComments;