import serverAPI from "@/env";
import axios from "axios";

const UpdateDetailQuantity = async (id: Number, prodId:Number, quantity: Number) => {

    try {

        const body = {
            wishlist_id : Number(id),
            product_id: Number(prodId),
            quantity: Number(quantity)
        }
        console.log(body);
        

        const response = await axios.post(serverAPI + "update-wishlist-details", body);  
        
        return response.data;

    } catch (error) {

        return 404;
        
    }
}

export default UpdateDetailQuantity;