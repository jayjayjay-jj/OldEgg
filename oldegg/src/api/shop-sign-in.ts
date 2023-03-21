import serverAPI from "@/env";
import Shop from "@/types/Shop";
import axios from "axios";

const ShopSignIn = async (shopAttempt:Shop) => {

    try {
        const response = await axios.post(serverAPI + "shop-sign-in", shopAttempt)
        console.log(response.data)
        return response.data

    } catch (error) {
        return 404;
        
    }

}

export default ShopSignIn;