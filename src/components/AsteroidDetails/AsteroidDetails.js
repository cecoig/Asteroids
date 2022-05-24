import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAsteroidById } from '../../services/api-services';
import './AsteroidDetails.css';
/**
 * Asteroid Details component shows the asteroid details    
 * *  E.g.:
 * ```html
 *    <AsteroidDetails asteroidId={asteroidId} className='hidden' />
 * ```
 */
function AsteroidDetails(props) {
    const { asteroidId, className } = props;
    const asteroid = getAsteroidById(asteroidId);

    return (
        <section className={`asteroid-details ${className}`} >
            <Link to='/'>Back to list</Link>
            {asteroid
                ? <table>
                    <thead>
                        <tr>
                            <th colSpan='2'>
                                Asteroid Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            <td>{asteroid.name}</td>
                        </tr>
                        <tr>
                            <td>Closest approach date to Earth:</td>
                            <td>{asteroid.date.format('YYYY-MM-DD')}</td>
                        </tr>
                        <tr>
                            <td>Estimated Diameter:</td>
                            <td>{asteroid.estimatedDiameter}</td>
                        </tr>
                    </tbody>
                </table>
                : null
            }
        </section>
    )
}

AsteroidDetails.propTypes = {
    /**
     * Asteroid Id which details are shown
     */
     asteroidId: PropTypes.string.isRequired,
    /**
     * CSS class name
     */
     className: PropTypes.string.isRequired,
}


export default AsteroidDetails;