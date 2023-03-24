import serverAPI from "@/env";
import axios from "axios";

const getAllOrder = async (status: string) => {

    try {

        const body = {
            status: status
        }        
        console.log(body);
        

        const response = await axios.post(serverAPI + "get-all-order", body);
        return response.data;

    } catch (error) {

        return 404;
        
    }

}

export default getAllOrder;