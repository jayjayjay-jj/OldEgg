import AddNewVoucher from "@/api/insert-new-voucher";
import { ThemeContext } from "@/pages/changer/themeChanger";
import RectangularInputField from "@/pages/components/RectangularInputField";
import Voucher from "@/types/Voucher";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import style from '@/styles/shop/InsertShop.module.scss';
import Navbar from "@/layout/navbar";
import ShopUpperSetting from "@/pages/components/ShopUpperSetting";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";

const InsertNewVoucher = () => {
    const[name, setName] = useState('');
    const[code, setCode] = useState('');
    const[description, setDescription] = useState('');
    const[amount, setAmount] = useState();

    const router = useRouter()
    const {theme} = useContext(ThemeContext)

    const handleFormSubmit = async(e:any) => {
        e.preventDefault();

        const newVoucher:Voucher = {
            name: name,
            code: code,
            description: description,
            amount: Number(amount)
        }

        const response = await AddNewVoucher(newVoucher)
        if(response === 404) {
            alert("Something went wrong!")
        }

        alert("New voucher successfully inserted!")
        router.push("/admin/vouchers/vouchers")
    }

    return ( 
        <div>
            <header>
                <Navbar />
            </header>

            <div>
                <ShopUpperSetting />

                <div style={{ backgroundColor : theme.white_gray, color: theme.black_white }} className={style.index}>
                    <div className={style.title}>
                        Insert Voucher
                    </div>

                    <br></br>

                    <form onSubmit={handleFormSubmit} className={style.form}>
                        <RectangularInputField value={name} onChange={setName} required placeholder="Voucher Name" /> 

                        <RectangularInputField value={code} onChange={setCode} required placeholder="Voucher Code" /> 

                        <RectangularInputField value={description} onChange={setDescription} required placeholder="Voucher Description" />

                        <input type="number" value={amount} onChange={(e:any) => {setAmount(e.target.value)}} required placeholder="Voucher Amount" className={style.inputField} />

                        <br></br>

                        <button  className={style.insertButton}>
                            Insert Voucher
                        </button> 
                    </form>
                </div>
            </div>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default InsertNewVoucher;