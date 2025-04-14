import { React } from 'react';

import styles from './GlobalOptions.module.css';

export default function BlockSelector() {

    return (
        <div className={styles.Container}>
            <h1>Options</h1>
            <p className={styles.Info}>These settings apply to your whole PageFolio.</p>
            <div className={styles.Options}>

            </div>
        </div>
    )

}