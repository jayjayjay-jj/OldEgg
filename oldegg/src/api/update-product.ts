import serverAPI from "@/env";
import axios from "axios";

const UpdateProduct = async (id: Number, name: string, category: string, url: string, description: string, price: Number, stock: Number, details: string) => {

    try {

        const body = {
            product_id: Number(id),
            name: name,
            category: category,
            image: url,
            description: description,
            price: Number(price),
            stock: Number(stock),
            details: details,
        }
    
        const response = await axios.post(serverAPI + "update-product", body);        
        return response.data;

    } catch (error) {

        return 404;
        
    }
}

export default UpdateProduct;