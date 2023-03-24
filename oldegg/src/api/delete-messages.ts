import serverAPI from "@/env";
import axios from "axios";

const DeleteMessages = async (from: string, to: string) => {

    try {       

        const body = {
            from: from,
            to: to
        }
        console.log(body);
        

        const response = await axios.post(serverAPI + "delete-chatting-history", body);
        return response.data;

    } catch (error) {

        return 404;
        
    }

}

export default DeleteMessages;