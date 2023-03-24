import serverAPI from "@/env";
import JWT from "@/types/JWTToken";
import axios from "axios";

const ShopAuthentication = async (token_string:JWT) => {

    try {
        const response = await axios.post(serverAPI + "shop-authenticate", token_string)

        return response.data

    } catch (error) {
        return 404;
        
    }
}

export default ShopAuthentication;