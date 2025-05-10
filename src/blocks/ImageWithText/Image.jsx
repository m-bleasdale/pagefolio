import { React } from 'react';
import ImageWithTextStyles from './ImageWithText.module.css';

export default function Image({source}) {
    if(!source) return;

    return (
        <div className={ImageWithTextStyles.Image}>
            <img src={source} alt="This is an image"/>
        </div>
    )

}