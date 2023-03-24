import Authentication from '@/api/authentication'
import JWT from '@/types/JWTToken'
import User from '@/types/User'
import getCookie from '@/util/getCookie'
import { useContext, useEffect, useState } from 'react'
import style from '@/styles/Home.module.scss'
import Navbar from '@/layout/navbar'
import Footer from '@/layout/footer'
import Carousel from '@/pages/components/Carousel'
import LowerFooter from '@/layout/lowerFooter'
import Shop from '@/types/Shop'
import ShopNavbar from '@/layout/shopNavbar'
import Product from '@/types/Product'
import ShowAllProductPaginate from '@/api/show-all-product-paginate'
import { ThemeContext } from './changer/themeChanger'
import ShowAllCategories from '@/api/show-all-categories'
import ShowHomeScrollingProduct from '@/api/show-home-product-scrolling'
import LowerNavbar from '@/layout/lowerNavbar'

export default function Home() {

  const [user, setUser] = useState<User>()
  const [shop, setShop] = useState<Shop>()
  const [products, setProducts] = useState<any>([])
  const [categories, setCategories] = useState<any>()

  const [role, setRole] = useState('');

  const {theme} = useContext(ThemeContext)

  const[page, setPage] = useState(1)
  const[loading, setLoading] = useState(false)

  useEffect(() => {
    const getCurrentUser = async () => {
      const JWT = getCookie("AuthenticationCookie")
      setRole(localStorage.getItem("role"))

      const token:JWT = {
        token_string: JWT
      }

      // console.log(JWT)
      const user = await Authentication(token)

      if(user === 404) {
        alert("Server Error")

      } else {
        setUser(user)
      }
    }

    getCurrentUser()
  }, [])
  
  const loadProd = async() => {
    if(loading) return;
    setLoading(true)

    try {
      const response = await ShowHomeScrollingProduct(page);

        if(response === 404) {
            alert("Something went wrong!")
        }

        
        setProducts(prevProducts => [...prevProducts, ...response])
        console.log(response);
        console.log(page);
        
        setPage(page + 1)  

    } catch(error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {    
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }

  }, [products, page]);

  const handleScroll = () => {
    
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement
    
    if(scrollTop + clientHeight >= scrollHeight - 10) {
      console.log("it's bottom");
      
      loadProd()
    }
  }

  useEffect(() => {
    const getAllCategories = async() => {
      const response = await ShowAllCategories();

      if(response === 404) {
        alert("Something went wrong!")
      }

      setCategories(response)
    }

    getAllCategories()
  }, [])

  if(!user || !products || !categories) {
    return <div>Loading</div>

  } else {
    return (
      <div className={style.index}>
        <header>
          {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
          <LowerNavbar />
        </header>

        <div className={style.body} style={{ backgroundColor: theme.white_gray }}>
          <div>
            <Carousel />
          </div>

          <div className={style.categoryIndex}>
            {
              categories.map((category: any) => {
                return (
                  <div className={style.categoryCard} style={{ backgroundColor: theme.lightBlue_darkBlue }}>
                    {category.category_name}
                  </div>
                )
              })
            }
          </div>
          
          <div className={style.cardIndex}>
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
                )
              })
            }
          </div>
          {loading && <p>Loading...</p>}
        </div>

        <footer>
          <Footer />
          <LowerFooter />
        </footer>
      </div>
    )

  }
}
