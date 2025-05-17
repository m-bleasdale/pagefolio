'use client';

import { React, useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';

import CardListStyles from './CardList.module.css';

import Heading from '@/blocks/Heading/Heading';
import Cover from './Cover';

import StackHorizontal from './Styles/StackHorizontal.module.css';
import StackVertical from './Styles/StackVertical.module.css';

export default function CardList({data, options, global}) {
    if(!data || !options) return;

    let LayoutStyles;
    if(options.layout === 'StackHorizontal') LayoutStyles = StackHorizontal;
    if(options.layout === 'StackVertical') LayoutStyles = StackVertical;

    const { width } = useWindowSize();
    const [groupsToShow, setGroupsToShow] = useState(1);
    const [cardsPerGroup, setCardsPerGroup] = useState();

    useEffect(() => {        
        const handleResize = () => {
            if(width < 600) {
                setCardsPerGroup(1);
            }
            else if(width < 1180) {
                setCardsPerGroup(2);
            }
            else {
                setCardsPerGroup(3);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [width]);

    const cardGroups = [];
    for (let i = 0; i < data.Cards.length; i += cardsPerGroup) {
        cardGroups.push(data.Cards.slice(i, i + cardsPerGroup));
    }
    
    const canShowMore = groupsToShow < cardGroups.length;

    const handleShowMore = () => {
        setGroupsToShow(prev => prev + 1);
    };

    return(
        <div className={CardListStyles.Container}>
            <div className={CardListStyles.CardList}>
                <Heading align={options.align} global={global}>{data.TitleText}</Heading> 
                <div className={LayoutStyles.ListContainer} style={{alignItems: options.align}}>
                    {cardGroups.slice(0, groupsToShow).map((group, groupIndex) =>(
                        <div className={LayoutStyles.Group} key={`group-${groupIndex}`}>
                            {group.map((card, cardIndex) => (
                                <div className={LayoutStyles.CardContainer} id={LayoutStyles[card.clickable]} key={cardIndex} style={{border: global.border}}>
                                    <Cover data={card.Cover} global={global}/>
                                    <div className={CardListStyles.TextContainer}>
                                        <p className={CardListStyles.CardTitle}>{card.TitleText}</p>
                                        <p className={CardListStyles.CardBody}>{card.BodyText}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                    {canShowMore && (
                        <div className={CardListStyles.ShowMore}>
                            <div className={CardListStyles.ShowMoreContainer}>
                                <button className={CardListStyles.ShowMoreButton} onClick={handleShowMore} style={{color: global.foreground}}>
                                    Show More
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                

            </div>
        </div>
    )
}