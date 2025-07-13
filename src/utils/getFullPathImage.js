import { BASE_URL_IMAGES } from "../config/envData";

/**
 * Возвращает полный путь к изображению на основе базового URL, пути к папке и имени файла.
 * @param {string} imageLink - Путь к папке с изображением.
 * @param {string} imageName - Имя файла изображения.
 */
export const getFullPathImage = (imageLink, imageName) => {
  if (!imageLink || !imageName) {
    return null
    throw new Error('imageLink и imageName обязательны для формирования полного пути.');
  }
  return `${BASE_URL_IMAGES}${imageLink}/${imageName}`;
};