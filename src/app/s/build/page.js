'use client'; //Dev only disable later

import { React, useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'react-use';

import { createClient } from '@/utils/supabase/client';

import NoMobile from './Components/NoMobile';
import BlockSelector from './Components/BlockSelector/BlockSelector';
import Header from './Components/Header/Header';

import styles from "./build.module.css";

export default function Build() {
    const { user, error, isLoading } = useUser();

    const router = useRouter();

    const [PageID, SetPageID] = useState();
    const [displayMobile, SetDisplayMobile] = useState(false);

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
            else return data;
        }

        SetPageID(getPageID());

    }, [isLoading]);


    //Display error message if trying to use on mobile
    const { width } = useWindowSize();
    useEffect(() => {
        if(width < 1000) SetDisplayMobile(true);
        else SetDisplayMobile(false)
    }, [width]);
    if(displayMobile) return <NoMobile /> 

    return(
        <div className={styles.Page}>
            <Header />
            <div className={styles.Main}>
                <div></div>
                <div></div>
                <BlockSelector />
            </div>
        </div>
    );
};
