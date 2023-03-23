import serverAPI from "@/env";
import axios from "axios";

const getProductByShopNameStock = async (name: String, status: String, page: Number, limit: Number) => {

    try {

        const body = {
            shop_name: name,
            stock_status: status,
            productpage: Number(page),
            productlimit: Number(limit)
        }

        const response = await axios.post(serverAPI + "show-product-by-shop-name-paginate-stock", body);
        return response.data;

    } catch (error) {
        return 404;
        
    }

}

export default getProductByShopNameStock;