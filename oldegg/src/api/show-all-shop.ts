import serverAPI from "@/env";
import axios from "axios";

const ShowAllShop = async () => {

    try {
        const response = await axios.get(serverAPI + "show-all-shop")
        return response.data

    } catch (error) {
        return 404;
        
    }

}

export default ShowAllShop;