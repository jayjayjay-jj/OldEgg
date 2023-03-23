import serverAPI from "@/env";
import axios from "axios";

const GetProductCount = async (name: string) => {

    try {
        
        const body = {
            shop_name: name
        }
        
        const response = await axios.post(serverAPI + "get-product-count", body)
        return response.data

    } catch (error) {
        
        return 404;
        
    }

}

export default GetProductCount;