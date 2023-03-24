import serverAPI from "@/env";
import axios from "axios";

const UpdateReview = async (id: Number, delivery: Number, product: Number, service: Number, comment: string) => {

    try {

        const body = {
            review_id: Number(id),
            review_delivery: Number(delivery),
            review_product: Number(product),
            review_service: Number(service),
            review_comment: comment
        }
    
        const response = await axios.post(serverAPI + "update-user-review-detail", body);        
        return response.data;

    } catch (error) {

        return 404;
        
    }
}

export default UpdateReview;