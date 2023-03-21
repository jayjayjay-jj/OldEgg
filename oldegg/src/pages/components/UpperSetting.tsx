import React from 'react'
import style from '@/pages/components/ShopUpperSetting.module.scss'
import Link from 'next/link';

export default function UpperSetting() {

    return (
        <div className={style.index}>
            <div className={style.upperButton}>
                <Link href='/admin/users' className={style.link}>User</Link>
            </div>

            <div className={style.upperButton}>
                <Link href='/admin/shops/shops' className={style.link}>Shop</Link>
            </div>

            <div className={style.upperButton}>
                <Link href='/admin/vouchers/vouchers' className={style.link}>Voucher</Link>
            </div>
        </div>
    )
}
