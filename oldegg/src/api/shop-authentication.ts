import serverAPI from "@/env";
import JWT from "@/types/JWTToken";
import axios from "axios";

const ShopAuthentication = async (token_string:JWT) => {

    try {
        const response = await axios.post(serverAPI + "shop-authenticate", token_string)
        console.log(serverAPI)
        console.log(token_string) 
        console.log("authenticate")
        console.log("Response: " + response.data + "\n")

        return response.data

    } catch (error) {
        return 404;
        
    }
}

export default ShopAuthentication;