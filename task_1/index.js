import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)



export function decodeFields(encoded, translations) {
    return encoded.map(item => {
        const decodedItem = {};
        for (const key in item) {
            if (key.endsWith('Id') && key !== 'groupId' && key !== 'service' && key !== 'formatSize' && key !== 'ca') {
                const id = item[key];
                const translation = translations[id];
                decodedItem[key.slice(0, -2)] = translation || id;
            } else {
                decodedItem[key] = item[key];
            }
        }
        return decodedItem;
    });
}

const decoded = decodeFields(encoded, translations)

console.log("расшифровки полей");
console.log(decoded)

export function getUniqueId(encoded, translations) {
    const uniqueIds = new Set();

    // Получаем все уникальные ID из объектов в encoded
    encoded.forEach(item => {
        for (const key in item) {
            if (key.endsWith('Id')) {
                uniqueIds.add(item[key]);
            }
        }
    });

    // Фильтруем уникальные ID, оставляя только те, которые есть в translations
    const uniqueId = Array.from(uniqueIds).filter(id => translations.hasOwnProperty(id));

    return uniqueId;
}

const uniqueId = getUniqueId(encoded, translations);
console.log("список уникальных id");
console.log(uniqueId);
