import serverAPI from "@/env";
import axios from "axios";

const ShowHomeScrollingProduct = async (page: Number) => {

    try {
        
        const body = {
            productpage: Number(page)
        }
        
        const response = await axios.post(serverAPI + "show-home-product-scrolling", body)
        return response.data

    } catch (error) {
        return 404;
        
    }

}

export default ShowHomeScrollingProduct;