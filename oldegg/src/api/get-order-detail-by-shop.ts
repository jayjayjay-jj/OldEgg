import serverAPI from "@/env";
import axios from "axios";

const getOrderDetailsByShop = async (id: Number) => {

    try {

        const body = {
            shop_id: Number(id)
        }

        const response = await axios.post(serverAPI + "count-shop-order-quantity", body);
        return response.data;

    } catch (error) {

        return 404;
        
    }

}

export default getOrderDetailsByShop;