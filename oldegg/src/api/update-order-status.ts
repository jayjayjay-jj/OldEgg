import serverAPI from "@/env";
import User from "@/types/User";
import axios from "axios";

const UpdateOrderStatus = async (id: Number) => {

    try {

        const body = {
            id: Number(id)
        }

        const response = await axios.post(serverAPI + "update-order-status/" + body.id);
        console.log("update-order-status/" + body.id);
        
        return response.data;

    } catch (error) {

        return 404;
        
    }
}

export default UpdateOrderStatus;