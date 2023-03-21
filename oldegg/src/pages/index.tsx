import Authentication from '@/api/authentication'
import JWT from '@/types/JWTToken'
import User from '@/types/User'
import getCookie from '@/util/getCookie'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import style from '@/styles/Home.module.scss'
import Navbar from '@/layout/navbar'
import Footer from '@/layout/footer'
import Carousel from '@/pages/components/Carousel'
import LowerFooter from '@/layout/lowerFooter'
import Shop from '@/types/Shop'
import ShopNavbar from '@/layout/shopNavbar'

export default function Home() {

  const [user, setUser] = useState<User>()
  const [shop, setShop] = useState<Shop>()
  const [role, setRole] = useState('');

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

  if(!user) {
    return <div>Loading</div>

  } else {
    return (
      <div className={style.index}>
        <header>
          {(role == "user") ? <Navbar /> : (role == "shop") ? <ShopNavbar /> : <Navbar />}
          
        </header>

        <div className={style.index}>
          <div>
            <Carousel />
          </div>
          <Link href='/account/sign-in'>Go to sign-in page</Link>
        </div>

        <footer>
          <Footer />
          <LowerFooter />
        </footer>
      </div>
    )

  }
}
