export const validateName = (name, isFull = true) => {
    if (!name.trim()) {
        return {valid: false, message: "Поле не должно быть пустым"};
    }

    if (name.split(" ").length !== 3 && isFull) {
        return {valid: false, message: "Введите полное ФИО"};
    }

    if (!name.split(" ")[2]?.trim() && isFull) {
        return {valid: false, message: "Введите полное ФИО"};
    }

    if (name.length < 2 || name.length > 100) {
        return {valid: false, message: "Имя должно быть от 2 до 100 символов"};
    }

    const nameRegex = /^[a-zA-Zа-яА-Я\s]+$/;
    if (!nameRegex.test(name.trim())) {
        return {valid: false, message: "Можно ввоить только буквы"};
    }

    return {valid: true, message: ""};
};

export const validatePhone = (phone) => {
    const transformPhone = phone.replace(/\D/g, "");
    if (!transformPhone.trim()) {
        return {valid: false, message: "Поле не должно быть пустым"};
    }

    if (transformPhone.length !== 11) {
        return {
            valid: false,
            message: "Введите корректно номер +7(...)...-..-..",
        };
    }

    return {valid: true, message: ""};
};

export const validateEmail = (email) => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
    if (!email.trim()) {
        return {valid: false, message: "Поле не должно быть пустым"};
    }

    if (!emailRegex.test(email)) {
        return {valid: false, message: "Ввеите корректно email"};
    }

    return {valid: true, message: ""};
};

export const validateCommit = (commit) => {
    const regex = /^[a-zA-Zа-яА-ЯёЁ0-9;:().,\s]+$/;

    if (commit.length === 0) {
        return {valid: true, message: ""};
    }

    if (!commit.trim()) {
        return {valid: false, message: "Нельзя вводить только пробелы"};
    }

    if (!regex.test(commit)) {
        return {valid: false, message: "Ввод спецсимволов запрещен."};
    }

    if (commit.trim().length < 10) {
        return {valid: false, message: "Минимальная длина 10 символов"};
    }

    if (commit.trim().length > 1000) {
        return {valid: false, message: "Максимальная длина 1000 символов"};
    }

    return {valid: true, message: ""};
};

export const validateCheckBox = (value) => {
    if (!value) {
        return {valid: false, message: "Необходимо согласиться."};
    } else {
        return {valid: true, message: ""};
    }
};