import serverAPI from "@/env";
import axios from "axios";

const ShowAllCategories = async () => {

    try {
        const response = await axios.get(serverAPI + "show-all-categories")
        return response.data

    } catch (error) {
        return 404;
        
    }

}

export default ShowAllCategories;