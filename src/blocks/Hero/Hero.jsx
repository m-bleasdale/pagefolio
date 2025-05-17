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

function ImageBackground(props) {

}

export default function Hero({data, options, global}) {

    return (
        <div className={HeroStyles.ContentContainer}>
            <div 
                className={HeroStyles.Content} 
                style={{backgroundImage: `url(${data.ImageSource})`}}
            >
                <div 
                    className={HeroStyles.TextContainer}
                    style={data.TitleText || data.SubTitleText ? {background: "rgba(0, 0, 0, 0.4) 0%"} : null}
                >
                    <h1 className={HeroStyles.Heading} style={{ textAlign: options.TextAlign}}>
                        {data.TitleText}
                    </h1>
                    <h2 className={HeroStyles.SubHeading} style={{ textAlign: options.TextAlign}}>
                        {data.SubTitleText}
                    </h2>
                </div>
            </div>
        </div>
    )


}