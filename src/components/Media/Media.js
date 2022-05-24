import { useState } from 'react';
import './Media.css';
import PropTypes from 'prop-types';

const mediaTypes = {
    image: 'image',
    video: 'video'
}

/**
 * Displays the API's media - image of video . For images there is support of full screen mode.
 * A click on the image activate it. 
 */
function Media(props) {
    const { type, src } = props;
    const [isFullScreenMode, setIsFullScreenMode] = useState(false);

    const toggleScreenMode = () => {
        setIsFullScreenMode(!isFullScreenMode);
    }


    return (
        <p className={isFullScreenMode ? 'media full-screen' : 'media'}>
            {type === mediaTypes.image
                ? <img src={src} onClick={toggleScreenMode}/>
                : type === mediaTypes.video
                    ? <iframe src={src} />
                    :`${type} : unsupported media type` 
            }
        </p>
    )
}

Media.propTypes = {
    /**
     * The type of the media: image or video.
     */
    type: PropTypes.oneOf(['image', 'video']), 
    /**
     * Link to the media source.
     */
    src: PropTypes.string.isRequired
}

export default Media;