import serverAPI from "@/env";
import axios from "axios";

const UpdateCartQuantity = async (id: Number, prodId:Number, quantity: Number) => {

    try {

        const body = {
            id : Number(id),
            product_id: Number(prodId),
            quantity: Number(quantity)
        }

        const response = await axios.post(serverAPI + "update-cart-item-quantity", body);  
        
        return response.data;

    } catch (error) {

        return 404;
        
    }
}

export default UpdateCartQuantity;