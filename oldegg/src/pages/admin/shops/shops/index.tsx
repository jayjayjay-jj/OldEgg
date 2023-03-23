import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/layout/navbar";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import style from "@/styles/admin/Users.module.scss"
import { ThemeContext } from "@/pages/changer/themeChanger";
import ShopUpperSetting from "@/pages/components/ShopUpperSetting";
import UpdateShopStatus from "@/api/update-shop-status";
import ShowAllShopPaginate from "@/api/show-all-shop-paginate";
import ShowShopByStatus from "@/api/get-shop-by-status";
import ShopNavbar from "@/layout/shopNavbar";
import Link from "next/link";

const AllUserPage = () => {
    const[shops, setShops] = useState([]);
    const[updateShop, setUpdateShop] = useState([]);
    const[status, setStatus] = useState('');
    const router = useRouter();
    const {theme} = useContext(ThemeContext);

    const[page, setPage] = useState(1)
    const[limit, setLimit] = useState(4)
    const[totalPage, setTotalPage] = useState(0)
    const[role, setRole] = useState('')

    useEffect(() => {
        setRole(localStorage.getItem("role"))   
        console.log(role);

        const getShopByStatus = async () => {            
            const response = await ShowShopByStatus(status, page, limit);

            if(response === 404) {
                alert("Something went wrong!")
            }

            if (response.length === 0){
                setPage(page - 1);
                return;
            }

            setShops(response)
            
            const total = Math.ceil(response.length / limit);
            setTotalPage(total);
        }

        getShopByStatus()

    }, [status, page, limit])

    const goToDetail = (id: Number) => {
        router.push('/shop/' + id);
    }

    const banShop = (id: Number) => {
        alert("Not Banned " + id)

        const updateStatus = async() => {
            const response = await UpdateShopStatus(id);

            if(response === -1) {
                alert("wow")
            }
        }

        updateStatus()
        router.push('shops')
    }

    const unbanShop = (id: Number) => {
        alert("Banned " + id)

        const updateStatus = async() => {
            const response = await UpdateShopStatus(id);

            if(response === -1) {
                alert("wow")
            }
        }

        updateStatus()
        router.push('shops')
    }

    const onPrevButtonClicked = () => {
        if (page !== 1) setPage(page - 1); 
    }

    const onNextButtonClicked = () => {
        setPage(page + 1);
    }


    return (
    <div>
    {(role == "user") ? 
        <div>
            <div className={style.outer}>
                <header>
                    {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
                </header>


                <div className={style.body} style={{ backgroundColor : theme.white_gray }}>
                    <ShopUpperSetting />

                    <br></br>

                    <h2 className={style.title} style={{ color : theme.black_white, backgroundColor : theme.white_gray }}>
                        All Shops
                    </h2>

                    <div className={style.shopFilter}>
                        <button className={style.filterButton} onClick={(e) => setStatus("")}>All</button>

                        <button className={style.filterButton} name="checkbox" onClick={() => setStatus("Active")}>Active</button>

                        <button className={style.filterButton} name="checkbox" onClick={() => setStatus("Banned")}>Banned
                        </button>
                    </div>

                    <div className={style.index}>

                        {
                            shops.map((shop: any) => {
                                return (
                                    <form className={style.userCard} style={{ backgroundColor : theme.lightBlue_darkBlue }}>
                                        <div onClick={() => goToDetail(shop.ID)} > 
                                            <div className={style.userName}>
                                                {shop.name}
                                            </div>

                                            <div className={style.email}>
                                                {shop.email}
                                            </div>
                                        </div>

                                        <div>
                                            {shop.status == "Active" ? 
                                            <button className={style.ban} onClick={() => banShop(shop.ID)}>Ban Shop</button> :
                                            <button className={style.unban} onClick={() => unbanShop(shop.ID)}>Unban Shop</button>}
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
                
                <footer>
                    <Footer />
                    <LowerFooter />
                </footer>
            </div>
        </div>
    : 
        <div className={style.outer}>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
            </header>

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

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    }
    </div>
    )
}

export default AllUserPage;