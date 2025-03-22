/*Sub-block only*/

import { React } from 'react';
import HeadingStyles from './Heading.module.css';

export default function Heading({children, align, global}){
    return(
        <div 
        className={HeadingStyles.Container}
        style={{
            textAlign: align
        }}
        >
            <p 
            className={HeadingStyles.Text}
            style={{
                color: global.foreground
            }}
            >
                {children}
            </p>
        </div>
    )
}