import serverAPI from "@/env";
import axios from "axios";

const ShowAllProduct = async () => {

    try {
        const response = await axios.get(serverAPI + "show-all-product")
        return response.data

    } catch (error) {
        return 404;
        
    }

}

export default ShowAllProduct;