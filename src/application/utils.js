const isTrashFolder = folder => folder.id === 2;

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 4 * WEEK;
const YEAR = 52 * WEEK;

const getTwelveHourFormat = (hours, minutes) => {
    const period = hours > 12 ? 'PM' : 'AM';
    const hour = hours % 12 || 12;
    return `${hour} : ${minutes} ${period}`;
}

const getReadableTimeStamp = timestamp => {
    const now = new Date().getTime();
    const diffTimestamp = now - timestamp;
    const date = new Date(timestamp);
    const dateString = date.toDateString();
    const timeString = date.toTimeString();
    const [hours, minutes, ...rest] = timeString.split(':');
    const [dayOfWeek, month, day, year] = dateString.split(' ');
    if (diffTimestamp <= DAY) {
        // if same day -> time
        return getTwelveHourFormat(hours, minutes);
    } else if (diffTimestamp <= WEEK) {
        // if same week -> day time
        const time = getTwelveHourFormat(hours, minutes);
        return `${dayOfWeek} ${time}`;
    } else if (diffTimestamp <= MONTH) {
        // if same month -> dd day
        return `${dayOfWeek} ${day}`
    } else if (diffTimestamp <= YEAR) {
        // if same year -> dd month 
        return `${day}/${month}`
    } else {
        // else -> dd month year
        return `${day}/${month}/${year}`
    }
}

export {
    isTrashFolder,
    getReadableTimeStamp
}