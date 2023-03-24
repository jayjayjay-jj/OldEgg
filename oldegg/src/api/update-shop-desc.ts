import serverAPI from "@/env";
import axios from "axios";

const UpdateShopDesc = async (id: Number, shop: Number, desc: string) => {

    try {

        const body = {
            id: Number(id),
            shop_id: shop,
            desc: desc,
        }
    
        const response = await axios.post(serverAPI + "update-shop-desc", body);        
        return response.data;

    } catch (error) {

        return 404;
        
    }
}

export default UpdateShopDesc;