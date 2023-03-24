import serverAPI from "@/env";
import axios from "axios";

const getMessages = async (from: string, to: string) => {

  try{

    const body = {
      from: from,
      to: to
    }

    const response = await axios.post(serverAPI + 'get-messages', body);
    const result =  response.data;
    console.log(response.data);
    

    return result;

  } catch (error){

    return -1;

  }
  
}

export default getMessages;