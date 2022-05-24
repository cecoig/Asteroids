import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Sidebar.css';

/**
 * Display the list of the asteroids between two dates.
 */
function Sidebar(props) {
    const {
        list,
        onClickLink,
        className,
        children
    } = props;


    return (
        <aside className={className}>
            {children}
            <ul>
                {list.map(asteroid => {
                    return (
                        <li key={asteroid.id}>
                            <Link to={`asteroids/${asteroid.id}`} onClick={onClickLink}>{asteroid.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </aside>
    );
}

Sidebar.propTypes = {
    /**
     * An array with the asteroids  
     */
    list: PropTypes.array.isRequired,
    /**
     * Callback invoked when a list item is clicked 
     */
    onClickLink: PropTypes.func,
    /**
     * CSS  class name
     */
    className: PropTypes.string,
    /**
     * any HTML element
     */
    children: PropTypes.element.isRequired
}

export default Sidebar;