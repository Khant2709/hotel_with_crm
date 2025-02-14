/**
 * Форматирует число, добавляя пробелы для удобства чтения.
 *
 * @param {number} number - Число для форматирования.
 * @returns {string} Отформатированное число с пробелами.
 *
 * @example
 * transformPrice(1234567); // "1 234 567"
 */
const transformPrice = (number) => {
  if (typeof number !== "number") throw new Error("number должен быть числом");
  return new Intl.NumberFormat("ru-RU").format(number);
};

export default transformPrice;

