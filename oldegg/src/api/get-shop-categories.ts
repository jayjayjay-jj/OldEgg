import serverAPI from "@/env";
import axios from "axios";

const getShopByCategories = async (id: Number) => {

    try {

        const body = {
            shop_id: Number(id)
        }

        const response = await axios.post(serverAPI + "get-shop-categories", body);
        return response.data;

    } catch (error) {

        return 404;
        
    }

}

export default getShopByCategories;