import serverAPI from "@/env";
import axios from "axios";

const ShowAllUserPaginate = async (page: Number, limit: Number) => {

    try {
        
        const body = {
            userpage: Number(page),
            userlimit: Number(limit)
        }
        
        const response = await axios.post(serverAPI + "show-all-user-paginate", body)
        return response.data

    } catch (error) {
        return 404;
        
    }

}

export default ShowAllUserPaginate;