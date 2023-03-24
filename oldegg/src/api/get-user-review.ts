import serverAPI from "@/env";
import axios from "axios";

const getUserReviews = async (id: Number) => {

    try {

        const body = {
            user_id: Number(id)
        }

        const response = await axios.post(serverAPI + "show-reviews", body);
        return response.data;

    } catch (error) {
        return 404;
        
    }

}

export default getUserReviews;