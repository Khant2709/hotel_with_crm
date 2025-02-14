export const updateFields = (fields, hotel) => {
    return fields.map(field => {
        return {
            ...field,
            value: hotel[field.name] || field.value || '--'
        }
    });
};

export const toggleHelpText = (indexShowHelp, setIndexShowHelp, index) => {
    const checkIndex = indexShowHelp.includes(index);
    if (checkIndex) {
        const filterIndex = indexShowHelp.filter(el => el !== index);
        setIndexShowHelp(filterIndex);
    } else {
        setIndexShowHelp([...indexShowHelp, index]);
    }
}