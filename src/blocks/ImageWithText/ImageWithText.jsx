import { React } from 'react';
import ImageWithTextStyles from './ImageWithText.module.css';
import Heading from '@/blocks/Heading/Heading';
import Paragraph from '@/blocks/Paragraph/Paragraph';
import Image from './Image';

export default function ImageWithText({data, options, global}) {
    let align = 'left';
    if(options.align === 'right') align = 'right';

    return (
        <div className={ImageWithTextStyles.Container}>
            <div className={ImageWithTextStyles.ImageWithText} id={ImageWithTextStyles[align]}>
                <Image source={data.ImageSource} />
                <div className={ImageWithTextStyles.Content}>
                    <Heading align={options.TextAlign} colour={global.foreground}>{data.TitleText}</Heading>
                    <Paragraph align={options.TextAlign} colour={global.foreground}>{data.BodyText}</Paragraph>
                </div>
            </div>
        </div>
    )

}