import { React } from 'react';
import SocialsStyles from './Socials.module.css';

export default function Socials ({data, style, global}) {
    if(!data) return;

    const color = global.primary.slice(-6);
    
    const platforms = {
        'Instagram': {
            'original': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png',
            'original_circle': 'https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-instagram-new-circle-512.png',
            'filled': `https://img.icons8.com/?size=100&id=84884&format=png&color=${color}`,
            'filled_circle': `https://img.icons8.com/?size=100&id=dz63urxyxSdO&format=png&color=${color}`,
            'outline': `https://img.icons8.com/?size=100&id=85154&format=png&color=${color}`
        },
        'LinkedIn': {
            'original': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1200px-LinkedIn_icon.svg.png',
            'original_circle': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/1200px-LinkedIn_icon_circle.svg.png',
            'filled': `https://img.icons8.com/?size=100&id=84888&format=png&color=${color}`,
            'filled_circle': `https://img.icons8.com/?size=100&id=62925&format=png&color=${color}`,
            'outline': `https://img.icons8.com/?size=100&id=2EqeH19eMd3a&format=png&color=${color}`
        }
    }
    
    
    return(
        <div className={SocialsStyles.SocialsContainer}>
            {data.map((element) => {
                return(
                    <div className={SocialsStyles.SocialLink} key={element.platform}>
                        <img 
                            className={SocialsStyles.SocialLinkImage}
                            src={platforms[element.platform][style.variant]} 
                            alt={element.platform}
                        />
                    </div>
                )
            })}
        </div>
    )
}