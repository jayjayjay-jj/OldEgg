import serverAPI from "@/env";
import User from "@/types/User";
import axios from "axios";

const SignUp = async (newUser:User) => {

    try {
        const response = await axios.post(serverAPI + "sign-up", newUser)
        return response.data

    } catch (error) {
        return 404;
        
    }

}

export default SignUp;