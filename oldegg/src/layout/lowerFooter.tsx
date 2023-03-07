import style from '@/styles/layout/LowerFooter.module.scss'
import Link from 'next/link';
import facebook from '@/assets/socials/facebook.png'
import twitter from '@/assets/socials/twitter.png'
import instagram from '@/assets/socials/instagram.png'
import linkedin from '@/assets/socials/linkedin.png'
import pinterest from '@/assets/socials/pinterest.png'
import youtube from '@/assets/socials/youtube.png'  
import twitch from '@/assets/socials/twitch.png'  
import discord from '@/assets/socials/discord.png'  
import tiktok from '@/assets/socials/tiktok.png'  
import Image from 'next/image';
import { useContext } from 'react';
import { ThemeContext } from '@/pages/changer/themeChanger';

export default function LowerFooter() {
    const { theme } = useContext(ThemeContext);

    return ( 
        <>
            <div className={style.index} style={{ backgroundColor : theme.white_gray }}>
                <div className={style.left} style={{ color : theme.black_white }}>
                    <div className={style.copyright}>
                            © 2023 Oldegg Inc. All rights reserved.
                    </div>

                    <div>
                        <Link href="/" className={style.link} style={{ color : theme.black_white }}>Terms & Conditions</Link>
                    </div>
                    
                    <div>
                        <Link href="/" className={style.link} style={{ color : theme.black_white }}>Privacy Policy</Link>
                    </div>
                    
                    <div>
                        <Link href="/" className={style.link} style={{ color : theme.black_white }}>Cookie Preferences</Link>
                    </div>
                </div>

                <div className={style.right}>
                    <Link href="https://www.facebook.com/Newegg" ><Image src={facebook} alt="facebook" className={style.image}></Image></Link>
                    <Link href="https://www.twitter.com/Newegg"><Image src={twitter} alt="twitter" className={style.image}></Image></Link>
                    <Link href="https://www.instagram.com/Newegg"><Image src={instagram} alt="instagram" className={style.image}></Image></Link>
                    <Link href="https://www.linkedin.com/company/Newegg-com"><Image src={linkedin} alt="linkedin" className={style.image}></Image></Link>
                    <Link href="https://www.pinterest.com/Newegg/"><Image src={pinterest} alt="pinterest" className={style.image}></Image></Link>
                    <Link href="https://www.youtube.com/user/Newegg"><Image src={youtube} alt="youtube" className={style.image}></Image></Link>
                    <Link href="https://www.twitch.tv/Newegg"><Image src={twitch} alt="twitch" className={style.image}></Image></Link>
                    <Link href="https://discordapp.com/invite/Newegg"><Image src={discord} alt="discord" className={style.image}></Image></Link>
                    <Link href="https://www.tiktok.com/@newegg"><Image src={tiktok} alt="tiktok" className={style.image}></Image></Link>
                </div>
            </div>
        </>
    );
}
