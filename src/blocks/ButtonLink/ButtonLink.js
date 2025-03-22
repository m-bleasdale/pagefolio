import { React } from 'react';
import ButtonLinkStyles from './ButtonLink.module.css';

import Icon from './Icon';

export default function ButtonLink ({data, options, global}) {
    if(!data || !options) return;
    
    let additionalStyles = {
        background_color: global.backgroundColor,
        color: global.foreground,
        border: 'none',
    }

    if(options.variant === 'minimal'){
        additionalStyles.background_color = global.altBackgroundColor;
        additionalStyles.border = global.border;
    }
    else if(options.variant === 'primary'){
        additionalStyles.background_color = global.primary;
        additionalStyles.color = global.foreground_onPrimary
    }

    return (
        <div className={ButtonLinkStyles.Container}>
            <div className={ButtonLinkStyles.ButtonContainer}
            style={{
                backgroundColor: additionalStyles.background_color,
                border: additionalStyles.border,
                color: additionalStyles.color
            }}
            >
                <Icon source={data.IconSource}/>
                <p className={ButtonLinkStyles.ButtonText}>{data.ButtonText}</p>
                <div className={ButtonLinkStyles.ShareContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}
