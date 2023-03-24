import serverAPI from "@/env";
import axios from "axios";

const getCartDetail = async (id: Number, productId: Number) => {

    try {

        const body = {
            id : Number(id),
            product_id: Number(productId)
        }
        

        const response = await axios.post(serverAPI + "get-cart-detail", body);
        return response.data;

    } catch (error) {
        return 404;
        
    }

}

export default getCartDetail;