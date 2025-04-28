import { React, useState, useContext, useEffect, useMemo } from 'react';

import { debounce } from 'lodash';

import { createClient } from '@/utils/supabase/client';
import { PageInformationContext } from '../../page';

import platforms from './SocialMediaPlatforms';

import styles from './BlockCustomiser.module.css';

function OptionSelector({onUpdate, options, initialValue}) {
    const [selectedRadioOption, setSelectedRadioOption] = useState('');

    if(!options) return;

    useEffect(() => {
        if(initialValue) setSelectedRadioOption(initialValue);
    }, []);

    return (
        <div className={styles.OptionSelector}>
            {options.map((option, index) => (
                <label key={index} className={styles.RadioBox} id={styles[`${selectedRadioOption === option.optionName ? 'selected' : ''}`]}>
                    {(option.icon &&
                        <img src={option.icon} />
                    )}
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

function TextAlign({onUpdate}) {
    const [selectedRadioOption, setSelectedRadioOption] = useState('');

    const options = [
        {
            name: "left",
            icon: 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
        },
        {
            name: "center",
            icon: 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        },
        {
            name: "right",
            icon: 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
            </svg>
        }
    ]

    return (
        <div className={styles.TextAlign}>
            {options.map((option, index) => (
                <div 
                    key={index} 
                    className={styles.TextAlignBox} 
                    id={styles[`${selectedRadioOption === option.name ? 'selected' : ''}`]}
                    onClick={(e) => {
                        onUpdate(option.name);
                        setSelectedRadioOption(option.name);
                    }}
                >
                    {option.icon}
                </div>
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

function LargeTextArea({onUpdate}) {
    return (
        <textarea className={styles.LargeTextArea}
        placeholder="Please type something"
        onChange={(e) => {onUpdate(e.target.value)}}
        />
    )

}

function PageLogoUpload({onUpdate}) {
    const {pageID} = useContext(PageInformationContext);
    const PageID = pageID[0].id;

    const [uploadedFileURL, setUploadedFileURL] = useState();
    const [uploading, setUploading] = useState(false);
    
    //Uploads to temp-page-logos
    async function handleUpload(e) {
        const supabase = createClient();

        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);

        const fileExt = file.name.split('.').pop();
        const timestamp = Date.now();
        const fileName = `temp-${PageID}-${timestamp}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('temp-page-logos')
            .upload(fileName, file, {
                upsert: true,
                contentType: file.type || 'image/png',
            });
      

        if (uploadError) {
            //Need error handling here
            console.error(uploadError);
            setUploading(false);
            return;
        }

        const { data, error: downloadError } = await supabase.storage
            .from('temp-page-logos')
            .getPublicUrl(fileName);

        if (downloadError) {
            //Need error handling here
            console.error(downloadError);
            setUploading(false);
            return;
        }

        setUploadedFileURL(data.publicUrl);
        setUploading(false);
        onUpdate(data.publicUrl);
    }

    return (
        <div className={styles.PageLogoUploadContainer}>
            <input type="file" accept="image/*" onChange={handleUpload} />
            {uploading && <p>Uploading...</p>}
            {uploadedFileURL && (
                <img src={uploadedFileURL} alt="Uploaded preview" style={{ width: 100, height: 100 }} />
            )}
        </div>
    )
}

function SocialSelector ({onUpdate}){
    const [linkedSocials, setLinkedSocials] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [tempUrl, setTempUrl] = useState('');

    useEffect(() => {
        let SocialLinks = [];
        for(const index in linkedSocials){
            SocialLinks.push({platform: linkedSocials[index].platform.name, link: linkedSocials[index].link});
        }
        onUpdate(SocialLinks);
    }, [linkedSocials])

    const handleAddSocial = () => {
        if (!tempUrl.trim()) return;
        setLinkedSocials([
          ...linkedSocials,
          { platform: selectedPlatform, link: tempUrl, isEditing: false },
        ]);
        setSelectedPlatform(null);
        setTempUrl('');
    };

    const handleUpdateUrl = (index, newUrl) => {
        const updated = [...linkedSocials];
        updated[index].link = newUrl;
        setLinkedSocials(updated);
    };

    const handleToggleEdit = (index) => {
        const updated = [...linkedSocials];
        updated[index].isEditing = !updated[index].isEditing;
        setLinkedSocials(updated);
    };

    const handleRemove = (index) => {
        setLinkedSocials(linkedSocials.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.SocialLinksContainer}>
            {showOptions && (
                <div className={styles.PlatformMenu}>
                    <div className={styles.PlatformMenuTop}>
                        <p>Add Social Media</p>
                        <svg className={styles.RemoveButton} onClick={() => setShowOptions(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className={styles.DropdownContent}>
                        {platforms.map((platform) => (
                            <button
                                key={platform.name}
                                className={styles.DropdownItem}
                                onClick={() => {
                                    setSelectedPlatform(platform);
                                    setShowOptions(false);
                                }}
                            >
                                <img src={platform.logo} alt={platform.name} className={styles.PlatformIcon} />
                                {platform.name}
                            </button>
                        ))}
                    </div>
                
                </div>
            )}

            {(!showOptions && !selectedPlatform && linkedSocials.length < 5) && (
                <button className={styles.AddButton} onClick={() => setShowOptions(!showOptions)}>
                    Add Social Media
                </button>
            )}

            {selectedPlatform && (
                <div className={styles.PlatformMenu} id={styles.URLEditor}>
                    <div className={styles.PlatformMenuTop}>
                        <p>Enter URL for {selectedPlatform.name}:</p>
                        <svg className={styles.RemoveButton} onClick={() => setSelectedPlatform(null)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className={styles.URLEditor}>
                        <label>
                            <input
                            type="url"
                            value={tempUrl}
                            onChange={(e) => setTempUrl(e.target.value)}
                            placeholder="https://example.com"
                            />
                        </label>
                        <div className={styles.URLEditorButtonContainer}>
                            <button onClick={handleAddSocial}>Add</button>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.LinkedList}>
                {linkedSocials.map((item, index) => (
                <div key={index} className={styles.LinkedItem}>
                    <img src={item.platform.logo} alt={item.platform.name} className={styles.PlatformIcon} />
                    <input
                    type="url"
                    value={item.link}
                    disabled={!item.isEditing}
                    onChange={(e) => handleUpdateUrl(index, e.target.value)}
                    />
                    {item.isEditing ? (
                    <button className={styles.SaveButton} onClick={() => handleToggleEdit(index)}>Save</button>
                    ) : (
                    <>
                        <svg className={styles.SocialEditButton} onClick={() => handleToggleEdit(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>

                        <svg className={styles.RemoveButton} id={styles.SocialEdit} onClick={() => handleRemove(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </>
                    )}
                </div>
                ))}
            </div>
        </div>
      );
}

function ColourSelector({ defaultColours, colour, onUpdate }) {    
    const [selectedColour, setSelectedColour] = useState('#000000');
    const [showColourPicker, setShowColourPicker] = useState(false);

    const debouncedUpdate = useMemo(() => debounce(onUpdate, 150), [onUpdate]);

    useEffect(() => {
        if(defaultColours[colour.colourName]) setSelectedColour(defaultColours[colour.colourName])
    }, []);

    useEffect(() => {
        // Cleanup on unmount to avoid memory leaks
        return () => {
            debouncedUpdate.cancel();
        };
    }, [debouncedUpdate]);

      
    function handleChange (newColour) {
        setSelectedColour(newColour);
        debouncedUpdate(newColour);
    };

    const PresetOptions = [
        ['#ffffff', '#f3f3f3', '#efefef', '#d9d9d9', '#999999', '#666666', '#000000'],
        ['#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a4c2f4', '#b4a7d6'],
        ['#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#c9daf8', '#d9d2e9'],
        ['#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#6d9eeb', '#8e7cc3'],
        ['#a61c00', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#3c78d8', '#674ea7'],
        ['#85200c', '#990000', '#b45f06', '#bf9000', '#38761d', '#1155cc', '#351c75'],
    ]

    return (
        <div className={styles.ColourSelector}>
            {!showColourPicker && (
                <div className={styles.SelectedColourContainer}>
                    <p>{colour.displayName}</p>
                    <div 
                        className={styles.ColourSampleContainer}
                        style={{backgroundColor: selectedColour}}
                        onClick={() => setShowColourPicker(true)}
                    ></div>
                </div>
            )}

            {showColourPicker && (
                <div className={styles.ColourPickerContainer}>
                    <div className={styles.MenuTop}>
                        <p>{colour.displayName}</p>
                        <svg className={styles.CloseButton} onClick={() => setShowColourPicker(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className={styles.ColourOptions}>
                        {PresetOptions.map((row, rowIndex) => (
                            <div className={styles.ColourOptionRow} key={rowIndex}>
                                {row.map((colourOption, index) => (
                                    <div 
                                        className={styles.ColourOption}
                                        key={index}
                                        onClick={() => {
                                            handleChange(colourOption);
                                            setShowColourPicker(false);
                                        }}
                                        style={{
                                            backgroundColor: colourOption,
                                            border: rowIndex === 0 && (index === 0 || index === 1) ? '1px solid #e6e6e6' : 'none',
                                        }}
                                    ></div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className={styles.CustomColour}>
                        <p>Custom</p>
                        <input
                            type="color"
                            value={selectedColour}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>
                </div>
            )}

        </div>
    );
}

export { OptionSelector, TextAlign, SmallTextBox, LargeTextArea, PageLogoUpload, SocialSelector, ColourSelector }