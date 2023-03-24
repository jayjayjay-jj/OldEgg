import serverAPI from "@/env";
import Cart from "@/types/Cart";
import axios from "axios";

const Checkout = async (userId: Number, addressId: Number, deliveryId: Number, paymentId: Number, status: String, cartItems: Cart) => {
    
    try {
        const body = {
            user_id: userId,
            address_id: addressId,
            delivery_id: deliveryId,
            payment_id: paymentId,
            status: status,
            cart_items: cartItems
        }

        const response = await axios.post(serverAPI + "checkout", body)
        return response.data

    } catch (error) {
        return 404;

    }
    
}

export default Checkout;