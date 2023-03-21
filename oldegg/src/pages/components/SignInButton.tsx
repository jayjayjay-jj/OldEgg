import React from 'react'
import style from '@/pages/components/SignInButton.module.scss'
import Link from 'next/link';

export default function SignInButton() {

    return (
        <div className={style.index}>
            <div className={style.upperButton}>
                <Link href='/account/sign-in' className={style.link}>User</Link>
            </div>

            <div className={style.upperButton}>
                <Link href='/shop/shop-sign-in' className={style.link}>Shop</Link>
            </div>
        </div>
    )
}
