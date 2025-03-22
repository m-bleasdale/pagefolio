import { React } from 'react';
import HeaderStyles from './Header.module.css';

export default function SubTitle ({children, global}) {
    if(!children) return;

    return(
        <div className={HeaderStyles.SubTitle}
            style={{
                color: global.foreground_light
            }}
        >
        {children}
        </div>
    )
}