import serverAPI from "@/env";
import axios from "axios";

const getSimilarProducts = async (id: Number, categoryID: Number) => {

    try {

        const body = {
            id: Number(id),
            category: Number(categoryID)
        }        

        const response = await axios.post(serverAPI + "get-similar-product", body);
        return response.data;
        
    } catch (error) {

        return 404;
        
    }

}

export default getSimilarProducts;