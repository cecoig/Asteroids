import { Link } from 'react-router-dom';
import './header.css'

/**
 *  Side header with logo and navigation menu to the both pages. 
 */
function Header() {
    return (
        <header>
            <Link className='logo' to='/'><h1>Asteroids</h1></Link>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Asteroids</Link>
                    </li>
                    <li>
                        <Link to='/picture'>Astronomy Picture Of The Day</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;