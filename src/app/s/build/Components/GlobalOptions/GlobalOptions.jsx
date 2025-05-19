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
            //Set foreground, background, primary (and alt bg) to inputted value
            const newOptions = {...prev, [colourName]: value };

            //Set alts to be normal values if monotone
            if(theme === 'Monotone' && colourName === 'backgroundColor'){
                newOptions.altBackgroundColor = value;
            }

            //Work out lighter version of given colour
            function lightenColour(hex, percent) {
                const num = parseInt(hex.replace('#', ''), 16);
                const r = Math.min(255, Math.floor((num >> 16) + (255 - (num >> 16)) * percent));
                const g = Math.min(255, Math.floor(((num >> 8) & 0x00FF) + (255 - ((num >> 8) & 0x00FF)) * percent));
                const b = Math.min(255, Math.floor((num & 0x0000FF) + (255 - (num & 0x0000FF)) * percent));
                return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
            }

            if (colourName === 'foreground') {
                newOptions.foreground_light = lightenColour(value, 0.3);
                if (theme === 'Monotone') {
                    newOptions.foreground_light_onAlt = lightenColour(value, 0.3);
                }
            }

            // Determine if foreground_onPrimary should match foreground or be its inverse
            function isColourDark(hex) {
                const num = parseInt(hex.replace('#', ''), 16);
                const r = (num >> 16) & 0xff;
                const g = (num >> 8) & 0xff;
                const b = num & 0xff;
                // Calculate luminance
                const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                return luminance < 128; // Dark if luminance is less than 128
            }

            if (colourName === 'primary') {
                const isDark = isColourDark(value);
                newOptions.foreground_onPrimary = isDark ? '#FFFFFF' : prev.foreground;
            }

            //ERROR: When changing foreground colour, onAlt becomes white
            //ALSO: Consider if monotone is being used, isDark check must also be done on background
            //and if the theme is monotone, foreground should be lightened if the colour is dark
            //I've tried to make some fixes, CHECK AGAIN - NOT DONE YET
            //
            //Also another issue: when changing background colour to black, altForeground goes white
            //When turning background back to white, altForeground stays white
            if (colourName === 'altBackgroundColor') {
                const isDark = isColourDark(value);
                newOptions.foreground_onAlt = isDark ? '#FFFFFF' : options.foreground;
                newOptions.foreground_light_onAlt = lightenColour(newOptions.foreground_onAlt, 0.3);
            }
            if (colourName === 'foreground') {
                const isDark = isColourDark(options.altBackgroundColor);
                newOptions.foreground_onAlt = isDark ? '#FFFFFF' : value;
                newOptions.foreground_light_onAlt = lightenColour(newOptions.foreground_onAlt, 0.3);
            }
            if (colourName === 'backgroundColor' && theme === 'Monotone') {
                const isDark = isColourDark(value);
                newOptions.foreground_onAlt = isDark ? '#FFFFFF' : options.foreground;
                newOptions.foreground_light_onAlt = lightenColour(newOptions.foreground_onAlt, 0.3);
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