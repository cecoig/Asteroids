import moment from 'moment';

const baseUrl = 'https://api.nasa.gov/';
const feedUrl = baseUrl + 'neo/rest/v1/feed';
const apodUrl = baseUrl + 'planetary/apod';
const apiKey = 'DEMO_KEY';
const units = 'kilometers';
let asteroidsMap = {};

/**
 * Retrieve a list of Asteroids based on their closest approach date to Earth.
 * @param { String } startDate Starting date for asteroid search | format: YYYY-MM-DD
 * @param { String } endDate Ending date for asteroid search | format: YYYY-MM-DD
 * @returns {Array(Object)} List with asteroids  
 */
export async function fetchAsteroidsFromTo(startDate, endDate) {
    const url = new URL(feedUrl);
    url.searchParams.append('api_key', apiKey);
    url.searchParams.append('start_date', startDate);
    url.searchParams.append('end_date', endDate);

    const response = await fetch(url, { cache: "force-cache" });
    const json = await response.json();

    if (!response.ok) {
        return Promise.reject(json);
    }

    const asteroids = [];
    for (let date in json['near_earth_objects']) {
        json['near_earth_objects'][date]
            .forEach(obj => {
                const estimatedDiameterMin =
                    parseFloat(obj.estimated_diameter[units].estimated_diameter_min);
                const estimatedDiameterMax =
                    parseFloat(obj.estimated_diameter[units].estimated_diameter_max);
                const asteroid = {
                    name: obj.name,
                    id: obj.id,
                    estimatedDiameter: `${estimatedDiameterMin.toFixed(2)} - ${estimatedDiameterMax.toFixed(2)} ${units}`,
                    date: moment(date)
                };

                asteroids.push(asteroid);
                asteroidsMap[obj.id] = asteroid;
            });
    }

    return asteroids;
}

/**
 * Returns a specific Asteroid based on its ID
 * @param {String} id Asteroid SPK-ID correlates to the NASA JPL small body
 * @returns {Object} Returns a specific asteroid
 */
export function getAsteroidById(id) {
    return asteroidsMap[id];
}

/**
 * @param {String} date The date of the image to retrieve
 * @returns {Object} Returns details about the picture of the day 
 */
export async function fetchPictureOfTheDay(date) {
    const url = new URL(apodUrl);
    url.searchParams.append('api_key', apiKey);
    if (date) {
        url.searchParams.append('date', date);
    }

    const response = await fetch(url, { cache: "force-cache" })
    const json = await response.json();

    if (!response.ok) {
        return Promise.reject(json);
    }

    return {
        title: json.title,
        date: json.date,
        url: json.url,
        mediaType: json.media_type,
        explanation: json.explanation,
    }
}
