import moment from 'moment';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchAsteroidsFromTo } from '../../services/api-services';
import Sidebar from '../Sidebar/Sidebar';
import AsteroidDetails from '../AsteroidDetails/AsteroidDetails';
import DatePicker from '../DatePicker/DatePicker';
import './AsteroidsPage.css';

/**
 * Asteroid Page with side bar and section with asteroid details
 * 
 *  *  E.g.:
 * ```html
 *    <AsteroidsPage />
 * ```
 */
function AsteroidsPage() {
    const [state, setState] = useState({
        asteroids: [],
        shownDetails: false,
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().add(5, 'days').format('YYYY-MM-DD'),
        isLoading: true,
    });

    const location = useLocation();
    let { asteroidId } = useParams();

    const fetchAsteroids = (startDate, endDate) => {
        setState({
            ...state,
            startDate: startDate,
            endDate: endDate,
            isLoading: true,
            asteroids: []
        });

        fetchAsteroidsFromTo(startDate, endDate)
            .then(result => {
                setState({
                    ...state,
                    startDate: startDate,
                    endDate: endDate,
                    asteroids: result,
                    isLoading: false
                });
            })
            .catch(error => {
                setState({
                    ...state,
                    asteroids: [],
                    endDate: ''
                });

                alert(error.error_message);
                console.error(error);
            });
    }

    useEffect(() => {
        fetchAsteroids(state.startDate, state.endDate);
    }, []);

    useEffect(() => {
        if (location.pathname === '/') {
            setState({
                ...state,
                shownDetails: false
            });
        }
    }, [location]);

    const onChangeStartDate = (ev) => {
        const startDate = ev.target.value;
        const endDate = startDate;
        fetchAsteroids(startDate, endDate);
    }

    const onChangeEndDate = (ev) => {
        const endDate = ev.target.value;
        fetchAsteroids(state.startDate, endDate);
    }

    return (
        <section className='page'>
            <Sidebar
                className={state.shownDetails ? '' : 'active'}
                list={state.asteroids}
                onClickLink={() => setState({ ...state, shownDetails: true })}
            >
                <>
                    <div className='center'>
                        <DatePicker date={state.startDate} onChangeDate={onChangeStartDate}>Start Date</DatePicker>
                        <DatePicker date={state.endDate} onChangeDate={onChangeEndDate}>End Date</DatePicker>
                    </div>
                    {state.isLoading ? <p className='center loading'>Loading ...</p> : null}
                </>
            </Sidebar>
            {state.asteroids[0]
                ? <AsteroidDetails
                    className={state.shownDetails ? 'active' : ''}
                    asteroidId={asteroidId || state.asteroids[0].id}
                />
                : null}
        </section>
    )
}

export default AsteroidsPage;