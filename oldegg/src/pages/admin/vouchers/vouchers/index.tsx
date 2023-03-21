import { ThemeContext } from "@/pages/changer/themeChanger";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const AllVoucherPage = () => {
    const[vouchers, setVouchers] = useState([])
    const router = useRouter()
    const {theme} = useContext(ThemeContext)

    return ( 
        <div>
            asd
        </div>
    );
}

export default AllVoucherPage;