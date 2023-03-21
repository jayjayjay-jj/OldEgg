import serverAPI from "@/env";
import Product from "@/types/Product";
import axios from "axios";

const SignNewProduct = async (newProduct:Product) => {
    
    try {
        const response = await axios.post(serverAPI + "insert-product", newProduct)
        return response.data

    } catch (error) {
        return 404;

    }
    
}

export default SignNewProduct;