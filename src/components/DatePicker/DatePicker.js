import moment from 'moment';
import PropTypes from 'prop-types';

/**
 * Input field from type date and label.   
 *  *  E.g.:
 * ```html
 *    <DatePicker 
 *      id='pickerId'
 *      date='2022-05-25' 
 *      onChangeDate={onChangeHandler} 
 *      className='center'
 *      > 
 *          Input Name
 *      <DatePicker />
 * ```
 */
function DatePicker(props) {
    const {
        date,
        onChangeDate,
        id,
        className, 
        children
    } = props;

    return (
        <p className={className}>
            {children ? <label htmlFor={id}>{children}</label> : null}
            <input
                id={id}
                type='date'
                value={date ? moment(date).format('YYYY-MM-DD') : ''}
                onChange={onChangeDate}
            />
        </p>
    )
}

DatePicker.propTypes = {
    /**
     * Initial value of the date input field as a string in format "YYYY-MM-DD".
     */
    date:  PropTypes.string,
    /**
     * Callback invoked when the value of the input field is changed. 
     */
    onChangeDate: PropTypes.func,
    /**
     * Id of the field.
     */
    id: PropTypes.string,
    /**
     * Class Name
     */
    className: PropTypes.string, 
    /**
     * String as input label 
     */
    children: PropTypes.string
}

export default DatePicker;