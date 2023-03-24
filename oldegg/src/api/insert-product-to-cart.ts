import serverAPI from "@/env";
import axios from "axios";

const InsertProductToCart = async (userId: Number, productId: Number, quantity: Number) => {
    
    try {
        const body = {
            user_id: userId,
            product_id: productId,
            quantity: quantity
        }

        const response = await axios.post(serverAPI + "insert-product-to-cart", body)
        return response.data

    } catch (error) {
        return 404;

    }
    
}

export default InsertProductToCart;