import serverAPI from "@/env";
import Comment from "@/types/Comment";
import axios from "axios";

const AddNewComment = async (newComment: Comment) => {
    
    try {
        const response = await axios.post(serverAPI + "insert-comment", newComment)
        return response.data

    } catch (error) {
        return 404;

    }
    
}

export default AddNewComment;