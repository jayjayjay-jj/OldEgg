import serverAPI from "@/env";
import User from "@/types/User";
import axios from "axios";

const ConfirmPassword = async (userAttempt: User) => {

    try {
        const response = await axios.post(serverAPI + "check-password-before-update", userAttempt)

        return response.data

    } catch (error) {
        return 404;
        
    }
}

export default ConfirmPassword;