import serverAPI from "@/env";
import User from "@/types/User";
import axios from "axios";

const SignIn = async (userAttempt:User) => {

    try {
        const response = await axios.post(serverAPI + "sign-in", userAttempt)
        console.log(userAttempt)
        return response.data

    } catch (error) {
        return 404;
        
    }

}

export default SignIn;