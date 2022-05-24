import moment from 'moment';
import { useState, useEffect, Suspense } from 'react';
import { fetchPictureOfTheDay } from "../../services/api-services";
import Media from '../Media/Media';
import DatePicker from '../DatePicker/DatePicker';
import './DailyPicturePage.css'

/**
 * Daily Picture Page with Astronomy picture of the day
 *  *  E.g.:
 * ```html
 *    <DailyPicturePage />
 * ```
 */
function DailyPicturePage() {
    const [pictureDetails, setPictureDetails] = useState(null);

    const fetchData = (date) => {
        fetchPictureOfTheDay(date)
            .then(result => {
                setPictureDetails(result);
            })
            .catch(err => {
                setPictureDetails(err);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onChangeDate = (ev) => {
        const date = ev.target.value;
        fetchData(date);
    }

    const renderInputDateField = (date) => {
        return (
            <DatePicker
                className='center'
                date={pictureDetails.date}
                onChangeDate={onChangeDate}
            />
        )
    };

    const renderPage = (pictureDetails) => {
        return (
            <section className='page picture'>
                <h1 className='center'>{pictureDetails.title}</h1>
                {renderInputDateField(pictureDetails.date)}
                <Media type={pictureDetails.mediaType} src={pictureDetails.url} />
                <p className='justify'>{pictureDetails.explanation}</p>
            </section>
        )
    };

    const renderErrorMessage = (msg) => {
        return (
            <section className='page picture'>
                {renderInputDateField(pictureDetails.date)}
                <p className='center'>{msg}</p>
            </section>
        )
    }

    return (
        <Suspense>
            {
                pictureDetails
                    ? pictureDetails.msg
                        ? renderErrorMessage(pictureDetails.msg)
                        : renderPage(pictureDetails)
                    : null
            }
        </Suspense>
    )
}

export default DailyPicturePage;