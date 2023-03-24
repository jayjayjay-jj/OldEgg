import getShopById from "@/api/get-shop-by-id";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import Navbar from "@/layout/navbar";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import style from '@/styles/wishlist/WishlistHeader.module.scss'
import getWishlistHeaderById from "@/api/get-wishlist-by-id";
import { ThemeContext } from "@/pages/changer/themeChanger";
import UpdateWishlistHeader from "@/api/update-wishlist-header";
import ShopNavbar from "@/layout/shopNavbar";
import LowerNavbar from "@/layout/lowerNavbar";
import getProductById from "@/api/get-product-by-id";
import RectangularInputField from "@/pages/components/RectangularInputField";

const ShopDetailPage = () => {
    const router = useRouter();
    const {theme} = useContext(ThemeContext)

    const[name, setName] = useState('');
    const[categoryID, setCategoryID] = useState('1');
    const[shopID, setShopID] = useState('');
    const[description, setDescription] = useState('');
    const[price, setPrice] = useState();
    const[stock, setStock] = useState();
    const[details, setDetails] = useState('');
    const[url, setUrl] = useState('')

    const [role, setRole] = useState('')
    const [product, setProduct] = useState<any>();
    const [productID, setProductID] = useState<any>();
    
    useEffect(() => {
        setProductID(router.query.id);
    }, [router.query.id]);

    useEffect(() => {
        setRole(localStorage.getItem("role"))

        const get = async () => {
            const response = await getProductById(productID);

            setProduct(response);            
        }

        get();
        
    }, [productID]);

    // const handleSubmit = async () => {

    //     const response = await UpdateWishlistHeader(wishlistID, name, status);

    //     if (response == 404) alert("Something Went Wrong");
    //     else {
    //         alert('Wishlist updated!');
    //         router.push("/user/wishlist")
    //     }

    // };

    if (!product || Object.keys(product).length == 0) return <div>Loading ...</div>

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />} 
                <LowerNavbar />
            </header>

            <div className={style.updateIndex}>
                <div className={style.form}>
                    <div className={style.updateTitle}>
                        Update Product
                        {product.ID}
                    </div>

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

export default ShopDetailPage;