import React from 'react';

import {AdminButton} from "../../../../../components/ui/admin/buttons/buttons";

import ContainerFieldImage from "../../../../../components/ui/admin/containerFieldImage/containerFieldImage";

/** Компонент редактирования/создания фотографий статьи.
 * @param {Object} props - Пропсы компонента.
 * @param {array || null} props.fields - Массив полей.
 * @param {array} props.images - Массив изображений.
 * @param {number} props.selectedImageId - ID выбранного изображения.
 * @param {function} props.setSelectedImageId - Обработчик изменения изображения(id).
 * @param {array} props.indexShowHelp - Массив с индексами полей для отображения подсказки.
 * @param {function} props.toggleStateHelpText - Обработчик для показа подсказки поля.
 * @param {function} props.handleFieldChange - Обработчик изменения поля.
 * @param {function} props.setMode - Обработчик изменения режима редактирования.
 * @param {string} props.mode - Режим реактирования.
 * @param {function} props.handleRequest - Функция для удаления статьи.
 * @returns {JSX.Element} - Компонент редактирования/создания фотографий статьи.
 */
const ContentFieldsImages = ({
                                 fields,
                                 images,
                                 selectedImageId,
                                 setSelectedImageId,
                                 handleFieldChange,
                                 indexShowHelp,
                                 toggleStateHelpText: handleToggleHelpText,
                                 setMode,
                                 mode,
                                 handleRequest
                             }) => {

    const toggleMode = (type) => {
        switch (type) {
            case 'create':
                setMode('create_image');
                break;
            case 'back':
                setMode('update_images');
                break;
            default:
                setMode('');
                break;
        }
    };

    return (
        <>
            <AdminButton text={'Назад в меню'} handleClick={() => toggleMode()}/>
            {mode === 'create_image'
                ? <ContainerFieldImage fields={fields || []}
                                       isEditMode={true}
                                       handleFieldChange={handleFieldChange}
                                       handleEdit={() => toggleMode('back')}
                                       handleSave={() => handleRequest()}
                                       hasDelete={false}
                                       indexShowHelp={indexShowHelp}
                                       handleToggleHelpText={handleToggleHelpText}
                />
                : <AdminButton text={'Добавить фотографию'} type={'archive'} handleClick={() => toggleMode('create')}/>
            }

            {mode === 'update_images' && images.map(image => {
                const isEditMode = image.id === selectedImageId;
                const handleEdit = isEditMode ? () => setSelectedImageId(null) : () => setSelectedImageId(image.id);
                return (
                    <ContainerFieldImage key={image.id}
                                         fields={fields || []}
                                         fieldsValue={image}
                                         isEditMode={isEditMode}
                                         handleFieldChange={handleFieldChange}
                                         handleEdit={handleEdit}
                                         handleSave={() => handleRequest()}
                                         hasDelete={true}
                                         handleDelete={() => handleRequest(true, 'image')}
                                         indexShowHelp={indexShowHelp}
                                         handleToggleHelpText={handleToggleHelpText}
                    />
                )
            })}
        </>
    );
};

export default ContentFieldsImages;