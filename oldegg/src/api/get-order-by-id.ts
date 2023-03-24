import serverAPI from "@/env";
import axios from "axios";

const getOrderById = async (id: Number, status: string) => {

    try {

        const body = {
            user_id: Number(id),
            status: status
        }        

        const response = await axios.post(serverAPI + "get-user-order", body);
        return response.data;

    } catch (error) {

        return 404;
        
    }

}

export default getOrderById;