import serverAPI from "@/env";
import axios from "axios";

const getProductByShop = async (id: Number) => {

    try {

        const body = {
            shop_id: Number(id)
        }

        const response = await axios.post(serverAPI + "get-product-by-shop", body);
        return response.data;

    } catch (error) {
        return 404;
        
    }

}

export default getProductByShop;