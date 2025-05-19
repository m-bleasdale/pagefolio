import { React } from 'react';
import ImageWithTextStyles from './ImageWithText.module.css';
import Heading from '@/blocks/Heading/Heading';
import Paragraph from '@/blocks/Paragraph/Paragraph';
import Image from './Image';

export default function ImageWithText({data, options, global}) {
    let align = 'left';
    if(options.align === 'right') align = 'right';

    let conditionalStyles = {
        background_color: global.backgroundColor,
        color: global.foreground,
        border: 'none',
    }

    if(options.display === "altBackground"){
        conditionalStyles.background_color = global.altBackgroundColor;
        conditionalStyles.color = global.foreground_onAlt;
        conditionalStyles.border = global.border;
    }
    else if(options.display === 'primary'){
        conditionalStyles.background_color = global.primary;
        conditionalStyles.color = global.foreground_onPrimary;
    }


    return (
        <div style={{backgroundColor: conditionalStyles.background_color}}>
            <div className={ImageWithTextStyles.Container}>
                <div 
                    className={ImageWithTextStyles.ImageWithText} 
                    id={ImageWithTextStyles[align]}
                    style={{
                        border: conditionalStyles.border,
                        padding: conditionalStyles.padding
                    }}
                >
                    <Image source={data.ImageSource} />
                    <div className={ImageWithTextStyles.Content}>
                        <Heading align={options.TextAlign} colour={conditionalStyles.color}>{data.TitleText}</Heading>
                        <Paragraph align={options.TextAlign} colour={conditionalStyles.color}>{data.BodyText}</Paragraph>
                    </div>
                </div>
            </div>
        </div>
    )

}