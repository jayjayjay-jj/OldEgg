import serverAPI from "@/env";
import axios from "axios";

const getProductByShopStatus = async (id: Number) => {

    try {

        const body = {
            id: Number(id)
        }

        const response = await axios.post(serverAPI + "get-product-by-shop-status", body);
        return response.data;

    } catch (error) {

        return 404;
        
    }

}

export default getProductByShopStatus;