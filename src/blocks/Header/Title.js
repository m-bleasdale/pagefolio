import { React } from 'react';
import HeaderStyles from './Header.module.css';

export default function Title ({children, global}) {
    if(!children) return;

    return(
        <div className={HeaderStyles.Title}
            style={{
                color: global.foreground        
            }}
        >
        {children}
        </div>
    )
}