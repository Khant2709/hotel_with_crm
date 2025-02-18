import React from 'react';

import WrapperApartmentImages from "./componentApartmentImages/wrapperApartmentImages";
import {ContainerApartment} from "./containerApartment/containerApartment";
import {CardApartment} from "./cardApartment/cardApartment";

import styles from "./contentApartment.module.css";
import stylesFontT from "../../../../../../styles/fonts/timesNewRoman.module.css";

const ContentApartment = ({
                              modeEdit,
                              apartments,
                              activeIndex,
                              editCategory,
                              showSetting,
                              setModeEdit,
                              currentApartment,
                              fields,
                              handleToggleHelpText,
                              handleFieldChange,
                              indexShowHelp,
                              sendEditor,
                              setActiveCategory
                          }) => {
    return (
        <div className={styles.wrapperMain}>
            <p className={`${stylesFontT.newRoman700} ${styles.title}`}>Номера (редактирование)</p>
            {!modeEdit && apartments.map(apartment => {
                return <ContainerApartment key={apartment.id}
                                           apartment={apartment}
                                           isActive={apartment.id === activeIndex}
                                           editCategory={editCategory}
                                           showSetting={showSetting}
                                           setModeEdit={setModeEdit}
                />
            })}

            {modeEdit && modeEdit !== 'apartment_photo' &&
            <CardApartment currentApartment={currentApartment}
                           fields={fields}
                           toggleStateHelpText={handleToggleHelpText}
                           handleFieldChange={handleFieldChange}
                           indexShowHelp={indexShowHelp}
                           handleCancel={() => setModeEdit('')}
                           handleSave={sendEditor}

            />}

            {modeEdit && modeEdit === 'apartment_photo' &&
            <WrapperApartmentImages apartmentImages={fields}
                                    setModeEdit={setModeEdit}
                                    apartmentId={currentApartment.id}
                                    setActiveCategory={setActiveCategory}
                                    indexShowHelp={indexShowHelp}
                                    handleToggleHelpText={handleToggleHelpText}
            />}
        </div>
    );
};

export default ContentApartment;