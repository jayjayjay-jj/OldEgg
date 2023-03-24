import serverAPI from "@/env";
import axios from "axios";

const ShowAllDeliveryProviders = async () => {

    try {
        const response = await axios.get(serverAPI + "show-all-delivery-providers")
        return response.data

    } catch (error) {
        return 404;
        
    }

}

export default ShowAllDeliveryProviders;