/**
 * Возвращает текст на основе числа.
 *
 * @param {number} amount - Числовое значение, от которого зависит возвращаемый текст.
 * @param {string} singular - Текст для числа 1.
 * @param {string} plural - Текст для чисел 2, 3, 4.
 * @param {string} pluralMany - Текст для чисел 5 и больше.
 * @returns {string} Текст, соответствующий числу.
 *
 * @example
 * textFromAmount(1, "день", "дня", "дней"); // "день"
 * textFromAmount(3, "день", "дня", "дней"); // "дня"
 * textFromAmount(5, "день", "дня", "дней"); // "дней"
 */
export const textFromAmount = (amount, singular, plural, pluralMany) => {
  if (typeof amount !== "number") throw new Error("amount должен быть числом");
  if (amount === 1) return singular;
  if (amount > 4) return pluralMany;
  return plural;
};
