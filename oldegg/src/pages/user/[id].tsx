import getUserByID from "@/api/get-user-by-id";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserDetailPage = () => {
    
    const router = useRouter();
    const [userID, setUserID] = useState<any>();
    const [user, setUser] = useState<any>();
    
    useEffect(() => {

        setUserID(router.query.id);

    }, [router.query.id]);

    useEffect(() => {

        const get = async () => {

            const response = await getUserByID(userID);
            setUser(response);

        }

        get();

    }, [userID]);

    if (!user || Object.keys(user).length == 0) return <div>Loading ...</div>

    return ( 
        <div className="">
            <h1>{user.first_name}</h1>
            <h1>{user.last_name}</h1>
        </div> 
    );
}
 
export default UserDetailPage;