import getShopById from "@/api/get-shop-by-id";
import Footer from "@/layout/footer";
import LowerFooter from "@/layout/lowerFooter";
import Navbar from "@/layout/navbar";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import style from '@/styles/shop/ShopDetail.module.scss'
import { ThemeContext } from "../changer/themeChanger";
import ShowProductByShopPaginate from "@/api/show-product-by-shops-paginate";
import getProductByStock from "@/api/get-products-by-stock";

const UserDetailPage = () => {
    
    const router = useRouter();
    const [shopID, setShopID] = useState<any>();
    const [shop, setShop] = useState<any>();
    const [products, setProducts] = useState<any>();
    const [count, setCount] = useState(0);
    const [stock, setStock] = useState('All');

    const {theme} = useContext(ThemeContext);

    const[page, setPage] = useState(1)
    const[limit, setLimit] = useState(50)
    const[totalPage, setTotalPage] = useState(0)
    
    useEffect(() => {

        setShopID(router.query.id);

    }, [router.query.id]);

    useEffect(() => {

        const get = async () => {

            const response = await getShopById(shopID);
            setShop(response);
            
        }

        get();

    }, [shopID]);

    useEffect(() => {
        
        const getProductsPaginate = async() => {
            
            const response = await getProductByStock(shopID, stock, page, limit);

            console.log(response);

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

    }, [shopID, stock, page, limit]);

    if (!shop || Object.keys(shop).length == 0) return <div>Loading ...</div>

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
                <Navbar />
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
                            products.map((product: any) => {
                                return (
                                    <form className={style.productCard} style={{ backgroundColor : theme.white_gray }}>
                                        <div className={style.product}> 
                                            <div>
                                                <img src={product.image} className={style.image}/>
                                            </div>

                                            <div className={style.name} style={{ color: theme.darkBlue_lightBlue }}>
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

                    {/* <div style={{ color : theme.black_white }}>
                        {page}
                    </div> */}

                    <button className={style.button} onClick={onNextButtonClicked} style={{ backgroundColor : theme.gray_white }}>Next</button>
                </div>
            </div>

            <footer>
                <Footer />
                <LowerFooter />
            </footer>
        </div>
    );
}

export default UserDetailPage;