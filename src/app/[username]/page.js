import Builder from '@/app/Builder';
import styles from '@/app/styles/page.module.css';

import {shell, coffeeplanet} from '@/app/TempData';

export async function generateMetadata({ params }) {
    const slug = params.username;
    let data;
    if(slug === 'shell') data = shell;
    if(slug === 'coffeeplanet') data = coffeeplanet;

    const Title = data.meta?.title || data.username;

    return {
      title: `${Title} - PageFolio`,
      description: data.meta?.description || ''
    };
  }
  

export default async function Page({ params }) {
    const slug = params.username;
    let data;
    if(slug === 'shell') data = shell;
    if(slug === 'coffeeplanet') data = coffeeplanet;

    return (
        <div 
        className={styles.page}
        style={{backgroundColor: data.global.backgroundColor}}
        >
            <div className={styles.main}>
                <Builder blocks={data.blocks} global={data.global} />
            </div>
        </div>
    )
}