import serverAPI from "@/env";
import Voucher from "@/types/Voucher";
import axios from "axios";

const SearchProduct = async (keyword: String) => {

    const body = {
        keyword: keyword
    }
    
    try {
        const response = await axios.post(serverAPI + "search-product", body)
        return response.data

    } catch (error) {
        return 404;

    }
    
}

export default SearchProduct;