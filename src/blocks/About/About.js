import { React } from 'react';
import AboutStyles from './About.module.css';
import Heading from '@/blocks/Heading/Heading';
import Paragraph from '@/blocks/Paragraph/Paragraph';

export default function About({data, options, global}) {

    let conditionalStyles = {
        background_color: global.backgroundColor,
        color: global.foreground,
        border: 'none',
        padding: '0'
    }

    if(options.highlighted === 'minimal'){
        conditionalStyles.background_color = global.altBackgroundColor;
        conditionalStyles.color = global.foreground_onAlt;
        conditionalStyles.border = global.border;
        conditionalStyles.padding = '15px';
    }
    else if(options.highlighted === 'primary'){
        conditionalStyles.background_color = global.primary;
        conditionalStyles.color = global.foreground_onPrimary;
        conditionalStyles.padding = '15px';
    }

    return (
        <div style={{backgroundColor: conditionalStyles.background_color}}>
            <div className={AboutStyles.Container}>
                <div className={AboutStyles.About} 
                    style={{
                        border: conditionalStyles.border,
                        padding: conditionalStyles.padding
                    }}
                >
                    <Heading align={options.align} colour={conditionalStyles.color}>{data.TitleText}</Heading>
                    <div className={AboutStyles.Content}>
                        <Paragraph align={options.align} colour={conditionalStyles.color}>{data.BodyText}</Paragraph>
                    </div>
                </div>
            </div>
        </div>
    )

}