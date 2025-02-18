import {getFullPathImage} from "../getFullPathImage";

export const getUpdatedImageFields = (field, dataFields) => {
    return field.map(field => {
            if (field.name === 'image') {
                const urlImage = getFullPathImage(dataFields.image_path, dataFields.image_name);
                return {...field, value: urlImage}
            }

            if (field.name === 'image_priority') {
                return {...field, value: dataFields?.image_priority || dataFields?.priority}
            }

            return field
        }
    );
}