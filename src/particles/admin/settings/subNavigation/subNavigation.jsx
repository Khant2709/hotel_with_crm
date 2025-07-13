import React from 'react';

import styles from './subNavigation.module.css';
import stylesFont from '../../../../styles/fonts/timesNewRoman.module.css';

const SubNavigation = ({navigation, toggleActiveType}) => {
    return (
        <nav className={styles.wrapperNav}>
            {navigation.map((el, index) => {
                const buttonText = el.type === 'create_admin' ? 'Изменить' : 'Открыть';
                return <div key={index} className={styles.containerNav}>
                    <p className={stylesFont.newRoman400}>{el.title}</p>
                    <button className={stylesFont.newRoman400} onClick={() => toggleActiveType(el.type)}>
                        {buttonText}
                    </button>
                </div>
            })}
        </nav>
    );
};

export default SubNavigation;