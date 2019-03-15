const isTrashFolder = (folder) => folder.id === 2;

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 4 * WEEK;
const YEAR = 52 * WEEK;

const getReadableTimeStamp = timestamp => {
    const now = new Date().getTime();
    // if same day -> time
    // if same week -> day time
    // if same month -> dd day time
    // if same year -> dd month time
    // else -> dd month year time
}

export {
    isTrashFolder
}