import { React, useState, useContext, useEffect, useMemo } from 'react';

import { debounce } from 'lodash';

import { createClient } from '@/utils/supabase/client';
import { EditorContext } from '../../page';

import platforms from './SocialMediaPlatforms';
import icons from '@/utils/Icons';

import styles from './CustomiserInputs.module.css';

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

function TextAlign({onUpdate, initialValue}) {
    const [selectedRadioOption, setSelectedRadioOption] = useState('');

    useEffect(() => {
        if(initialValue) setSelectedRadioOption(initialValue);
    }, []);

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

function SmallTextBox({onUpdate, initialValue}) {    
    return (
        <input 
        className={styles.SmallTextBox}
        type="text"
        placeholder="Please type something"
        defaultValue={initialValue || ''}
        onChange={(e) => {onUpdate(e.target.value)}}
        />
    )
}

function LargeTextArea({onUpdate, initialValue}) {
    return (
        <textarea className={styles.LargeTextArea}
        placeholder="Please type something"
        defaultValue={initialValue || ''}
        onChange={(e) => {onUpdate(e.target.value)}}
        />
    )

}

function PageLogoUpload({onUpdate}) {
    const {pageID} = useContext(EditorContext);
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
        <div className={styles.ImageUploadContainer}>
            <input type="file" accept="image/*" onChange={handleUpload} />
            {uploading && <p>Uploading...</p>}
            {uploadedFileURL && (
                <img src={uploadedFileURL} alt="Uploaded preview" style={{ width: 100, height: 100 }} />
            )}
        </div>
    )
}

function ImageUpload({onUpdate}) {
    const {pageID} = useContext(EditorContext);
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
            .from('temp-images')
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
            .from('temp-images')
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
        <div className={styles.ImageUploadContainer}>
            <input type="file" accept="image/*" onChange={handleUpload} />
            {uploading && <p>Uploading...</p>}
            {uploadedFileURL && (
                <img src={uploadedFileURL} alt="Uploaded preview" style={{ width: 100, height: 100 }} />
            )}
        </div>
    )
}


