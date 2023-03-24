import serverAPI from "@/env";
import axios from "axios";

const getUserOrderReviews = async (id: Number, order_id: Number) => {

    try {

        const body = {
            user_id: Number(id),
            order_id: Number(order_id)
        }

        const response = await axios.post(serverAPI + "show-order-reviews", body);
        return response.data;

    } catch (error) {
        return 404;
        
    }

}

export default getUserOrderReviews;