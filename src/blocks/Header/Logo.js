import { React } from 'react';

export default function Logo ({source, LayoutStyles}) {
    if(!source) return;

    return(
        <div className={LayoutStyles.Logo}>
            <img src={source} alt='Logo'/>
        </div>
    )
    
}
