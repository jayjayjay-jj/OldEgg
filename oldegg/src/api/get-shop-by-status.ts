import serverAPI from "@/env";
import axios from "axios";

const ShowShopByStatus = async (status: String, page: Number, limit: Number) => {

    try {
        
        const body = {
            status : status,
            shoppage: Number(page),
            shoplimit: Number(limit)
        }
        
        const response = await axios.post(serverAPI + "show-all-shop-paginate-status", body)
        return response.data

    } catch (error) {
        return 404;
        
    }

}

export default ShowShopByStatus;