/*Sub-block only*/

import { React } from 'react';
import ParagraphStyles from './Paragraph.module.css';

export default function Paragraph({children, align, global}) {
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
                color: global.foreground
            }}
            >
                {children}
            </p>
        </div>
    )
}

