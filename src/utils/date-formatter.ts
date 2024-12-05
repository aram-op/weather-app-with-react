export function getFormattedDate(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const time = date.toLocaleTimeString([], {hour12: false, hour: '2-digit', minute: '2-digit'});
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return `${time}, ${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}`;
}