import Authentication from '@/api/authentication'
import JWT from '@/types/JWTToken'
import User from '@/types/User'
import getCookie from '@/util/getCookie'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import style from '../styles/page.module.scss'
import Navbar from '@/layout/navbar'
import Footer from '@/layout/footer'
import LowerFooter from '@/layout/lowerFooter'

export default function Home() {

  const [user, setUser] = useState<User>()

  useEffect(() => {
    const getCurrentUser = async () => {
      const JWT = getCookie("AuthenticationCookie")
      // console.log(JWT)

      const token:JWT = {
        token_string: JWT
      }

      // console.log(JWT)
      const user = await Authentication(token)
      console.log(token)
      console.log(user)

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
      <>
        <header>
          <Navbar />
        </header>

          <Link href='/account/sign-in'>Go to sign-in page</Link>
          <p>{user.first_name}</p>
          {console.log(user.first_name)}

        <footer>
          <Footer />
          <LowerFooter />
        </footer>
      </>
    )

  }
}
