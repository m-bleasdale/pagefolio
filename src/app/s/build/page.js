'use client'; //Dev only disable later

import { React, useState, useEffect, createContext } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'react-use';

import { createClient } from '@/utils/supabase/client';

import NoMobile from './Components/NoMobile';
import Loading from './Components/Loading';

import BlockSelector from './Components/BlockSelector/BlockSelector';
import GlobalOptions from './Components/GlobalOptions/GlobalOptions';
import Header from './Components/Header/Header';

import Builder from '@/app/Builder';

import styles from "./build.module.css";

const temp_global = {
    backgroundColor: '#fdfdfd',
    altBackgroundColor: '#f4f4f4', //By default should be same as backgroundColor
    foreground: '#000000', //Mainly text
    foreground_onAlt: '#000000', //Foreground when background is alt color
    foreground_light: '#4D4D4D', //Not user input (30% lightened of foreground)
    foreground_light_onAlt: '#4D4D4D', //30% lightened of alt foreground
    primary: '#D52B1E', //Mainly used for buttons or icons
    foreground_onPrimary: '#ffffff', //Used when primary colour is a background and foreground colour is hard to see
    accent: '#f0f0f0', //Mainly used for secondary buttons or icons
    border: '1px solid #dddddd', //"none" if no border or "2px solid <color>"
    shadowsEnabled: false    
}

export const PageInformationContext = createContext();

export default function Build() {
    const { user, error, isLoading } = useUser();

    const router = useRouter();

    const [PageID, SetPageID] = useState();
    const [displayMobile, SetDisplayMobile] = useState(false);

    const [Blocks, SetBlocks] = useState([]);

    //Get ID of page to update
    //And redirect not logged in user
    useEffect(() => {
        if(isLoading) return;
        if(!user) router.push('/auth/login?returnTo=/s/build');

        async function getPageID () {
            const supabase = createClient();

            const { data, error } = await supabase
                .from('pages')
                .select('id')
                .eq('user_id', user.sub);
            
            if(data.length === 0){
                router.push('/s/getstarted');
                return null;
            }

            if(error) console.error(error);
            else SetPageID(data);
        }

        getPageID();

    }, [isLoading]);

    //Display error message if trying to use on mobile
    const { width } = useWindowSize();
    useEffect(() => {
        if(width < 1000) SetDisplayMobile(true);
        else SetDisplayMobile(false)
    }, [width]);



    if(displayMobile) return <NoMobile /> 
    if(isLoading) return <Loading />

    return(
        <PageInformationContext.Provider value={{pageID: PageID}}>
        <div className={styles.Page}>
            <Header />
            <div className={styles.BuilderContainer}>
                <Builder blocks={Blocks} global={temp_global}/>
            </div>
            <GlobalOptions />
            <BlockSelector onAddBlock={(newBlock) => SetBlocks(prevBlocks => [...prevBlocks, newBlock])}/>
        </div>
        </PageInformationContext.Provider>
    );
};
