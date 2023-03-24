import serverAPI from "@/env";
import Voucher from "@/types/Voucher";
import axios from "axios";

const SearchVoucher = async (code: string) => {

    try {
        const body = {
            code: code
        }
        
        const response = await axios.post(serverAPI + "search-voucher", body)
        return response.data

    } catch (error) {
        return 404;

    }
    
}

export default SearchVoucher;