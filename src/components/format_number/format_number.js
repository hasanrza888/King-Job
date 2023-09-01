export const formatNumber = (number)=> {
    const cleanedNumber = Number(number)
    if (cleanedNumber >= 1000000) {
        return (cleanedNumber / 1000000).toFixed(0.1) + 'M';
    } else if (cleanedNumber >= 1000) {
        return (cleanedNumber / 1000).toFixed(0.1) + 'K';
    } else {
        return cleanedNumber;
    }
}