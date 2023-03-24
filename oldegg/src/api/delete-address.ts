import serverAPI from "@/env";
import axios from "axios";

const DeleteAddress = async (id: Number) => {

    try {

        const body = {
            id: Number(id)
        }        

        const response = await axios.post(serverAPI + "delete-address", body);
        return response.data;

    } catch (error) {

        return 404;
        
    }

}

export default DeleteAddress;