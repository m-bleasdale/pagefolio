import { React, useState } from 'react';

import styles from './BlockCustomiser.module.css';

import fields from './CustomiserFields';
import {OptionSelector, SmallTextBox, SmallTextArea, LargeTextArea, PageLogoUpload, SocialSelector} from './CustomiserInputs';

function Input ({onUpdate, type, options}) {

    if(type === 'options' && options) return <OptionSelector options={options} onUpdate={(selectedOption) => onUpdate(selectedOption)} />
    if(type === 'short-text') return <SmallTextBox onUpdate={(text) => onUpdate(text)} />
    if(type === 'page-logo') return <PageLogoUpload onUpdate={(tempURL) => onUpdate(tempURL)}/>
    if(type === 'socials') return <SocialSelector onUpdate={(newSocialList) => onUpdate(newSocialList)} />

}

export default function BlockCustomiser ({blockType, onConfirmation}) {
    if(!blockType || !fields[blockType]) return;

    const [data, setData] = useState({type: blockType, data: {}, options:{}});

    const [error, setError] = useState('');

    function ValidateThenConfirm() {
        for(const optionFieldIndex in fields[blockType].options)
        {
            const optionField = fields[blockType].options[optionFieldIndex];
            if(optionField.required && !data.options[optionField.fieldName]){
                setError(`${optionField.displayName} is required`);
                return;
            }
        }

        for(const dataFieldIndex in fields[blockType].data)
        {
            const dataField = fields[blockType].data[dataFieldIndex];
            if(dataField.required && !data.data[dataField.fieldName]){
                setError(`${dataField.displayName} is required`);
                return;
            }
        }

        onConfirmation(data);
    
    }

    function optionUpdated(field, newValue){        
        setData(prev => ({
            ...prev,
            options: {
              ...prev.options,
              [field]: newValue
            }
        }));
    }

    function dataUpdated(field, newValue) {
        setData(prev => ({
            ...prev,
            data: {
              ...prev.data,
              [field]: newValue
            }
        }));
    }

    return (
        <div className={styles.CustomiserContainer}>
            {fields[blockType].options.map((option, index) => (
                <div className={styles.BlockOptionContainer} key={index}>
                    <h3>{option.displayName}{option.required && <span className={styles.required}> *</span>}</h3>
                    <Input type={option.type} options={option.options} onUpdate={(newValue) => optionUpdated(option.fieldName, newValue)}/>
                </div>
            ))}
            {fields[blockType].data.map((field, index) => (
                <div className={styles.BlockDataContainer} key={index}>
                    <h3>{field.displayName}{field.required && <span className={styles.required}> *</span>}</h3>
                    <Input type={field.type} onUpdate={(newValue) => dataUpdated(field.fieldName, newValue)}/>
                </div>
            ))}
            <button className={styles.Confirm} onClick={ValidateThenConfirm}>Confirm</button>
            <div className={styles.ErrorContainer}>
                {error && <p className={styles.Error}>{error} </p>}
            </div>

        </div>
    )
}