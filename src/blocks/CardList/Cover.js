import { React } from 'react';
import CardListStyles from './CardList.module.css';

export default function Cover ({data, global}) {
    if(!data) return;

    if(data.Type === "Image")
    {
        if(!data.ImageSource) return;

        return(
            <div className={CardListStyles.Cover}>
                <img src={data.ImageSource} />
            </div>
        )    
    }
    if(data.Type === "Date")
    {
        console.log(data.Date)

        if(!data.Date) return;

        const calendarMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        const Day = data.Date.getDate();
        const Month = calendarMonths[data.Date.getMonth()];
        const Year = data.Date.getFullYear();

        return(
            <div className={CardListStyles.Cover}>
                <div className={CardListStyles.CoverDate} style={{backgroundColor: global.altBackgroundColor}}>
                    <p className={CardListStyles.CoverDateDay}>{Day}</p>
                    <p className={CardListStyles.CoverDateMonthAndYear}>{Month} {Year}</p>
                </div>
            </div>
        )
    }

}