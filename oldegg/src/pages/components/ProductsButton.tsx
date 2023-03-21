import React from 'react'
import style from '@/pages/components/ProductsButton.module.scss'
import Link from 'next/link';

export default function ProductsButton() {

    return (
        <div className={style.index}>
            <div className={style.upperButton}>
                <Link href='/shop/products' className={style.link}>Products</Link>
            </div>

            <div className={style.upperButton}>
                <Link href='/shop/products/add-products' className={style.link}>Add Product</Link>
            </div>
        </div>
    )
}
