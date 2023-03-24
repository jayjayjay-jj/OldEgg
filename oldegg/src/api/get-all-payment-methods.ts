import serverAPI from "@/env";
import axios from "axios";

const ShowAllPaymentMethods = async () => {

    try {
        const response = await axios.get(serverAPI + "show-all-payment-methods")
        return response.data

    } catch (error) {
        return 404;
        
    }

}

export default ShowAllPaymentMethods;