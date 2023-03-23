import serverAPI from "@/env";
import axios from "axios";

const ShowProductByShopPaginate = async (id: Number, page: Number, limit: Number) => {

    try {
        
        const body = {
            shop_id: Number(id),
            productpage: Number(page),
            productlimit: Number(limit)
        }
        
        const response = await axios.post(serverAPI + "show-product-by-shop-paginate", body)
        return response.data

    } catch (error) {
        return 404;
        
    }

}

export default ShowProductByShopPaginate;