function SocialSelector ({onUpdate, initialValue}){
    const [linkedSocials, setLinkedSocials] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [tempUrl, setTempUrl] = useState('');

    useEffect(() => {
        let currentPlatforms = []
        
        if(initialValue) {
            for (const item in initialValue){

                const value = initialValue[item];

                const logo = platforms.find((element) => element.name === value.platform)?.logo;

                currentPlatforms.push({
                    platform: {name: value.platform, logo: logo},
                    link: value.link,
                    isEditing: false
                });
            }
        }

        setLinkedSocials(currentPlatforms);
    }, []);

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
                <div className={styles.Menu}>
                    <div className={styles.MenuTop}>
                        <p>Add Social Media</p>
                        <svg className={styles.CloseButton} onClick={() => setShowOptions(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className={styles.MenuContent}>
                        {platforms.map((platform) => (
                            <button
                                key={platform.name}
                                className={styles.MenuItem}
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
                <div className={styles.Menu} id={styles.URLEditor}>
                    <div className={styles.MenuTop}>
                        <p>Enter URL for {selectedPlatform.name}:</p>
                        <svg className={styles.CloseButton} onClick={() => setSelectedPlatform(null)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
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
                        <svg className={styles.EditButton} onClick={() => handleToggleEdit(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>

                        <svg className={styles.CloseButton} id={styles.SocialEdit} onClick={() => handleRemove(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
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

    const ForegroundOptions = [
        ['#ffffff', '#f3f3f3', '#efefef', '#d9d9d9', '#999999', '#666666', '#000000'],
        ['#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a4c2f4', '#b4a7d6'],
        ['#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#6d9eeb', '#8e7cc3'],
        ['#a61c00', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#3c78d8', '#674ea7'],
        ['#85200c', '#990000', '#b45f06', '#bf9000', '#38761d', '#1155cc', '#351c75']
    ]

    const ssBackgroundOptions = [
        ["#FFFFFF", "#F3FAFB", "#F3F7F4", "#F9F5F6", "#F5F3F7", "#F8F3EF"],
        ["#FAFAFA", "#F4FBFD", "#EDF7F1", "#F8F1F3", "#F6F0FA", "#F8F0E7"],
        ["#F5F5F5", "#EDF6F9", "#E5F0EA", "#F4ECEF", "#EDE6F0", "#EFE4DB"],
        ["#2A2A2A", "#24363A", "#2B3A32", "#3A2D33", "#3B2E3F", "#2B1F1A"],
        ["#1A1A1A", "#16272A", "#1F2C25", "#2A1F24", "#2A1F2D", "#1F1510"]
    ];

    const BackgroundOptions = [
        ["#e8f6f3", "#d0ece7", "#a2d9ce", "#73c6b6", "#45b39d", "#16a085", "#138d75", "#117a65", "#0e6655", "#0b5345"],
        ["#eafaf1", "#d5f5e3", "#abebc6", "#82e0aa", "#58d68d", "#2ecc71", "#28b463", "#239b56", "#1d8348", "#186a3b"],
        ["#ebf5fb", "#d6eaf8", "#aed6f1", "#85c1e9", "#5dade2", "#3498db", "#2e86c1", "#2874a6", "#21618c", "#1b4f72"],
        ["#eaf2f8", "#d4e6f1", "#a9cce3", "#7fb3d5", "#5499c7", "#2980b9", "#2471a3", "#1f618d", "#1a5276", "#154360"],
        ["#f5eef8", "#ebdef0", "#d7bde2", "#c39bd3", "#af7ac5", "#9b59b6", "#884ea0", "#76448a", "#633974", "#512e5f"],
        ["#f4ecf7", "#e8daef", "#d2b4de", "#bb8fce", "#a569bd", "#8e44ad", "#7d3c98", "#6c3483", "#5b2c6f", "#4a235a"],
        ["#ebedef", "#d6dbdf", "#aeb6bf", "#85929e", "#5d6d7e", "#34495e", "#2e4053", "#283747", "#212f3c", "#1b2631"],
        ["#eaecee", "#d5d8dc", "#abb2b9", "#808b96", "#566573", "#2c3e50", "#273746", "#212f3d", "#1c2833", "#17202a"],
        ["#fef9e7", "#fcf3cf", "#f9e79f", "#f7dc6f", "#f4d03f", "#f1c40f", "#d4ac0d", "#b7950b", "#9a7d0a", "#7d6608"],
        ["#fef5e7", "#fdebd0", "#fad7a0", "#f8c471", "#f5b041", "#f39c12", "#d68910", "#b9770e", "#9c640c", "#7e5109"],
        ["#fdf2e9", "#fae5d3", "#f5cba7", "#f0b27a", "#eb984e", "#e67e22", "#ca6f1e", "#af601a", "#935116", "#784212"],
        ["#fbeee6", "#f6ddcc", "#edbb99", "#e59866", "#dc7633", "#d35400", "#ba4a00", "#a04000", "#873600", "#6e2c00"],
        ["#fdedec", "#fadbd8", "#f5b7b1", "#f1948a", "#ec7063", "#e74c3c", "#cb4335", "#b03a2e", "#943126", "#78281f"],
        ["#f9ebea", "#f2d7d5", "#e6b0aa", "#d98880", "#cd6155", "#c0392b", "#a93226", "#922b21", "#7b241c", "#641e16"],
        ["#fdfefe", "#fbfcfc", "#f7f9f9", "#f4f6f7", "#f0f3f4", "#ecf0f1", "#d0d3d4", "#b3b6b7", "#979a9a", "#7b7d7d"],
        ["#f8f9f9", "#f2f3f4", "#e5e7e9", "#d7dbdd", "#cacfd2", "#bdc3c7", "#a6acaf", "#909497", "#797d7f", "#626567"],
        ["#f4f6f6", "#eaeded", "#d5dbdb", "#bfc9ca", "#aab7b8", "#95a5a6", "#839192", "#717d7e", "#5f6a6a", "#4d5656"],
        ["#f2f4f4", "#e5e8e8", "#ccd1d1", "#b2babb", "#99a3a4", "#7f8c8d", "#707b7c", "#616a6b", "#515a5a", "#424949"]
    ];


    const AltBackgroundOptions = [
        ["#FFFFFF", "#F3FAFB", "#F3F7F4", "#F9F5F6", "#F5F3F7", "#F8F3EF"],
        ["#E0E0E0", "#D3E3E6", "#CADFD3", "#DDD3D7", "#D8D0DC", "#D9CFC5"],
        ["#D6D6D6", "#B3D6DE", "#A3D1BB", "#C9AEB7", "#BFA8D1", "#C9AB99"],
        ["#2A2A2A", "#24363A", "#2B3A32", "#3A2D33", "#3B2E3F", "#2B1F1A"],
        ["#1A1A1A", "#16272A", "#1F2C25", "#2A1F24", "#2A1F2D", "#1F1510"]
    ];

    const PrimaryOptions = [
        ['#ffffff', '#f3f3f3', '#efefef', '#d9d9d9', '#999999', '#666666', '#000000'],
        ['#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a4c2f4', '#b4a7d6'],
        ['#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#6d9eeb', '#8e7cc3'],
        ['#a61c00', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#3c78d8', '#674ea7'],
        ['#85200c', '#990000', '#b45f06', '#bf9000', '#38761d', '#1155cc', '#351c75']
    ]

    let PresetOptions;
    if(colour.colourName === "foreground") PresetOptions = ForegroundOptions;
    else if(colour.colourName === "backgroundColor") PresetOptions = BackgroundOptions;
    else if(colour.colourName === "altBackgroundColor") PresetOptions = AltBackgroundOptions;
    else if(colour.colourName === "primary") PresetOptions = PrimaryOptions;
    else PresetOptions = ForegroundOptions;

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
                                        style={{backgroundColor: colourOption}}
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

function IconSelector({onUpdate}) {
    const [selectedIcon, setSelectedIcon] = useState();
    const [showIconPicker, setShowIconPicker] = useState(false);

    useEffect(() => {
        if(!selectedIcon) return;
        onUpdate(selectedIcon.name);
    }, [selectedIcon])

    return (
        <div className={styles.IconSelector}>
            {!showIconPicker && !selectedIcon &&(
                <button className={styles.AddButton} onClick={() => setShowIconPicker(true)}>
                    Choose an Icon
                </button>
            )}
            {!showIconPicker && selectedIcon &&(
                <div className={styles.IconPreviewContainer}>
                    {selectedIcon.source}
                    <svg className={styles.EditButton} onClick={() => setShowIconPicker(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </div>
            )}

            {showIconPicker && (
                <div className={styles.Menu}>
                    <div className={styles.MenuTop}>
                        <p>Select an icon</p>
                        <svg className={styles.CloseButton} onClick={() => setShowIconPicker(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className={styles.MenuContent}>
                        <button
                            className={styles.MenuItem}
                            onClick={() => {
                                setSelectedIcon(false);
                                setShowIconPicker(false);
                            }}
                        >
                        <p>None</p>
                        </button>

                        {icons.map((icon) => (
                            <button
                                key={icon.name}
                                className={styles.MenuItem}
                                onClick={() => {
                                    setSelectedIcon(icon);
                                    setShowIconPicker(false);
                                }}
                            >
                                {icon.source}
                            </button>
                        ))}
                    </div>
                
                </div>
            )}

            
        </div>
    )
}

export { OptionSelector, TextAlign, SmallTextBox, LargeTextArea, PageLogoUpload, ImageUpload, SocialSelector, ColourSelector, IconSelector }