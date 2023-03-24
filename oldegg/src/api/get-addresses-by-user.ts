import serverAPI from "@/env";
import axios from "axios";

const getAddressByUserId = async (id: Number) => {

    try {

        const body = {
            user_id: Number(id)
        }
        
        const response = await axios.post(serverAPI + "show-user-address", body);
        
        return response.data;

    } catch (error) {
        return 404;
        
    }

}

export default getAddressByUserId;