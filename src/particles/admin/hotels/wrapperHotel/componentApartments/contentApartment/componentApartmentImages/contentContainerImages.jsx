import React from 'react';
import {AdminButton} from "../../../../../../../components/ui/admin/buttons/buttons";
import ContainerFieldImage from "../../../../../../../components/ui/admin/containerFieldImage/containerFieldImage";

const ContentContainerImages = ({
                                    isCreate,
                                    setModeEdit,
                                    fields,
                                    handleFieldChange,
                                    setIsCreate,
                                    actionRequest,
                                    indexShowHelp,
                                    handleToggleHelpText,
                                    apartmentImages,
                                    indexEditField,
                                    toggleEditMode,
                                }) => {
    return (
        <>
            <AdminButton text={'Назад в меню'} handleClick={() => setModeEdit('')}/>
            {isCreate
                ? <ContainerFieldImage fields={fields}
                                       isEditMode={true}
                                       handleFieldChange={handleFieldChange}
                                       handleEdit={() => setIsCreate(false)}
                                       handleSave={() => actionRequest('create')}
                                       hasDelete={false}
                                       indexShowHelp={indexShowHelp}
                                       handleToggleHelpText={handleToggleHelpText}
                />
                : <AdminButton text={'Добавить фотографию'} type={'archive'} handleClick={() => setIsCreate(true)}/>
            }

            {!isCreate && apartmentImages && apartmentImages.map(image => {
                const isEditMode = image.id === indexEditField;
                const handleEdit = isEditMode ? toggleEditMode : () => toggleEditMode(image.id, image);
                return (
                    <ContainerFieldImage key={image.id}
                                         fields={fields}
                                         fieldsValue={image}
                                         isEditMode={isEditMode}
                                         handleFieldChange={handleFieldChange}
                                         handleEdit={handleEdit}
                                         handleSave={() => actionRequest('update')}
                                         hasDelete={true}
                                         handleDelete={() => actionRequest('delete')}
                                         indexShowHelp={indexShowHelp}
                                         handleToggleHelpText={handleToggleHelpText}
                    />
                )
            })}
        </>
    );
};

export default ContentContainerImages;