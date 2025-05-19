import { React } from 'react';
import HeaderStyles from './Header.module.css';

import Logo from './Logo';
import Title from './Title';
import Socials from '@/blocks/Socials/Socials';
import SubTitle from './SubTitle';

import Horizontal from './Styles/Horizontal.module.css';
import Vertical_Discrete from './Styles/Vertical_Discrete.module.css';
import Vertical_Logo_Focus from './Styles/Vertical_Logo_Focus.module.css';

export default function Header ({data, options, global}) {
    if(!data || !options) return;

    let LayoutStyles;
    if(options.layout === 'Horizontal') LayoutStyles = Horizontal;
    if(options.layout === 'Vertical_Discrete') LayoutStyles = Vertical_Discrete;
    if(options.layout === 'Vertical_Logo_Focus') LayoutStyles = Vertical_Logo_Focus;

    let shadow;
    if(global.shadowsEnabled) shadow = '0 10px 15px -3px #0000001a';
    else shadow = 'none';

    return (
        <div className={HeaderStyles.HeaderContainer} 
            style={{
                backgroundColor: global.altBackgroundColor, 
                borderBottom: `1px solid ${global.border}`,
                boxShadow: shadow
            }}
        >
            <div className={LayoutStyles.Container}>
                <div className={LayoutStyles.Main}>
                    <div className={LayoutStyles.TitleAndLogo}>
                        <Logo source={data.LogoSource} LayoutStyles={LayoutStyles}/>
                        <Title global={global}>{data.TitleText}</Title>
                    </div>
                    <SubTitle global={global}>{data.SubTitleText}</SubTitle>
                </div>
                <div className={LayoutStyles.SocialContainer}>
                    <Socials data={data.Socials} style={{variant: options.socials_variant}} global={global}/>
                </div>
            </div>
        </div>
    )
}