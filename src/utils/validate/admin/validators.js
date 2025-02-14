import {
    emailSchema,
    fileSchema,
    numberSchema, phoneSchema,
    textSchema,
    yandexMapsConstructorLinkSchema,
    yandexMapsLinkSchema
} from "./validatorsSchema";

export const validateNumber = (value) => {
    const numberValue = +value;
    if (isNaN(numberValue)) {
        return { errorText: 'Должно быть числом' };
    }
    const parseResult = numberSchema.safeParse(numberValue);

    if (parseResult.success) {
        return { errorText: '' };
    } else {
        return { errorText: parseResult.error.issues[0].message };
    }
};

export const validateFile = (file) => {
    const parseResult = fileSchema.safeParse(file);
    if (parseResult.success) {
        return {errorText: ''};
    } else {
        return {errorText: parseResult.error.issues[0].message};
    }
};

export const validateText = (value) => {
    const parseResult = textSchema.safeParse(value.trim());

    if (parseResult.success) {
        return {errorText: ''};
    } else {
        return {errorText: parseResult.error.issues[0].message};
    }
};

export const validateYaLink = (value, type) => {
    if (type !== 'constructor' && type !== 'maps') {
        return { errorText: 'Неверный тип ссылки' };
    }

    const parseResult = type === 'constructor'
        ? yandexMapsConstructorLinkSchema.safeParse(value)
        : yandexMapsLinkSchema.safeParse(value);

    if (parseResult.success) {
        return { errorText: '' };
    } else {
        return { errorText: parseResult.error.issues[0].message };
    }
};

export const validateContacts = (value, type) => {
    const schemaMap = {
        phone: phoneSchema,
        email: emailSchema,
    };

    const schema = schemaMap[type];
    if (!schema) {
        return { errorText: 'Неверный тип контакта' };
    }

    const parseResult = schema.safeParse(value);
    if (parseResult.success) {
        return { errorText: '' };
    } else {
        return { errorText: parseResult.error.issues[0].message };
    }
};