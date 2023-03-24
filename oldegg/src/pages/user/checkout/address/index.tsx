import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import LowerNavbar from "@/layout/lowerNavbar";
import Navbar from "@/layout/navbar";
import ShopNavbar from "@/layout/shopNavbar";
import { useEffect, useState } from "react";
import style from '@/styles/checkout/Checkout.module.scss'
import RectangularInputField from "@/pages/components/RectangularInputField";
import getCookie from "@/util/getCookie";
import JWT from "@/types/JWTToken";
import Authentication from "@/api/authentication";
import AddNewAddress from "@/api/insert-new-address";
import Address from "@/types/Address";
import getAddressByUserId from "@/api/get-addresses-by-user";
import DeleteAddress from "@/api/delete-address";
import Link from "next/link";

const ManageAddress = () => {
    const [userID, setUserID] = useState()
    const [address, setAddress] = useState('')

    const [user, setUser] = useState<any>()
    const [addresses, setAddresses] = useState<any>()
    const [role, setRole] = useState('')
    
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

            } else {
                setUser(user)
                setUserID(user.ID)
            }
        }
        getCurrentUser()        

        const getUserAddreses = async () => {
            const response = await getAddressByUserId(Number(userID))

            if(response === 404) {
                alert("Something went wrong")
            }

            setAddresses(response)
            console.log(response);
            
        }

        getUserAddreses()

    },[userID])

    const handleInsertAddress = async (e:any) => {
        e.preventDefault()

        const newAddress:Address = {
            user_id: userID,
            address_name: address
        }

        const response = await AddNewAddress(newAddress)

        if(response === 404) {
            alert("Something weng wong")
        }

        alert("New Address successfully inserted!")
        window.location.reload()
    }

    const handleDeleteAddress = async (id: Number) => {
        const response = await DeleteAddress(id)

        if(response === 404) {
            alert("Something weng wong")
        }

        alert("Delete address succesfull")
        window.location.reload()
    }

    if(!addresses || addresses.length === 0) <div>Loading...</div>

    return ( 
        <div>
            <header>
                {(role === 'user') ? <Navbar /> : (role === "shop") ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>

            <div className={style.index}>
                <div className={style.title}>
                    Manage Address
                </div>

                <div className={style.body}>
                    {addresses && addresses.map((address:any) => {
                        return (
                            <div className={style.card}>
                                <div className={style.cardTitle}>
                                    {address.address_name}
                                </div>

                                <button className={style.deleteButton} onClick={(e) => {handleDeleteAddress(address.ID)}}>Delete</button>
                            </div>
                        )
                    })}
                </div>

                <form onSubmit={handleInsertAddress} className={style.form}>
                    <div className={style.cardTitle}>
                        <br />
                        Add Address
                    </div>

                    <br />
                    <RectangularInputField  value={address} onChange={setAddress} required placeholder="Address"/>

                    <div>
                        <br />
                        <button className={style.inputButton}>
                            Add Address
                        </button>
                    </div>

                    <br />
                    <button className={style.inputButton}>
                        <Link className={style.buttonLink} href='/user/checkout'>Back to Checkout Page</Link>
                    </button>
                </form>
            </div>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default ManageAddress;