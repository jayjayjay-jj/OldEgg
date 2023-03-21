import serverAPI from "@/env";
import axios from "axios";

const getProductByStock = async (id: Number, status: String, page: Number, limit: Number) => {

    try {

        const body = {
            shop_id: Number(id),
            stock_status: status,
            productpage: Number(page),
            productlimit: Number(limit)
        }

        const response = await axios.post(serverAPI + "show-product-paginate-stock", body);
        return response.data;

    } catch (error) {
        return 404;
        
    }

}

export default getProductByStock;