import serverAPI from "@/env";
import axios from "axios";

const SendNewsletter = async (newsletter: string) => {

    try {

        const body = {
            NewsletterString: newsletter
        }

        const response = await axios.post(serverAPI + "send-newsletter", body);
        return response.data;

    } catch (error) {
        return 404;
        
    }

}

export default SendNewsletter;