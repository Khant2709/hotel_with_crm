import React from 'react';
import Image from "next/image";
import ReactMarkdown from 'react-markdown';

import Title from "../../components/ui/title/title";

import {getFullPathImage} from "../../utils/getFullPathImage";
import {transformDateFormat} from "../../utils/getDay";

import styles from './contentArticle.module.css';
import stylesFont from '../../styles/fonts/timesNewRoman.module.css';


const ContentArticle = ({article}) => {
  return (
      <main className={styles.window}>
        <Title Tag={'h1'} text={article.title}/>
        <Image
            alt={'preview'}
            src={getFullPathImage(article.folder_img, article.preview_img_name)}
            width={1000}
            height={100}
            className={styles.previewImage}
            priority={true}
        />
        <div className={`${styles.markdownContainer} ${stylesFont.newRoman400}`}>
          <ReactMarkdown>
            {article.text}
          </ReactMarkdown>
        </div>

        {article?.images && article.images.length !== 0 && <div className={styles.containerImages}>
          {article.images.map(image => {
            return <div
                key={image.id}
                className={styles.image}
                style={{backgroundImage: `url(${getFullPathImage(image.image_path, image.image_name)})`}}
            />
          })}
        </div>}
        <p className={`${styles.date} ${stylesFont.newRoman400}`}>
          Последнее обновление: {transformDateFormat(article.date.split('T')[0])}г.
        </p>
      </main>
  );
};

export default ContentArticle;