import { React } from 'react';
import AboutStyles from './About.module.css';
import Heading from '@/blocks/Heading/Heading';
import Paragraph from '@/blocks/Paragraph/Paragraph';

export default function About({data, options, global}) {

    let additionalStyles = {
        background_color: global.backgroundColor,
        shadow: 'none',
        border: 'none',
        padding: '0'
    }

    if(options.highlighted === 'minimal'){
        additionalStyles.background_color = global.altBackgroundColor;
        additionalStyles.border = global.border;
        additionalStyles.padding = '15px';
        if(global.shadowsEnabled) additionalStyles.shadow = '0 10px 15px -3px #0000001a';
    }
    else if(options.highlighted === 'primary'){
        additionalStyles.background_color = global.primary;
        additionalStyles.padding = '15px';
        if(global.shadowsEnabled) additionalStyles.shadow = '0 10px 15px -3px #0000001a';
    }


    return (
        <div className={AboutStyles.Container}>
            <div className={AboutStyles.About} 
                style={{
                    backgroundColor: additionalStyles.background_color,
                    boxShadow: additionalStyles.shadow,
                    border: additionalStyles.border,
                    padding: additionalStyles.padding
                }}
            >
                <Heading align={options.align} global={global}>{data.TitleText}</Heading>
                <div className={AboutStyles.Content}>
                    <Paragraph align={options.align} global={global}>{data.BodyText}</Paragraph>
                </div>
            </div>
        </div>
    )

}