import {React} from 'react';

import Header from "@/blocks/Header/Header";
import About from "@/blocks/About/About";
import CardList from "@/blocks/CardList/CardList";
import ButtonLink from "@/blocks/ButtonLink/ButtonLink";
import ImageWithText from '@/blocks/ImageWithText/ImageWithText';

export function Block ({type, data, options, global}) {

    const components = {
        'Header': <Header data={data} options={options} global={global} />,
        'About': <About data={data} options={options} global={global} />, 
        'ButtonLink': <ButtonLink data={data} options={options} global={global} />,
        'CardList': <CardList data={data} options={options} global={global} />,
        'ImageWithText': <ImageWithText data={data} options={options} global={global} />
    }

    return components[type];

}

export default function Builder ({blocks, global}){
    
    return (
        blocks.map((block, index) => (
            <Block
                key={index}
                type={block.type}
                data={block.data}
                options={block.options}
                global={global}
            />
        ))
    )

}