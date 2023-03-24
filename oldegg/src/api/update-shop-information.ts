import serverAPI from "@/env";
import axios from "axios";

const UpdateShopInformation = async (id: Number, name: string, image: string) => {

    try {

        const body = {
            id: Number(id),
            name: name,
            image: image,
        }

        console.log(body);
    
        const response = await axios.post(serverAPI + "update-shop", body);        
        return response.data;

    } catch (error) {

        return 404;
        
    }
}

export default UpdateShopInformation;