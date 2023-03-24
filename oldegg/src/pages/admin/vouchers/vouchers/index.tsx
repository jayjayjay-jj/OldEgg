import Authentication from "@/api/authentication";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import LowerNavbar from "@/layout/lowerNavbar";
import Navbar from "@/layout/navbar";
import ShopNavbar from "@/layout/shopNavbar";
import { ThemeContext } from "@/pages/changer/themeChanger";
import JWT from "@/types/JWTToken";
import getCookie from "@/util/getCookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import style from '@/styles/admin/Users.module.scss'
import RectangularInputField from "@/pages/components/RectangularInputField";
import SearchVoucher from "@/api/search-voucher";
import { log } from "console";
import UpdateUserMoney from "@/api/update-user-money";

const AllVoucherPage = () => {
    const [role, setRole] = useState('')
    const [userID, setUserID] = useState()
    const [proMoney, setProMoney] = useState()
    const [search, setSearch] = useState('')
    const [amount, setAmount] = useState()
    const [message, setMessage] = useState('')

    const [user, setUser] = useState<any>()
    const [voucher, setVoucer] = useState<any>()

    const router = useRouter()
    const {theme} = useContext(ThemeContext)

    useEffect(() => {
        setRole(localStorage.getItem('role'))
    
        const getCurrentUser = async () => {
            const JWT = getCookie("AuthenticationCookie")

            const token:JWT = {
                token_string: JWT
            }

            const user = await Authentication(token)
            
            if(user === 404) {
                alert("Server Error")
            
            } else if(user === "Where is Cookie? 0_0null") {
                alert("No Cookie")

            } 

            if(user === undefined || userID === undefined || proMoney === undefined) {
                setUser(user)
                setUserID(user.ID)
                setProMoney(user.money)
            }

                setUser(user)
                setUserID(user.ID)
                setProMoney(user.money)
            }
        
        getCurrentUser()   
    }, [])

    const handleVoucherValidation = async () => {

        const response = await SearchVoucher(search)
        
        if(response === 404) {
            alert("Hayoloooo")

        } else if(response === 'Voucher Not Found!') {
            alert(response)
            window.location.reload()

        } else if(response === 'Voucher is invalid!') {
            alert(response)
            window.location.reload()

        } else {
            alert("Voucher valid")
            
        }

        if(voucher === undefined) {
            setVoucer(response)
            setAmount(response.amount)
        }

        setVoucer(response)
        setAmount(response.amount)
        console.log(voucher);
    }

    let money = 0
    const handleVoucherUse = async () => {
        money = proMoney + amount
        setProMoney(money)

        const response = await UpdateUserMoney(user.ID, Number(proMoney))

        if(response === 404) {
            alert("nah lo")
        }

        alert("Voucher successfully used")
        router.push("/account/settings")
    }

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>

            <div className={style.voucherBody}>
                <div className={style.title}>
                    Voucher Page
                </div>

                <div className={style.text}>
                    <br></br>
                    Current User Currency : Rp{proMoney}
                </div>

                <br></br>

                <div>
                    <RectangularInputField value={search} onChange={setSearch} required placeholder="Input Voucher Code" />
                    
                    <button className={style.voucherButton} onClick={handleVoucherValidation}>
                        Search Voucher Code
                    </button>
                </div>

                {voucher ? 
                    <div className={style.voucherBody}>
                        <div className={style.voucherTitle}>
                            Voucher
                        </div>

                        <div className={style.text}>
                            Voucher code: {voucher.code}
                        </div>

                        <div className={style.text}>
                            Voucher name: {voucher.name}
                        </div>

                        <div className={style.text}>
                            Voucher amount: Rp{voucher.amount}
                        </div>

                        <div className={style.text}>
                            Voucher description: {voucher.description}
                        </div>

                        <button className={style.voucherButton} onClick={handleVoucherUse}>
                            Use Voucher
                        </button>
                    </div>
                :
                    <div></div>
                }
            </div>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default AllVoucherPage;