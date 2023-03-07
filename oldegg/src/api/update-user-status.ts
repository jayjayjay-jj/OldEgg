import serverAPI from "@/env";
import User from "@/types/User";
import axios from "axios";

const UpdateUserStatus = async (id: Number) => {

    try {

        const body = {
            id: Number(id)
        }

        const response = await axios.post(serverAPI + "update-user-status/" + body.id);
        console.log("update-user-status/" + body.id);
        
        return response.data;

    } catch (error) {

        return 404;
        
    }
}

export default UpdateUserStatus;