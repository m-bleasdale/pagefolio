/*

size:
small - takes up small section of screen, like a banner
large - takes up 50-75% of screen, like a landing page

type:
Image as focus: Image takes up whole hero. Large text on top (optional)
Colour: Background is a colour, image (optional) with large text (can be L/R/C)

if ColourBackground, background should be alt so it is same as header

data: {
    TitleText=""
    SubTitleText=""
    Image=""
}
options: {
    variant
    TextAlign
    size
    color
}

*/

import { React } from 'react';

import HeroStyles from './Hero.module.css';
import ColourBackgroundStyles from './Styles/ColourBackground.module.css';
import ImageBackgroundStyles from './Styles/ImageBackground.module.css';

function ColourBackground(props) {
    const {data, options, global} = props.props;

    return (
        <div 
            className={HeroStyles.HeroContainer}
        >
            <div className={HeroStyles.ContentContainer}>
                <div className={ColourBackgroundStyles.Content}>
                    <div className={ColourBackgroundStyles.TextContainer}>
                        <h1 className={ColourBackgroundStyles.Heading} style={{ textAlign: options.TextAlign, color: global.foreground}}>
                            {data.TitleText}
                        </h1>
                        <h2 className={ColourBackgroundStyles.SubHeading} style={{ textAlign: options.TextAlign, color: global.foreground}}>
                            {data.SubTitleText}
                        </h2>
                    </div>
                    {data.ImageSource && 
                        <div className={ColourBackgroundStyles.Image}>
                            <img src={data.ImageSource} alt="This is an image"/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
    
}

function ImageBackground(props) {
    const {data, options, global} = props.props;

    return (
        <div className={HeroStyles.ContentContainer}>
            <div 
                className={ImageBackgroundStyles.Content} 
                style={{backgroundImage: `url(${data.ImageSource})`}}
            >
                <div className={ImageBackgroundStyles.TextContainer}>
                    <h1 className={ImageBackgroundStyles.Heading} style={{ textAlign: options.TextAlign}}>
                        {data.TitleText}
                    </h1>
                    <h2 className={ImageBackgroundStyles.SubHeading} style={{ textAlign: options.TextAlign}}>
                        {data.SubTitleText}
                    </h2>
                </div>
            </div>
        </div>
    )

}

export default function Hero({data, options, global}) {

    return (
        <>
        {options.variant === "ColourBackground" &&
            <ColourBackground props={{data: data, options: options, global: global}}/>
        }

        {options.variant === "ImageBackground" &&
            <ImageBackground props={{data: data, options: options, global: global}}/>
        }
        </>
    )

}