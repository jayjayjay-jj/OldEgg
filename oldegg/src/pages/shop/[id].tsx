import getShopById from "@/api/get-shop-by-id";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import Navbar from "@/layout/navbar";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import style from '@/styles/shop/ShopDetail.module.scss'
import { ThemeContext } from "../changer/themeChanger";
import getProductByStock from "@/api/get-products-by-stock";
import LowerNavbar from "@/layout/lowerNavbar";
import ShopNavbar from "@/layout/shopNavbar";
import getShopByCategories from "@/api/get-shop-categories";
import getShopDesc from "@/api/get-shop-desc-by-shop-id";
import getOrderDetailsByShop from "@/api/get-order-detail-by-shop";

const ShopDetailPage = () => {
    
    const router = useRouter();
    const [shopID, setShopID] = useState<any>();
    const [shop, setShop] = useState<any>();
    const [count, setCount] = useState(0);
    const [stock, setStock] = useState('All');
    
    const {theme} = useContext(ThemeContext);
    const [role, setRole] = useState('')
    const [categories, setCategories] = useState<any>()
    const [products, setProducts] = useState<any>();
    const [descs, setDescs] = useState<any>()
    const [details, setDetails] = useState<any>()
    const [detailsQuantity, setDetailsQuantity] = useState<any>()

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(50)
    const [totalPage, setTotalPage] = useState(0)

    let initQuan = 0
    
    useEffect(() => {
        setShopID(router.query.id);
    }, [router.query.id]);

    useEffect(() => {
        setRole(localStorage.getItem('role'))

        const get = async () => {

            const response = await getShopById(shopID);
            setShop(response);
            
        }

        get();

    }, [shopID]);

    useEffect(() => {
        
        const getProductsPaginate = async() => {
            
            const response = await getProductByStock(shopID, stock, page, limit);

            if(response === 404) {
                alert("Something went wrong!")
            }

            if (response.length === 0){
                setPage(page - 1);
                return;
            }

            setProducts(response)
            
            const total = Math.ceil(response.length / limit);
            setTotalPage(total);
            
        }

        getProductsPaginate();

        const getShopCategories = async() => {
            const response = await getShopByCategories(shopID);

            if(response === 404) {
                alert("Something wengwong")
            }
            
            setCategories(response)
        }

        getShopCategories();
        
    }, [shopID, stock, page, limit, products]);

    useEffect(() => {

        const getAllDesc = async () => {
            const response = await getShopDesc(shopID)

            if(response === 404) {
                alert("weng wong lagi kan")
            }

            setDescs(response)
        }

        getAllDesc()

        const getOrderDetail = async () => {
            const response = await getOrderDetailsByShop(shopID)

            if(response === 404) {
                alert(":P")
            }

            setDetails(response)
            console.log(response);
            
        }

        getOrderDetail()
        

    }, [shopID])

    useEffect(() => {

        if(details) {
            details.forEach((detail:any) => {
                console.log(detail.quantity);
                
                initQuan += detail.quantity
                setCount(initQuan)
            })
        }

    }, [descs])

    if (!descs || !categories || !shop || Object.keys(shop).length == 0) return <div>Loading ...</div>

    const goToDetail = (id: Number) => {
        router.push('/shop/products/' + id);
    }

    const onPrevButtonClicked = () => {

        if (page !== 1) setPage(page - 1); 

    }

    const onNextButtonClicked = () => {

        setPage(page + 1);

    }

    if(products === undefined) {
        return (
            <div>Loading...</div>
        )
    }

    return ( 
        <div>
            <header>
                {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
                <LowerNavbar />
            </header>

            <div>
                <div className={style.bannerCont}>
                    <img src={shop.image}  className={style.banner}/>
                </div>

                <div className={style.outer}>
                    <div className={style.body}>
                        <div className={style.shopName}>
                            <h1>{shop.name}</h1>
                        </div> 

                        <div className={style.left}>
                            Categories: 
                            {
                                categories && categories.map((category: any) => {
                                    return (
                                        <div className={style.categories}>
                                            {category.category_name}
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className={style.blanket}>
                            <div className={style.left}>
                                Product Count : {products.length}
                            </div> 

                            <div className={style.right}>
                                <select id="categories" onChange={(e) => {setStock(e.target.value)}} className={style.selection}>
                                    <option value="All">All</option>
                                    <option value="Available">Available</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={style.index}>
                        {
                            (products.length === 0) ? "No products" : 
                            products.map((product: any) => {
                                return (
                                    <form className={style.productCard} style={{ backgroundColor : theme.white_gray }}>
                                        <div className={style.product}> 
                                            <div>
                                                <img src={product.image} className={style.image}/>
                                            </div>

                                            <div className={style.name} style={{ color: theme.darkBlue_lightBlue }} onClick={() => goToDetail(product.ID)}>
                                                {product.name}
                                            </div>

                                            <div className={style.price} style={{ color: theme.black_white }}>
                                                Rp{product.price}
                                            </div>

                                            <div className={style.stock} style={{ color: theme.black_white }}>
                                                Stock: {product.stock}
                                            </div>
                                        </div>
                                    </form>
                            )})
                        }
                    </div>
                </div>
                            
                <div className={style.paginateButton}>
                    <button className={style.button} onClick={onPrevButtonClicked} style={{ backgroundColor : theme.gray_white }}>Prev</button>
                    <button className={style.button} onClick={onNextButtonClicked} style={{ backgroundColor : theme.gray_white }}>Next</button>
                </div>

                <div className={style.lowerBody}>
                    <div className={style.lowerTitle}>
                        Shop About Us
                    </div>

                    <hr></hr>

                    <div className={style.lowerCont}>
                        {descs && descs.map((desc: any) => {
                            return (
                                <div className={style.lowerText}>
                                    {desc.desc}
                                </div>
                            )
                        })}
                    </div>

                    <br></br>
                    
                    <div className={style.lowerText}>
                        Number of Sales: {count}
                    </div>
                    
                    <br></br>
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