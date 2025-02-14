import React from 'react';

import styles from './preloader.module.scss';

const Preloader = ({isPopUp = false}) => {
    return (
        <section className={`${styles.main} ${isPopUp ? styles.popUp : ''}`}>
            <div className={`${styles.loader} ${styles.loader1}`}>
                <div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Preloader;