import RectangularInputField from "@/pages/components/RectangularInputField";
import { useEffect, useState } from "react"
import Navbar from "@/layout/navbar";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter"
import style from "@/styles/shop/InsertShop.module.scss";
import { useRouter } from "next/router";
import JWT from "@/types/JWTToken";
import getCookie from "@/util/getCookie";
import ShopAuthentication from "@/api/shop-authentication";
import 'firebase/firestore';
import ShopNavbar from "@/layout/shopNavbar";
import LowerNavbar from "@/layout/lowerNavbar";
import getShopDesc from "@/api/get-shop-desc-by-shop-id";
import UpdateShopDesc from "@/api/update-shop-desc";

const ChangeShopPersonal = () => {
    const [shop, setShop] = useState<any>()
    const [role, setRole] = useState("")

    const [name, setName] = useState('')
    const [id, setId] = useState()
    const [newDesc, setNewDesc] = useState('')
    const [desc, setDesc] = useState('')
    const [descs, setDescs] = useState<any>()
    const [url, setUrl] = useState('')
    const router = useRouter()

    let signIn = 0
    let message = ""

    useEffect(() => {
        const getCurrentShop = async () => {
            
            const JWT = getCookie("AuthenticationCookie")
            setRole(localStorage.getItem("role"))

            const token:JWT = {
                token_string: JWT
            }

            const shop = await ShopAuthentication(token)
            
            if(shop === 404) {
                signIn = 0
                alert("Server Error")
            
            } else if(shop === "Where is Cookie? 0_0null") {
                message = "Sign In / Register"

            } else {
                signIn = 100
                setShop(shop)
                setName(shop.name)
                setId(shop.ID)
            }
        }
        
        getCurrentShop()
    }, [])

    useEffect(() => {
        
        const getAllDesc = async () => {
            const response = await getShopDesc(Number(id))

            if(response === 404) {
                alert("Wengwong")
            }

            setDescs(response)
        }

        getAllDesc()

    }, [id])

    const handleSubmit = async () => {

        const response = await UpdateShopDesc(Number(desc), shop.ID, newDesc);
        if (response == 404) alert("Something Went Wrong");
        else {
            alert('Shop Information Updated!');
            router.push('/account/settings');

        }

    };

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />} 
                <LowerNavbar />
            </header>

            <div className={style.index}>

                <div className={style.title}>
                    Change Shop About Us
                </div>

                <br></br>

                {(id === shop.ID) ?
                <div>
                    <div>
                        <select className={style.selection} onChange={(e) => {setDesc(e.target.value)}}>
                            {descs && descs.map((desc: any) => {
                                return (
                                    <option value={desc.ID}>{desc.desc}</option>
                                    )
                                })}
                        </select>
                        
                        <br></br>
                        
                        <RectangularInputField required value={newDesc} onChange={setNewDesc} placeholder="Insert New Desc here"/>
                    </div>

                    <br></br>
                    <button className={style.insertButton} onClick={() => handleSubmit(desc)}>Change Shop Description</button>
                </div>
                :
                <div>
                    You're not authorized!!!
                </div>
                }
            </div>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default ChangeShopPersonal;