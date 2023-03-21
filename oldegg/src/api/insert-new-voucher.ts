import serverAPI from "@/env";
import Voucher from "@/types/Voucher";
import axios from "axios";

const AddNewVoucher = async (newVoucher:Voucher) => {
    
    try {
        const response = await axios.post(serverAPI + "insert-voucher", newVoucher)
        return response.data

    } catch (error) {
        return 404;

    }
    
}

export default AddNewVoucher;