import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import Navbar from "@/layout/navbar"
import { ThemeContext } from "@/pages/changer/themeChanger";
import RectangularInputField from "@/pages/components/RectangularInputField";
import Theme from "@/pages/components/Theme";
import style from '@/styles/shop/InsertShop.module.scss';
import Shop from "@/types/Shop";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import Product from "@/types/Product";
import SignNewProduct from "@/api/insert-new-product";
import getCookie from "@/util/getCookie";
import JWT from "@/types/JWTToken";
import ShopAuthentication from "@/api/shop-authentication";
import ShopNavbar from "@/layout/shopNavbar";
import ProductsButton from "@/pages/components/ProductsButton";

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

const InsertNewProduct = () => {

    const[name, setName] = useState('');
    const[categoryID, setCategoryID] = useState('1');
    const[shopID, setShopID] = useState('');
    const[description, setDescription] = useState('');
    const[price, setPrice] = useState();
    const[stock, setStock] = useState();
    const[details, setDetails] = useState('');
    const[url, setUrl] = useState('')
    const[role, setRole] = useState('');
    
    const router = useRouter()
    const {theme} = useContext(ThemeContext);
    const [shop, setShop] = useState<Shop>()

    async function handleFileChange(event:any) {
        const file = event.target.files[0];
        var files = await handleFileUpload(file);
        setUrl(files)
    }

    const handleFormSubmit = async (e:any) => {
        e.preventDefault();

        const newProduct:Product = {
            name: name,
            category_id: Number(categoryID),
            shop_id: shop?.ID,
            image: url,
            description: description,
            price: Number(price),
            stock: Number(stock),
            details: details
        }
        
        const response = await SignNewProduct(newProduct)
        if(response === 404) {
            alert("Error in insert-new-product")
        } else {
            alert("New Products successfully inserted!.")
            window.location.reload()
        }
    }

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

            }
        }

        getCurrentShop()
    }, [])

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
            </header>

            <div>
                <div style={{ backgroundColor : theme.white_gray, color: theme.black_white }} className={style.index}>
                    <ProductsButton />

                    <div className={style.title}>
                        Insert Product
                    </div>

                    <br></br>

                    <form onSubmit={handleFormSubmit} className={style.form}>
                        {/* <div>{shop?.ID}</div>
                        <div>{shop?.name}</div> */}

                        <RectangularInputField value={name} onChange={setName} required placeholder="Product Name" />

                        <input type="number" value={price} onChange={(e:any) => {setPrice(e.target.value)}} required placeholder="Product Price" className={style.inputField} />

                        <input type="number" value={stock} onChange={(e:any) => {setStock(e.target.value)}} required placeholder="Product Stock" className={style.inputField} />

                        <RectangularInputField value={description} onChange={setDescription} required placeholder="Product Description" />

                        <RectangularInputField value={details} onChange={setDetails} required placeholder="Product Details" />

                        <div>
                            <select id="categories" onChange={(e) => {setCategoryID(e.target.value)}} className={style.inputField}>
                                <option value="1">Software</option>
                                <option value="2">Sporting Good</option>
                                <option value="3">Drones</option>
                                <option value="4">TVs</option>
                                <option value="5">Cell Phones</option>
                                <option value="6">PCs & Monitors</option>
                                <option value="7">Home Audio</option>
                                <option value="8">Office Furniture</option>
                            </select>
                        </div>

                        <input type="file" onChange={handleFileChange}  />

                        <br></br>

                        <button  className={style.insertButton}>
                            Insert Product
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

export default InsertNewProduct;