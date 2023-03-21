import serverAPI from "@/env";
import Shop from "@/types/Shop";
import axios from "axios";

const SignUpNewStore = async (newShop:Shop) => {
    
    try {
        const response = await axios.post(serverAPI + "insert-shop", newShop)
        return response.data

    } catch (error) {
        return 404;

    }
    
}

export default SignUpNewStore;