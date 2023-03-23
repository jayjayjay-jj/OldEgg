import { useContext, useEffect, useState } from "react";
import UpdateUserStatus from "@/api/update-user-status";
import { useRouter } from "next/router";
import Navbar from "@/layout/navbar";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import style from "@/styles/admin/Users.module.scss"
import { ThemeContext } from "@/pages/changer/themeChanger";
import UpperSetting from "@/pages/components/UpperSetting";
import ShowAllUserPaginate from "@/api/show-all-user-paginate";
import ShopNavbar from "@/layout/shopNavbar";
import Link from "next/link";
import LowerNavbar from "@/layout/lowerNavbar";

const AllUserPage = () => {
    const[users, setUsers] = useState([]);
    const[updateUser, setUpdateUsers] = useState([]);
    const[status, setStatus] = useState('');

    const[page, setPage] = useState(1)
    const[limit, setLimit] = useState(4)
    const[totalPage, setTotalPage] = useState(0)

    const router = useRouter();
    const {theme} = useContext(ThemeContext);
    const[role, setRole] = useState('')

    useEffect(() => {        
        setRole(localStorage.getItem('role'))

        const getUserPaginate = async() => {
            
            const response = await ShowAllUserPaginate(page, limit);

            console.log(response);

            if(response === 404) {
                alert("Something went wrong!")
            }

            if (response.length === 0){
                setPage(page - 1);
                return;
            }

            setUsers(response)
            console.log(users);
            
            
            const total = Math.ceil(response.length / limit);
            setTotalPage(total);
            
        }
        
        getUserPaginate()

    }, [page, limit]);

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

    const onPrevButtonClicked = () => {

        if (page !== 1) setPage(page - 1); 

    }

    const onNextButtonClicked = () => {

        setPage(page + 1);

    }

    return ( 
        <div className={style.outer}>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>

            {(role == "user") ? 
            <div className={style.body} style={{ backgroundColor : theme.white_gray }}>
                <UpperSetting />
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

                <div className={style.paginateButton}>
                    <button className={style.button} onClick={onPrevButtonClicked} style={{ backgroundColor : theme.gray_white }}>Prev</button>

                    <div style={{ color : theme.black_white }}>
                        {page}
                    </div>

                    <button className={style. button} onClick={onNextButtonClicked} style={{ backgroundColor : theme.gray_white }}>Next</button>
                </div>
            </div> 
            :
            <div className={style.title} style={{ backgroundColor: theme.white_gray }}>
                <br></br>
                <div className={style.title} style={{ color: theme.black_white }}>
                    You are not authorized!
                </div>

                <div>   
                    <br></br>
                    <br></br>
                    <button className={style.ban}>
                        <Link className={style.link} href='/'>Home</Link>
                    </button>
                </div>
                
                <br></br>
            </div>
            }  
            
            <Footer />

            <LowerFooter />
        </div>
    );
}

export default AllUserPage;