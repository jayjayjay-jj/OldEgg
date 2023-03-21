import serverAPI from "@/env";
import axios from "axios";

const ShowAllShopPaginate = async (page: Number, limit: Number) => {

    try {
        
        const body = {
            shoppage: Number(page),
            shoplimit: Number(limit)
        }
        
        const response = await axios.post(serverAPI + "show-all-shop-paginate", body)
        return response.data

    } catch (error) {
        return 404;
        
    }

}

export default ShowAllShopPaginate;