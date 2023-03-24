import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import Navbar from "@/layout/navbar"
import { ThemeContext } from "@/pages/changer/themeChanger";
import RectangularInputField from "@/pages/components/RectangularInputField";
import Theme from "@/pages/components/Theme";
import style from '@/styles/shop/InsertShop.module.scss';
import Shop from "@/types/Shop";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react"
import SignUpNewStore from "@/api/insert-new-shop"
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import ShopUpperSetting from "@/pages/components/ShopUpperSetting";
import LowerNavbar from "@/layout/lowerNavbar";
import ShopNavbar from "@/layout/shopNavbar";

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

const InsertNewShop = () => {

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[url, setUrl] = useState('')
    
    const router = useRouter()
    const [role, setRole] = useState('')
    const {theme} = useContext(ThemeContext);

    async function handleFileChange(event:any) {
        const file = event.target.files[0];
        var files = await handleFileUpload(file);
        setUrl(files)
    }

    const handleFormSubmit = async (e:any) => {
        e.preventDefault();
        setRole(localStorage.getItem('role'))

        const newShop:Shop = {
            name: name,
            email: email,
            password: password,
            role_id: 3,
            status: "Active",
            image: url
        }

        const response = await SignUpNewStore(newShop)
        if(response === 404) {
            alert("Error in sign-up")
        } else {
            alert("Sign-up successfull! Account created.")
            router.push("/")
        }
    }

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ?     <ShopNavbar /> : <Navbar />} 
                <LowerNavbar />
            </header>

            <div>
                <ShopUpperSetting />

                <div style={{ backgroundColor : theme.white_gray, color: theme.black_white }} className={style.index}>
                    <div className={style.title}>
                        Insert Shop
                    </div>

                    <br></br>

                    <form onSubmit={handleFormSubmit} className={style.form}>
                        <RectangularInputField value={name} onChange={setName} required placeholder="Shop Name" />

                        <RectangularInputField value={email} onChange={setEmail} required placeholder="Email Address" email />

                        <RectangularInputField value={password} onChange={setPassword} required placeholder="Password" password />  

                        <input type="file" onChange={handleFileChange} />

                        <br></br>

                        <button  className={style.insertButton}>
                            Insert Shop
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

export default InsertNewShop;