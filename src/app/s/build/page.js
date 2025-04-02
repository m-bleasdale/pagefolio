'use client'; //Dev only disable later

import { React, useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/navigation'

import { createClient } from '@/utils/supabase/client';

import styles from "@/app/styles/home.module.css";

export default function Build() {
    const { user, error, isLoading } = useUser();

    const router = useRouter();

    const [PageID, SetPageID] = useState();

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

    return(
        <div className={styles.Home}>
            <p>Hello</p>
        </div>
    );
};
