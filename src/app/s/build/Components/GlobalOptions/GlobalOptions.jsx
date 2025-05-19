import { React, useEffect, useState } from 'react';
import { debounce } from 'lodash';

import { OptionSelector, ColourSelector } from '../CustomiserInputs/CustomiserInputs';

import styles from './GlobalOptions.module.css';


export default function GlobalOptions({initialOptions, onUpdate}) {    
    const [theme, setTheme] = useState(initialOptions.theme);
    const [colourFields, setColourFields] = useState([
        { displayName: 'Foreground', colourName: 'foreground' },
        { displayName: 'Background', colourName: 'backgroundColor' },
        { displayName: 'Primary Colour', colourName: 'primary' },
        { displayName: 'Border', colourName: 'border' }
    ]);

    //Default values for options
    const [options, setOptions] = useState(initialOptions);

    useEffect(() => {
        if(theme === 'Monotone'){
            setColourFields([
                { displayName: 'Foreground', colourName: 'foreground' },
                { displayName: 'Background', colourName: 'backgroundColor' },
                { displayName: 'Primary Colour', colourName: 'primary' },
                { displayName: 'Border', colourName: 'border' }
            ]);
        }
        else if (theme === 'Duotone'){
            setColourFields([
                { displayName: 'Foreground', colourName: 'foreground'},
                { displayName: 'Background', colourName: 'backgroundColor' },
                { displayName: 'Primary Colour', colourName: 'primary' },
                { displayName: 'Border', colourName: 'border' },
                { displayName: 'Alternative Background', colourName: 'altBackgroundColor' }
            ])
        }
    }, [theme]);

    useEffect(() => {
        onUpdate(options);
    }, [options])

    function handleColourUpdate(colourName, value) {
        setOptions((prev) => {
            const newOptions = { ...prev, [colourName]: value };

            const getLuminance = (hex) => {
                const num = parseInt(hex.replace('#', ''), 16);
                const r = (num >> 16) & 0xff;
                const g = (num >> 8) & 0xff;
                const b = num & 0xff;
                return 0.2126 * r + 0.7152 * g + 0.0722 * b;
            };

            const isLight = (hex) => getLuminance(hex) >= 165;
            const isDark = (hex) => getLuminance(hex) < 90;

            const lightenColour = (hex, percent) => {
                const num = parseInt(hex.replace('#', ''), 16);
                const r = Math.min(255, Math.floor((num >> 16) + (255 - (num >> 16)) * percent));
                const g = Math.min(255, Math.floor(((num >> 8) & 0x00FF) + (255 - ((num >> 8) & 0x00FF)) * percent));
                const b = Math.min(255, Math.floor((num & 0x0000FF) + (255 - (num & 0x0000FF)) * percent));
                return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
            };

            const baseForeground = prev.foreground;

            // If foreground is updated, just update foreground_light
            if (colourName === 'foreground') {
                newOptions.foreground_light = lightenColour(value, 0.3);
            }

            // Monotone: keep altBackground in sync with backgroundColor
            if (theme === 'Monotone' && colourName === 'backgroundColor') {
                newOptions.altBackgroundColor = value;
            }

            // Determine derived foreground_onPrimary
            if (colourName === 'primary' || colourName === 'foreground') {
                const bg = colourName === 'primary' ? value : prev.primary;
                newOptions.foreground_onPrimary = isDark(bg)
                    ? '#FFFFFF'
                    : isLight(bg)
                        ? '#000000'
                        : baseForeground;
            }

            // Determine derived foreground_onAlt
            if (colourName === 'altBackgroundColor' || colourName === 'foreground' || (theme === 'Monotone' && colourName === 'backgroundColor')) {
                const altBg = (colourName === 'altBackgroundColor')
                    ? value
                    : (theme === 'Monotone' && colourName === 'backgroundColor')
                        ? value
                        : prev.altBackgroundColor;

                const fgOnAlt = isDark(altBg)
                    ? '#FFFFFF'
                    : isLight(altBg)
                        ? '#000000'
                        : baseForeground;

                newOptions.foreground_onAlt = fgOnAlt;
                newOptions.foreground_light_onAlt = lightenColour(fgOnAlt, 0.3);
            }

            return newOptions;
        });
    }
    
    return (
        <div className={styles.Container}>
            <h1>Options</h1>
            <p className={styles.Info}>These settings apply to your whole PageFolio.</p>
            <div className={styles.OptionsContainer}>
                <div className={styles.OptionGroup}>
                    <h3>Colour Theme<span className={styles.required}> *</span></h3>
                        <OptionSelector 
                            onUpdate={(option) => setTheme(option)}
                            initialValue={theme}
                            options={[
                                { displayName: 'Monotone', optionName: 'Monotone' },
                                { displayName: 'Duotone', optionName: 'Duotone' }
                            ]}
                        />
                </div>
                {colourFields && (
                    <div className={styles.ColourSelectorContainer}>
                        <h3>Colours<span className={styles.required}> *</span></h3>
                        <div className={styles.ColourFieldsContainer}>
                            {colourFields.map((field, index) => (
                                <ColourSelector 
                                    key={index} 
                                    defaultColours={initialOptions}
                                    colour={field}
                                    onUpdate={(newColour) => {handleColourUpdate(field.colourName, newColour)}}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

}