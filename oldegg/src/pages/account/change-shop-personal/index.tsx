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
import UpdateShopInformation from "@/api/update-shop-information";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import ShopNavbar from "@/layout/shopNavbar";
import LowerNavbar from "@/layout/lowerNavbar";

// firebase config here 
const firebaseConfig = {
    apiKey: "AIzaSyAXFxgRVIZXPztWLmq_xSFm7J_3m-uH5eI",
    authDomain: "test-ef6c0.firebaseapp.com",
    projectId: "test-ef6c0",
    storageBucket: "test-ef6c0.appspot.com",
    messagingSenderId: "134767382712",
    appId: "1:134767382712:web:94989969ca5ab737be244d",
    measurementId: "G-RTLJ5XCEYY"
};

const app = initializeApp(firebaseConfig)
const storage = getStorage(app);
export const db = getFirestore(app)

export function handleFileUpload(file:any) {
    return new Promise((resolve, reject) => {

        const storageRef = ref(storage, `images/${file.name}`);

        uploadBytes(storageRef, file).then(() => {
            console.log("File uploaded successfully");

            getDownloadURL(storageRef).then((url:any) => {
    
                resolve(url);
                console.log(url);
                
                
            }).catch((error:any) => {
                    console.error(error);
                    reject(error);
            });
        }).catch((error:any) => {
            console.error(error);
            reject(error);
        });
    });
}

const ChangeShopPersonal = () => {
    const[shop, setShop] = useState<any>()
    const[role, setRole] = useState("")

    const[name, setName] = useState('')
    const[url, setUrl] = useState('')
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
            }
        }
        
        getCurrentShop()
    }, [])

    async function handleFileChange(event:any) {
        const file = event.target.files[0];
        var files = await handleFileUpload(file);
        setUrl(files)
    }

    const handleSubmit = async () => {

        const response = await UpdateShopInformation(shop.ID, name, url);
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
                    Change Shop Name and Banner
                </div>

                <br></br>

                <div>
                
                </div>

                <div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={style.inputField} placeholder={name}/>
                </div>

                <br></br>
                <input type="file" onChange={handleFileChange}  />

                <br></br>
                <button className={style.insertButton} onClick={() => handleSubmit(shop?.ID)}>Change Phone Number</button>
            </div>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default ChangeShopPersonal;