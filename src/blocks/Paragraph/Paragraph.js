/*Sub-block only*/

import { React } from 'react';
import ParagraphStyles from './Paragraph.module.css';

export default function Paragraph({children, align, colour}) {
    if(!children) return;

    return(
        <div 
        className={ParagraphStyles.Container}
        style={{
            textAlign: align
        }}
        >
            <p 
            className={ParagraphStyles.Text}
            style={{
                color: colour
            }}
            >
                {children}
            </p>
        </div>
    )
}

