/**
 * Fill number's beginning with zero to make it at target's length
 * @param {number} num
 * @param {number} targetLength
 * @returns {string}
 */
export function leftFillNum(num, targetLength) {
  return num.toString().padStart(targetLength, 0);
}
