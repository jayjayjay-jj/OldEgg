import style from '@/styles/layout/Footer.module.scss'
import Link from 'next/link';

const Footer = () => {
    return ( 
        <div className={style.index}>
            <div className={style.content}>

                <div className={style.grid}>
                    <div className={style.gridCol}>
                        <div className={style.title}>CUSTOMER SERVICE</div>

                        <br></br>

                        <div className={style.ul}>
                            <ul className={style.list}>
                                <li>
                                    <Link href="/" className={style.link}>Help Center</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Track an Order</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Return an Item</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Return Policy</Link>
                                </li>
                                    
                                <li>
                                    <Link href="/" className={style.link}>Privacy & Security</Link>
                                </li>
                                    
                                <li>
                                    <Link href="/" className={style.link}>Feedback</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={style.grid}>
                    <div className={style.gridCol}>
                        <div className={style.title}>MY ACCOUNT</div>

                        <br></br>

                        <div className={style.ul}>
                            <ul className={style.list}>
                                <li>
                                    <Link href="/account/sign-in" className={style.link}>Login/Register</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Order History</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Returns History</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Address Book</Link>
                                </li>
                                    
                                <li>
                                    <Link href="/" className={style.link}>Wish Lists</Link>
                                </li>
                                    
                                <li>
                                    <Link href="/" className={style.link}>My Build Lists</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>My Build Showcase</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Email Notifications</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Subscriptions Orders</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Auto Notifications</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={style.grid}>
                    <div className={style.gridCol}>
                        <div className={style.title}>COMPANY INFORMATION</div>

                        <br></br>

                        <div className={style.ul}>
                            <ul className={style.list}>
                                <li>
                                    <Link href="/" className={style.link}>About Newegg</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Investor Relations</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Awards/Rankings</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Hours and Locations</Link>
                                </li>
                                    
                                <li>
                                    <Link href="/" className={style.link}>Press Inquiries</Link>
                                </li>
                                    
                                <li>
                                    <Link href="/" className={style.link}>Newegg Careers</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Newsroom</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Newegg Insider</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Calif. Transparency in Supply Chains Art</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Cigna MRF</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={style.grid}>
                    <div className={style.gridCol}>
                        <div className={style.title}>TOOLS & RESOURCES</div>

                        <br></br>

                        <div className={style.ul}>
                            <ul className={style.list}>
                                <li>
                                    <Link href="/" className={style.link}>Sell on Newegg</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>For Your Business</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Newegg Partner Services</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Become an Affiliate</Link>
                                </li>
                                    
                                <li>
                                    <Link href="/" className={style.link}>Newegg Creators</Link>
                                </li>
                                    
                                <li>
                                    <Link href="/" className={style.link}>Site Map</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Shop by Brand</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Rebates</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Mobile Apps</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={style.grid}>
                    <div className={style.gridCol}>
                        <div className={style.title}>SHOP OUR BRANDS</div>

                        <br></br>

                        <div className={style.ul}>
                            <ul className={style.list}>
                                <li>
                                    <Link href="/" className={style.link}>Newegg Business</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Newegg Global</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>ABS</Link>
                                </li>

                                <li>
                                    <Link href="/" className={style.link}>Rosewill</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;