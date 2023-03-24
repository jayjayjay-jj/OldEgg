import serverAPI from "@/env";
import axios from "axios";

const DeleteCartItem = async (id: Number, prodId: Number) => {

    try {

        const body = {
            id: Number(id),
            product_id: Number(prodId)
        }        

        const response = await axios.post(serverAPI + "delete-cart-item", body);
        return response.data;

    } catch (error) {

        return 404;
        
    }

}

export default DeleteCartItem;