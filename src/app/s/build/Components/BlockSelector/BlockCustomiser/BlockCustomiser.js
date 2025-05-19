import { React, useEffect, useState } from 'react';

import styles from './BlockCustomiser.module.css';

import fields from './CustomiserFields';
import {OptionSelector, TextAlign, SmallTextBox, LargeTextArea, PageLogoUpload, ImageUpload, SocialSelector, IconSelector} from '../../CustomiserInputs/CustomiserInputs';

function Input ({onUpdate, type, options, initialValue}) {

    if(type === 'options' && options) return <OptionSelector initialValue={initialValue} options={options} onUpdate={(selectedOption) => onUpdate(selectedOption)} />
    if(type === 'text-align') return <TextAlign initialValue={initialValue} onUpdate={(selectedOption) => onUpdate(selectedOption)} />
    if(type === 'short-text') return <SmallTextBox initialValue={initialValue} onUpdate={(text) => onUpdate(text)} />
    if(type === 'page-logo') return <PageLogoUpload initialValue={initialValue} onUpdate={(tempURL) => onUpdate(tempURL)}/>
    if(type === 'socials') return <SocialSelector initialValue={initialValue} onUpdate={(newSocialList) => onUpdate(newSocialList)} />
    if(type === 'long-text') return <LargeTextArea initialValue={initialValue} onUpdate={(text) => onUpdate(text)} />
    if(type === 'icon') return <IconSelector initialValue={initialValue} onUpdate={(iconName) => onUpdate(iconName)} />
    if(type === 'image') return <ImageUpload initialValue={initialValue} onUpdate={(tempURL) => onUpdate(tempURL)} />

}

export default function BlockCustomiser ({blockType, initialData, onConfirmation, onUpdate}) {
    if(!blockType || !fields[blockType]) return;

    const [data, setData] = useState({type: blockType, data: {}, options:{}});

    const [error, setError] = useState('');

    useEffect(() => {
        if(initialData && initialData.data){
            setData(initialData);
        }
    }, [initialData])

    function ValidateThenConfirm() {
        for(const optionFieldIndex in fields[blockType].options)
        {
            const optionField = fields[blockType].options[optionFieldIndex];
            if(optionField.required && !data.options[optionField.fieldName]){
                setError(`${optionField.displayName} is required`);
                return;
            }
        }

        let dataExists = false;

        for(const dataFieldIndex in fields[blockType].data)
        {
            const dataField = fields[blockType].data[dataFieldIndex];
            if(dataField) dataExists = true;
            if(dataField.required && !data.data[dataField.fieldName]){
                setError(`${dataField.displayName} is required`);
                return;
            }
        }

        if(initialData && initialData.data){
            onUpdate(data);
            return;
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
                    <Input 
                        type={option.type} 
                        options={option.options} 
                        onUpdate={(newValue) => optionUpdated(option.fieldName, newValue)}
                        initialValue={initialData && initialData.options ? initialData.options[option.fieldName] : null}
                    />
                </div>
            ))}
            {fields[blockType].data.map((field, index) => (
                <div className={styles.BlockDataContainer} key={index}>
                    <h3>{field.displayName}{field.required && <span className={styles.required}> *</span>}</h3>
                    <Input 
                        type={field.type}
                        onUpdate={(newValue) => dataUpdated(field.fieldName, newValue)}
                        initialValue={initialData && initialData.data ? initialData.data[field.fieldName] : null}
                    />
                </div>
            ))}
            <div className={styles.ErrorContainer}>
                {error && <p className={styles.Error}>{error} </p>}
            </div>
            <button className={styles.Confirm} onClick={ValidateThenConfirm}>Confirm</button>
            

        </div>
    )
}