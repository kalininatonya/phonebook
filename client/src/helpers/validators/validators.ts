export const required = (value: string): string | undefined => {
    if (value) {
        return undefined;
    }
    return 'Обязательно для заполнения';
};

export const maxLengthCreator = (maxLength: number) => (value: string): string | undefined => {
    if (value && value.length > maxLength) {
        return `Длина заголовка должна быть до ${maxLength} символов`;
    }
    return undefined;
};

export const minLengthCreator = (minLength: number) => (value: string): string | undefined => {
    if (value && value.length < minLength) {
        return `Длина заголовка должна быть больше ${minLength} символов`;
    }
    return undefined;
};

export const validationTelephone = (value: string): string | undefined => {
    if (Number(value)) {
        return undefined;
    }
    return 'Введите корректный номер телефона';
};