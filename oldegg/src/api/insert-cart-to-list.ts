import serverAPI from "@/env";
import axios from "axios";

const InsertCartToLater = async (userId: Number, productId: Number, quantity: Number) => {
    
    try {
        const body = {
            user_id: userId,
            product_id: productId,
            quantity: quantity
        }

        const response = await axios.post(serverAPI + "insert-cart-to-later", body)
        return response.data

    } catch (error) {
        return 404;

    }
    
}

export default InsertCartToLater;