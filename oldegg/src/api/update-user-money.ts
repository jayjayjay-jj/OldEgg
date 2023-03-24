import serverAPI from "@/env";
import User from "@/types/User";
import axios from "axios";

const UpdateUserMoney = async (userID: Number, money: Number) => {

    try {

        const body = {
            user_id: Number(userID),
            money: money
        }

        const response = await axios.post(serverAPI + "update-user-money", body);

        return response.data;

    } catch (error) {

        return 404;
        
    }
}

export default UpdateUserMoney;