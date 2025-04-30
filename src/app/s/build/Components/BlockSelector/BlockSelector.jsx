import { React, useState } from 'react';

import styles from './BlockSelector.module.css';
import customiserStyles from './BlockCustomiser/BlockCustomiser.module.css';

import BlockCustomiser from './BlockCustomiser/BlockCustomiser';

const blockGroups = [
    {
        title: "General",
        blocks: [
            {
                block: "Header",
                title: "Header",
                icon: 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z" />
                </svg>
            },
            {
                block: "CardList",
                title: "Card List",
                icon: 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                </svg>
            },
            {
                block: "About",
                title: "About",
                icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                </svg>
            },
            {
                block: "ButtonLink",
                title: "Button",
                icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                </svg>
            },
            {
                block: "Gallery",
                title: "Gallery",
                icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                </svg>

            }
        ]
    }
]

export default function BlockSelector({ onAddBlock }) {
    const [displayCustomiser, setDisplayCustomiser] = useState(false);
    const [customiserBlockType, setCustomiserBlockType] = useState('');
    const [customiserBlockName, setCustomiserBlockName] = useState('');
    const [customiserBlockIcon, setCustomiserBlockIcon] = useState(<></>);

    function resetCustomiser(){
        setDisplayCustomiser(false);
        setCustomiserBlockType('');
        setCustomiserBlockName('');
        setCustomiserBlockIcon('');
    }

    function handleConfirmation(data) {
        onAddBlock(data);
        console.log(data);
        resetCustomiser();
    }

    function handleBlockPress(blockType, blockName, blockIcon) {
        setDisplayCustomiser(true);
        setCustomiserBlockType(blockType);
        setCustomiserBlockName(blockName);
        setCustomiserBlockIcon(blockIcon);
    }

    if(displayCustomiser){
        return (
            <div className={styles.Container}>
                <div className={customiserStyles.TitleContainer}>
                    <h1>Add New Block</h1>
                    <svg onClick={resetCustomiser} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className={customiserStyles.HeadingContainer}>
                    {customiserBlockIcon}
                    <h2>{customiserBlockName}</h2>
                </div>
                <BlockCustomiser blockType={customiserBlockType} onConfirmation={(data) => handleConfirmation(data)}/>
            </div>
        )
    }

    return (
        <div className={styles.Container}>
            <h1>Blocks</h1>
            <p className={styles.Info}>Press a block to customise it and add it to your PageFolio.</p>
            <div className={styles.Blocks}>
                {blockGroups.map((group, gindex) => (
                    <div className={styles.GroupContainer} key={gindex}>
                    <h2>{group.title}</h2>
                    <div className={styles.Group}>
                        {group.blocks.map((block, bindex) => (
                            <div className={styles.BlockContainer} key={bindex} onClick={() => handleBlockPress(block.block, block.title, block.icon)}>
                                {block.icon}
                                <p>{block.title}</p>
                            </div>
                        ))}
                    </div>
                    </div>
                ))}
            </div>
        </div>
    )

}