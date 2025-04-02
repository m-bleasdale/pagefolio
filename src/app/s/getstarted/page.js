'use client';

import { React, useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/navigation'

import { createClient } from '@/utils/supabase/client';

import styles from "./getstarted.module.css";
import RadioButtonStyles from './styles/RadioButtons.module.css';

export default function Build() {
    const { user, error, isLoading } = useUser();

    const router = useRouter();

    const [selectedRadioOption, setSelectedRadioOption] = useState('');
    const [slug, setSlug] = useState('');

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    //Verify user has not already got a page
    useEffect(() => {
        if(isLoading) return;
        async function getPageID () {
            const supabase = createClient();
            const { data, error } = await supabase.from('pages').select('id').eq('user_id', user.sub);
            if(data.length !== 0) router.push('/s/build');
        }
        getPageID();
    }, [isLoading]);

    /*Sub-components*/
    function RadioButtons ({options}) {    
        return(
            <div className={RadioButtonStyles.RadioContainer}>
                {options.map((option, index) => (
                    <label key={index} className={RadioButtonStyles.RadioBox} id={RadioButtonStyles[`${selectedRadioOption === `option${index}` ? 'selected' : ''}`]}>
                        <input
                        type="radio"
                        value={`option${index}`}
                        checked={selectedRadioOption === `option${index}`}
                        onChange={(e) => {setSelectedRadioOption(e.target.value)}}
                        />
                        {option}
                    </label>
                ))}
            </div>
        )
    }

    /*Handle Submit*/
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        const page_type = selectedRadioOption;
        const slugInput = slug;

        const errorMessages = {
            "slug-bad-length": "Username must be between 3 and 30 characters.",
            "slug-banned": "This username is not allowed. Please choose a different one.",
            "slug-reserved": "This username is reserved.",
            "slug-taken": "This username is already in use."
        }

        //Presence check
        if (!slugInput) {
            setErrorMessage('A value is required.');
            setLoading(false);
            return;
        }

        try{
            const response = await fetch('/api/builder/createPage', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ slugInput, page_type }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorMessages[errorData.message] || 'Something went wrong!');
            } else {
                //redirect
            }
        } catch (err) {
            console.error('Error:', err);
            setErrorMessage('Something went wrong!');
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className={styles.Page}>
            <div className={styles.MainContainer}>
                <div className={styles.FormContainer}>
                    <div className={styles.InfoContainer}>
                        <h1>Let's get started</h1>
                        <p>Tell us a bit about yourself and select your username.</p>
                    </div>
                    <div className={styles.FormContainer}>
                        <div className={styles.PageTypeContainer}>
                            <h2>What best describes your PageFolio?</h2>
                            <RadioButtons options={["Personal", "Organisation", "Other"]} />
                        </div>
                        <label className={styles.SlugContainer}>
                            <h2>Pick your username</h2>
                            <p>This is used to generate a unique link for your page.</p>
                            <div className={styles.InputContainer}>
                                <p>pagefol.io/</p>
                                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} />
                            </div>
                            <div className={styles.ErrorContainer}>
                                {errorMessage && <p className={styles.Error}>{errorMessage} {errorMessage === "This username is reserved." && <a href=''>Find out more</a>}</p>}
                            </div>
                        </label>

                        <input className={styles.Continue} type="submit" value="Continue" onClick={(e) => !loading ? handleSubmit(e): true} id={styles[loading ? 'loading' : '']}/>

                    </div>
                </div>
            </div>
            <div className={styles.SideContainer}>

            </div>
        </div>
    );
};
