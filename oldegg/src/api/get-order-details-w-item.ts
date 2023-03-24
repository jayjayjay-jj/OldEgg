import serverAPI from "@/env";
import axios from "axios";

const getOrderDetailWithItem = async (id: Number, user_id: Number) => {

    try {

        const body = {
            ID: Number(id),
            user_id: Number(user_id)
        }

        const response = await axios.post(serverAPI + "get-order-detail-with-item", body);
        return response.data;

    } catch (error) {

        return 404;
        
    }

}

export default getOrderDetailWithItem;