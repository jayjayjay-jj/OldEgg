import serverAPI from "@/env";
import User from "@/types/User";
import axios from "axios";

const CheckEmail = async (userAttempt: User) => {

    try {
        const response = await axios.post(serverAPI + "email-checking", userAttempt)

        return response.data

    } catch (error) {
        return 404;
        
    }
}

export default CheckEmail;