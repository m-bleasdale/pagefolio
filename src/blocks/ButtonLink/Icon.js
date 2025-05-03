import { React } from 'react';
import ButtonLinkStyles from './ButtonLink.module.css';
import icons from '@/utils/Icons';

export default function Icon ({source}) {

    if(!source) return <div className={ButtonLinkStyles.Icon}></div>;

    const icon = icons.find(icon => icon.name === source);
    return icon ? icon.source : <div className={ButtonLinkStyles.Icon}></div>;
    
}