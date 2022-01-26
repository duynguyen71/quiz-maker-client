import dateFormat from "dateformat";

export const isOutDate = (date) => {
    const now = new Date();
    if (now > date) {
        return true;
    }
    return false;
}

export const formatDateDisplay = (date) => {
    return dateFormat(date, "HH:MM dd-mm-yyyy");
}
export const inRange = (start, end) => {
    const startDate = new Date(start);
    const finishDate = new Date(end);
    const now = new Date();
    if (now >= startDate && now < finishDate) {
        return true;
    }
    return false;
}