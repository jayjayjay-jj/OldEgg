import serverAPI from "@/env";
import User from "@/types/User";
import axios from "axios";

const UpdateUserPhone = async (userID: Number, phoneNumber: string) => {

    try {

        const body = {
            user_id: Number(userID),
            phone_number: phoneNumber
        }

        console.log(body);  

        const response = await axios.post(serverAPI + "update-user-phone", body);

        return response.data;

    } catch (error) {

        return 404;
        
    }
}

export default UpdateUserPhone;