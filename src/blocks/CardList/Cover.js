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
        if(!data.Date) return;
        const date = new Date(data.Date)

        const calendarMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        const Day = date.getDate();
        const Month = calendarMonths[date.getMonth()];
        const Year = date.getFullYear();

        return(
            <div className={CardListStyles.Cover}>
                <div className={CardListStyles.CoverDate} style={{backgroundColor: global.altBackgroundColor, color: global.foreground_onAlt}}>
                    <p className={CardListStyles.CoverDateDay}>{Day}</p>
                    <p className={CardListStyles.CoverDateMonthAndYear}>{Month} {Year}</p>
                </div>
            </div>
        )
    }

}