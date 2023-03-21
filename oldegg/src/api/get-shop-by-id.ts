import serverAPI from "@/env";
import axios from "axios";

const getShopByID = async (id: Number) => {

    try {

        const body = {
            id: Number(id)
        }

        const response = await axios.post(serverAPI + "get-shop-by-id", body);
        return response.data;

    } catch (error) {

        return 404;
        
    }

}

export default getShopByID;