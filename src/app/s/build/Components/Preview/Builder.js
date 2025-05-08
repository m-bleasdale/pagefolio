import {React, useEffect} from 'react';

import EditorOverlayProvider from './EditorOverlayProvider';

import {Block} from "@/app/Builder";

export default function Builder ({blocks, global}){
    
    return (
        blocks.map((block, index) => (
            <EditorOverlayProvider id={block.id} type={block.type} key={index}>
                <Block
                    key={index}
                    type={block.type}
                    data={block.data}
                    options={block.options}
                    global={global}
                />
            </EditorOverlayProvider>
        ))
    )

}