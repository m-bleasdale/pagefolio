import { React, useState } from 'react';

import styles from './BlockCustomiser.module.css';

function OptionSelector({onUpdate, options}) {
    const [selectedRadioOption, setSelectedRadioOption] = useState('');

    return (
        <div className={styles.OptionSelector}>
            {options.map((option, index) => (
                <label key={index} className={styles.RadioBox} id={styles[`${selectedRadioOption === option.optionName ? 'selected' : ''}`]}>
                    <input
                    type="radio"
                    value={option.optionName}
                    checked={selectedRadioOption === option.optionName}
                    onChange={(e) => {
                        onUpdate(e.target.value);
                        setSelectedRadioOption(e.target.value);
                    }}
                    />
                    {option.displayName}
                </label>
            ))}
        </div>
    )

}

function SmallTextBox({onUpdate}) {
    return (
        <input className={styles.SmallTextBox}
        type="text"
        placeholder="Please type something"
        onChange={(e) => {onUpdate(e.target.value)}}
        />
    )
}

function SmallTextArea({currentValue, onUpdate}) {

}

function LargeTextArea({currentValue, onUpdate}) {

}

export { OptionSelector, SmallTextBox, SmallTextArea, LargeTextArea }