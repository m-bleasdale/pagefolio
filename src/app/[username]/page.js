import Builder from '@/app/Builder';
import { createClient } from '@/utils/supabase/server';
import styles from '@/app/styles/page.module.css';

import {shell, coffeeplanet} from '@/app/TempData';


export async function generateMetadata({ params }) {
    const URLParams = await params;

    const supabase = await createClient();

    const { data, error } = await supabase
        .from('pages')
        .select('title, meta')
        .eq('slug', URLParams.username.toLowerCase())
        .single();

    if (error || !data) {
        return {
            title: 'Page Not Found',
            description: 'This page does not exist.',
        };
    }
    
    return {
      title: `${data.title} - PageFolio`,
      description: data.meta?.description || ''
    };
  }
  

export default async function Page({ params }) {
    const URLParams = await params;

    const supabase = await createClient();

    const { data, error } = await supabase
        .from('pages')
        .select('global_options, blocks')
        .eq('slug', URLParams.username.toLowerCase())
        .single();

    if (error || !data) {
        return (
            <p>Not found</p>
        )
    }
    
    return (
        <div 
        className={styles.page}
        style={{backgroundColor: data.global_options.backgroundColor}}
        >
            <div className={styles.main}>
                <Builder blocks={data.blocks} global={data.global_options} />
            </div>
        </div>
    )
}