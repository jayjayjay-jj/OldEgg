import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import Navbar from "@/layout/navbar";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import style from '@/styles/shop/InsertShop.module.scss'
import { ThemeContext } from "@/pages/changer/themeChanger";
import ShopNavbar from "@/layout/shopNavbar";
import LowerNavbar from "@/layout/lowerNavbar";
import getProductById from "@/api/get-product-by-id";
import RectangularInputField from "@/pages/components/RectangularInputField";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import UpdateProduct from "@/api/update-product";
import ShopAuthentication from "@/api/shop-authentication";
import JWT from "@/types/JWTToken";
import getCookie from "@/util/getCookie";

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

const ShopDetailPage = () => {
    const router = useRouter();
    const {theme} = useContext(ThemeContext)

    const[name, setName] = useState('');
    const[categoryID, setCategoryID] = useState(1);
    const[shopID, setShopID] = useState('');
    const[description, setDescription] = useState('');
    const[price, setPrice] = useState();
    const[stock, setStock] = useState();
    const[details, setDetails] = useState('');
    const[url, setUrl] = useState('')

    const [role, setRole] = useState('')
    const [product, setProduct] = useState<any>();
    const [shop, setShop] = useState<any>()
    const [productID, setProductID] = useState<any>();

    let message = ""

    async function handleFileChange(event:any) {
        const file = event.target.files[0];
        var files = await handleFileUpload(file);
        setUrl(files)
    }
    
    useEffect(() => {
        setProductID(router.query.id);
    }, [router.query.id]);

    useEffect(() => {
        const getCurrentShop = async () => {
            const JWT = getCookie("AuthenticationCookie")

            const token:JWT = {
                token_string: JWT
            }

            const shop = await ShopAuthentication(token)
            
            if(shop === 404) {
                alert("Server Error")
            
            } else if(shop === "Where is Cookie? 0_0null") {
                message = "Sign In / Register"

            } else {
                setShop(shop)

            }
        }

        getCurrentShop()
    }, [])

    useEffect(() => {
        setRole(localStorage.getItem("role"))

        const get = async () => {
            const response = await getProductById(productID);

            setProduct(response);  
            setName(response.name)  
            setPrice(response.price)
            setStock(response.stock)        
            setDescription(response.description)
            setDetails(response.details)
            setShopID(response.shop_id)
        }
        
        get();
        
    }, [productID]);

    const handleSubmit = async () => {

        const response = await UpdateProduct(productID, name, Number(categoryID), url, description, Number(price), Number(stock), details);

        if (response === 404 || response === -1) {
            alert("Something Went Wrong");
        } else {
            alert('Product updated!');
            console.log("abc");
            
        }

        router.push("/")  
    };

    if (!product || Object.keys(product).length == 0) return <div>Loading ...</div>

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />} 
                <LowerNavbar />
            </header>

            <div className={style.index}>
                {(shop.ID === product.shop_id) ? 
                <div className={style.form}>
                    <div className={style.title}>
                        Update Product
                    </div>

                    <br></br>

                    <form className={style.form}>

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

                        <button  className={style.insertButton} onClick={() => handleSubmit(product.ID)}>
                            Update Product
                        </button> 
                    </form>
                </div>
                :
                <div className={style.title}>
                    You're not authorized to update this product ＞︿＜
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

export default ShopDetailPage;