import React, { useContext } from 'react'
import style from '@/pages/components/Theme.module.scss'
import { ThemeContext } from '@/pages/changer/themeChanger';

export default function Theme() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className={style.index} >
            <label className={style.switch}>
                <input type='checkbox' onClick={ toggleTheme } />
                <span className={style.slider}></span>
            </label>
        </div>
    )
}
