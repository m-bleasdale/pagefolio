/*Sub-block only*/

import { React } from 'react';
import ParagraphStyles from './Paragraph.module.css';

export default function Paragraph({children, align, colour}) {
    if (!children) return;

    const lines = children.split('\n');

    return (
        <div
            className={ParagraphStyles.Container}
            style={{
                textAlign: align
            }}
        >
            {lines.map((line, index) => (
                <p
                    key={index}
                    className={ParagraphStyles.Text}
                    style={{
                        color: colour
                    }}
                >
                    {line || <br />}
                </p>
            ))}
        </div>
    );
}

