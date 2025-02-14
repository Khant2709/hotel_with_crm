export const createField = ({
                                label,
                                typeField = 'div',
                                type,
                                name,
                                value = '',
                                placeholder = null,
                                options = null,
                                file = null,
                                isEdit = false,
                                validation = null,
                                errorText = '',
                                helpText = null,
                                group = null,
                                optionValue = null
                            }) => {
    return {
        label,
        typeField,
        type,
        name,
        value,
        placeholder,
        options,
        file,
        isEdit,
        validation,
        errorText,
        helpText,
        group,
        ...(optionValue !== null && {optionValue})
    };
};
