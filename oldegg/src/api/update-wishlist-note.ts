import serverAPI from "@/env";
import axios from "axios";

const UpdateWishlistNote = async (id: Number, note: string) => {

    try {

        const body = {
            id: Number(id),
            notes: note
        }

        console.log(body);
    
        const response = await axios.post(serverAPI + "update-wishlist-note", body);        
        return response.data;

    } catch (error) {

        return 404;
        
    }
}

export default UpdateWishlistNote;