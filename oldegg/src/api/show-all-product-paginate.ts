import serverAPI from "@/env";
import axios from "axios";

const ShowAllProductPaginate = async (page: Number, limit: Number) => {

    try {
        
        const body = {
            productpage: Number(page),
            productlimit: Number(limit)
        }
        
        const response = await axios.post(serverAPI + "show-all-product-paginate", body)
        return response.data

    } catch (error) {
        return 404;
        
    }

}

export default ShowAllProductPaginate;