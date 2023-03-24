import serverAPI from "@/env";
import axios from "axios";

const UpdateUserPassword = async (userID: Number, password: string) => {

    try {

        const body = {
            user_id: Number(userID),
            password: password
        }

        console.log(body);  

        const response = await axios.post(serverAPI + "update-password", body);

        return response.data;

    } catch (error) {

        return 404;
        
    }
}

export default UpdateUserPassword;