import serverAPI from "@/env";
import axios from "axios";

const UpdateShopStatus = async (id: Number) => {

    try {

        const body = {
            id: Number(id)
        }

        const response = await axios.post(serverAPI + "update-shop-status/" + body.id);
        
        return response.data;

    } catch (error) {

        return 404;
        
    }
}

export default UpdateShopStatus;