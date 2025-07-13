import React from 'react';

import styles from './contentArticles.module.css';
import stylesFont from '../../../styles/fonts/timesNewRoman.module.css';
import Title from "../../../components/ui/title/title";
import {getFullPathImage} from "../../../utils/getFullPathImage";
import {transformDateFormat} from "../../../utils/getDay";

const ContentArticles = ({articles, handleClick}) => {
    return (
        <div className={styles.wrapperContent}>
            <Title Tag={'h1'} text={'Наш мини-блог'}/>
            <div className={styles.containerArticles}>
                {articles.map(article => {
                    return <CardArticle key={article.id} article={article} handleClick={handleClick}/>
                })}
            </div>
        </div>
    );
};

export default ContentArticles;

const CardArticle = ({article, handleClick}) => (
    <div className={`${stylesFont.newRoman400} ${styles.cardArticle}`} onClick={() =>handleClick(article.id)}>
        <div className={styles.previewImage}
             style={{backgroundImage: `url(${getFullPathImage(article.folder_img, article.preview_img_name)})`}}/>
        <p className={styles.title}>{article.title}</p>
        <p className={styles.text}>{article.short_text}</p>
        <div className={styles.containerMore}>
            <p className={styles.miniBtn} onClick={() =>handleClick(article.id)}>открыть</p>
            <p>{transformDateFormat(article.date.split('T')[0])}г.</p>
        </div>
    </div>
)