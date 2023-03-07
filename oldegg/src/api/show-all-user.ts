import serverAPI from "@/env";
import User from "@/types/User";
import axios from "axios";

const ShowAllUser = async () => {

    try {
        const response = await axios.get(serverAPI + "show-all-user")
        return response.data

    } catch (error) {
        return 404;
        
    }

}

export default ShowAllUser;