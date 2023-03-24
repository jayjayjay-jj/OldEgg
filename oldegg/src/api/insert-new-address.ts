import serverAPI from "@/env";
import Address from "@/types/Address";
import axios from "axios";

const AddNewAddress = async (newAddress:Address) => {
    
    try {
        const response = await axios.post(serverAPI + "insert-address", newAddress)
        return response.data

    } catch (error) {
        return 404;

    }
    
}

export default AddNewAddress;