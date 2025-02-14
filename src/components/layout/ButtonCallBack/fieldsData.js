import {createField} from "../../ui/fields/createField";
import {validateCheckBox, validateName, validatePhone} from "../../../utils/validate/validateFields";

export const fieldsData = [
    createField({
        typeField: 'input',
        type: 'text',
        name: 'name',
        placeholder: 'Имя',
        value: '',
        validation: (value) => validateName(value, false),
    }),
    createField({
        typeField: 'input',
        type: 'tel',
        name: 'phone',
        placeholder: 'Номер',
        value: '',
        validation: (value) => validatePhone(value),
    }),
    createField({
        typeField: 'input',
        type: 'checkbox',
        name: 'checkbox',
        value: '',
        validation: (value) => validateCheckBox(value),
    }),
];