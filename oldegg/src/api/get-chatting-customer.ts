import serverAPI from "@/env";
import axios from "axios";

const getChattingCustomers = async (userID: string) => {

    try{

        const body = {
            user_id: userID
        }
        
        
        const response = await axios.post(serverAPI + 'get-chatting-customer', body);
        
        const result =  response.data;
        console.log(response.data);

        return result;

    } catch (error){

        return -1;

    }
    
    }

export default getChattingCustomers;