import style from '@/styles/layout/LowerFooter.module.scss'
import Link from 'next/link';
import facebook from '@/assets/socials/facebook.png'
import twitter from '@/assets/socials/twitter.png'
import instagram from '@/assets/socials/instagram.png'
import linkedin from '@/assets/socials/linkedin.png'
import Image from 'next/image';

const LowerFooter = () => {
    return ( 
        <>
            <div className={style.index}>
                <div className={style.left}>
                    <div className={style.copyright}>
                            © 2023 Oldegg Inc. All rights reserved.
                    </div>

                    <div>
                        <Link href="/" className={style.link}>Terms & Conditions</Link>
                    </div>
                    
                    <div>
                        <Link href="/" className={style.link}>Privacy Policy</Link>
                    </div>
                    
                    <div>
                        <Link href="/" className={style.link}>Cookie Preferences</Link>
                    </div>
                </div>

                <div className={style.right}>
                    <Link href="/"><Image src={facebook} alt="facebook" className={style.image}></Image></Link>
                    <Link href="/"><Image src={twitter} alt="twitter" className={style.image}></Image></Link>
                    <Link href="/"><Image src={instagram} alt="instagram" className={style.image}></Image></Link>
                    <Link href="/"><Image src={linkedin} alt="linkedin" className={style.image}></Image></Link>
                    <Link href="/"><Image src={facebook} alt="pinterest" className={style.image}></Image></Link>
                    <Link href="/"><Image src={facebook} alt="youtube" className={style.image}></Image></Link>
                    <Link href="/"><Image src={facebook} alt="twitch" className={style.image}></Image></Link>
                    <Link href="/"><Image src={facebook} alt="discord" className={style.image}></Image></Link>
                    <Link href="/"><Image src={facebook} alt="tiktok" className={style.image}></Image></Link>
                </div>
            </div>
        </>
    );
}

export default LowerFooter;