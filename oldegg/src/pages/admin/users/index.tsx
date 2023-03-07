import User from "@/types/User";
import { useContext, useEffect, useState } from "react";
import ShowAllUser from '@/api/show-all-user'
import UpdateUserStatus from "@/api/update-user-status";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "@/layout/navbar";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import style from "@/styles/admin/Users.module.scss"
import { ThemeContext } from "@/pages/changer/themeChanger";

const AllUserPage = () => {
    const[users, setUsers] = useState([]);
    const[updateUser, setUpdateUsers] = useState([]);
    const[status, setStatus] = useState('');
    const router = useRouter();
    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        
        const getUsers = async () => {

            const response = await ShowAllUser();

            if (response === -1) alert('Server Error');
            else {
                setUsers(response);
                // alert(response)
            }

            console.log(users);
        }

        getUsers();
        // updateUserStatus();

    }, []);

    const goToDetail = (id: Number) => {
        router.push('/user/' + id);
    }

    const banUser = (id: Number) => {
        alert("Not Banned " + id)

        const updateStatus = async() => {
            const response = await UpdateUserStatus(id);

            if(response === -1) {
                alert("wow")
            }
        }

        updateStatus()
        router.push('users')
    }

    const unbanUser = (id: Number) => {
        alert("Banned " + id)

        const updateStatus = async() => {
            const response = await UpdateUserStatus(id);

            if(response === -1) {
                alert("wow")
            }
        }

        updateStatus()
        router.push('users')
    }

    return ( 
        <div className={style.outer}>
            <Navbar />

            <div className={style.body} style={{ backgroundColor : theme.white_gray }}>
                <h2 className={style.title} style={{ color : theme.black_white, backgroundColor : theme.white_gray }}>
                    All Users
                </h2>

                <div className={style.index}>
                    {
                        users.map((user: any) => {
                            return (
                                <form className={style.userCard} style={{ backgroundColor : theme.lightBlue_darkBlue }}>
                                    <div onClick={() => goToDetail(user.ID)} > 
                                        <div className={style.userName}>
                                            {user.first_name + " " + user.last_name}
                                        </div>

                                        <div className={style.email}>
                                            {user.email}
                                        </div>
                                    </div>

                                    <div>
                                        {user.status == "Active" ? 
                                        <button className={style.ban} onClick={() => banUser(user.ID)}>Ban User</button> :
                                        <button className={style.unban} onClick={() => unbanUser(user.ID)}>Unban User</button>}
                                    </div>
                                </form>
                        )})
                    }
                </div>
            </div>
            
            <Footer />

            <LowerFooter />
        </div>
    );
}

export default AllUserPage;