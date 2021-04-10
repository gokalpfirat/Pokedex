/**
 * This function escape the dashes and capitalize first letter of given move name
 * @param {string} name
 * @returns {string}
 */
export const escapeName = (name) => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
