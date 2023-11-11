// Changes case of each word in a string to upper/lower case
export function changeCase(str, letterCase="uppercase") {
    const words = str.split(' ');

    const updatedWords = words.map(word => {
        if (letterCase === 'uppercase' && word.length > 0){
            return word.charAt(0).toUpperCase() + word.slice(1);
        } else if (letterCase === 'lowercase' && word.length > 0){
            return word.charAt(0).toLowerCase() + word.slice(1);
        } else {
            return '';
        }
    });

    return updatedWords.join(' ');
};